
import docx
import fitz  
import pytesseract
from PIL import Image
import io
import pandas as pd
def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    return "\n".join([paragraph.text for paragraph in doc.paragraphs])


def extract_text_from_pdf(file_path):
    doc = fitz.open(file_path)
    text = ""

    for page_num in range(len(doc)):
        page = doc[page_num]
        page_text = page.get_text()

        if page_text.strip():
            text += f"{page_text}\n"
        else:
            pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0)) 
            img_bytes = pix.tobytes("png")
            img = Image.open(io.BytesIO(img_bytes))
            page_text = pytesseract.image_to_string(img)
            text += f"{page_text}\n"

    return text


def extract_text_from_image(file_path):
    img = Image.open(file_path)
    return pytesseract.image_to_string(img)

def extract_text_from_excel(file_path):
    try:
        df = pd.read_excel(file_path)
        return df.to_string(index=False)  
    except Exception as e:
        raise Exception(f"Failed to extract text from Excel: {str(e)}")









