# main.py
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse, FileResponse

from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import List, Optional
import os
import shutil
from semantic import sem_search
import chromadb
from sentence_transformers import SentenceTransformer
from exctraction import *
from classifier import classify_image, classify_pdf, classify_docx
import pytesseract
from fastapi.middleware.cors import CORSMiddleware


pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

app = FastAPI(title="Document Search API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow your Next.js frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Database configuration
DATABASE_URL = "mysql+pymysql://root:root@localhost/document_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()






# Define the Document model
class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), index=True)
    content_type = Column(String(200))
    text_content = Column(Text)
    file_path = Column(String(255))
    type = Column(String(100))  # New column for predicted document type

# Create the database tables
Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create upload directory if it doesn't exist
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Validate file types
    content_type = file.content_type
    valid_types = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  # docx
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",        # xlsx
        "application/pdf",  # pdf
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/tiff"
    ]

    if content_type not in valid_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Only DOCX, PDF, and images are supported.")

    # Create a unique filename to avoid collisions
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)

    with open(file_location, "wb") as file_object:
        shutil.copyfileobj(file.file, file_object)

    extracted_text = ""
    predicted_label = "others"  # Default if anything fails

    try:
        # Extract text
        if content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            extracted_text = extract_text_from_docx(file_location)
            predicted_label = classify_docx(file_location)
        elif content_type == "application/pdf":
            extracted_text = extract_text_from_pdf(file_location)
            predicted_label = classify_pdf(file_location)
        elif content_type.startswith("image/"):
            extracted_text = extract_text_from_image(file_location)
            predicted_label = classify_image(file_location)
        elif content_type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            extracted_text = extract_text_from_excel(file_location)
            predicted_label = "spreadsheet"  # Hardcoded for now

        extracted_text = f"{file.filename}\n\n{extracted_text}"

        # Save to database
        db_document = Document(
            filename=file.filename,
            content_type=content_type,
            text_content=extracted_text,
            file_path=file_location,
            type=predicted_label
        )
        db.add(db_document)
        db.commit()
        db.refresh(db_document)

        return {"filename": file.filename, "content_type": content_type, "id": db_document.id, "type": predicted_label}

    except Exception as e:
        if os.path.exists(file_location):
            os.remove(file_location)
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


@app.get("/search2/")
def search_documents2(contxt: str, db: Session = Depends(get_db)):
    try:
        results = sem_search(contxt, n_results=1)  
        return {
            "status": "success",
            "results": results,
            "count": len(results)
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

@app.get("/search/")
def search_documents(keyword: str, db: Session = Depends(get_db)):
    if not keyword.strip():
        raise HTTPException(status_code=400, detail="Search keyword cannot be empty")

    query = db.query(Document).filter(Document.text_content.like(f"%{keyword}%"))
    documents = query.limit(5).all()

    results = []
    for doc in documents:
        text = doc.text_content
        keyword_position = text.lower().find(keyword.lower())

        if keyword_position != -1:
            start = max(0, keyword_position - 100)
            end = min(len(text), keyword_position + len(keyword) + 100)
            snippet = text[start:end]
            if start > 0:
                snippet = "..." + snippet
            if end < len(text):
                snippet = snippet + "..."
        else:
            snippet = text[:200] + "..." if len(text) > 200 else text

        results.append({
            "id": doc.id,
            "filename": doc.filename,
            "content_type": doc.content_type,
            "type": doc.type,  # Include predicted type in search results
            "snippet": snippet
        })

    return results

@app.get("/documents/{document_id}")
def get_document(document_id: int, db: Session = Depends(get_db)):
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    if os.path.exists(document.file_path):
        return FileResponse(
            path=document.file_path,
            media_type=document.content_type,
            filename=document.filename
        )
    
    else:
        raise HTTPException(status_code=404, detail="File not found on server")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



