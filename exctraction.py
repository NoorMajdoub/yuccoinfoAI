
import docx
import fitz  
import pytesseract
from PIL import Image
import io
import pandas as pd
# Function to extract text from DOCX files
def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    return "\n".join([paragraph.text for paragraph in doc.paragraphs])


# Function to extract text from PDF files using PyMuPDF and OCR
def extract_text_from_pdf(file_path):
    doc = fitz.open(file_path)
    text = ""

    # Try direct text extraction first (for searchable PDFs)
    for page_num in range(len(doc)):
        page = doc[page_num]
        page_text = page.get_text()

        # If page has text content, use it directly
        if page_text.strip():
            text += f"{page_text}\n"
        # Otherwise, use OCR on the rendered page image
        else:
            pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0))  # Higher resolution for better OCR
            img_bytes = pix.tobytes("png")
            img = Image.open(io.BytesIO(img_bytes))
            page_text = pytesseract.image_to_string(img)
            text += f"{page_text}\n"

    return text


# Function to extract text from images using OCR
def extract_text_from_image(file_path):
    img = Image.open(file_path)
    return pytesseract.image_to_string(img)

def extract_text_from_excel(file_path):
    try:
        df = pd.read_excel(file_path)
        return df.to_string(index=False)  # Convert the Excel table into readable text
    except Exception as e:
        raise Exception(f"Failed to extract text from Excel: {str(e)}")

