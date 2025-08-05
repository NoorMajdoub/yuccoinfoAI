# classification.py
import time

from transformers import LayoutLMv3ForSequenceClassification, LayoutLMv3Processor
from PIL import Image, ImageDraw, ImageFont
import torch
import fitz  
import docx2txt
import io
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

processor = LayoutLMv3Processor.from_pretrained("microsoft/layoutlmv3-base")
model = LayoutLMv3ForSequenceClassification.from_pretrained("curiousily/layoutlmv3-financial-document-classification")

# Move model to device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

def classify_image(image_path: str) -> str:
    try:
        img = Image.open(image_path).convert("RGB")
        encoding = processor(images=img, return_tensors="pt")
        encoding = {k: v.to(device) for k, v in encoding.items()}

        with torch.no_grad():
            outputs = model(**encoding)
            logits = outputs.logits
            predicted_class = logits.argmax(-1).item()

        label_map = model.config.id2label
        return label_map[predicted_class]
    except Exception as e:
        print(f"[WARNING] classify_image crashed: {e}")
        return "others"

def classify_pdf(pdf_path: str) -> str:
    try:
        doc = fitz.open(pdf_path)
        page = doc.load_page(0)
        pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0))
        img_bytes = pix.tobytes("png")
        img = Image.open(io.BytesIO(img_bytes))

        encoding = processor(images=img, return_tensors="pt")
        encoding = {k: v.to(device) for k, v in encoding.items()}

        with torch.no_grad():
            outputs = model(**encoding)
            logits = outputs.logits
            predicted_class = logits.argmax(-1).item()

        label_map = model.config.id2label
        return label_map[predicted_class]
    except Exception as e:
        print(f"[WARNING] classify_pdf crashed: {e}")
        return "others"

def classify_docx(docx_path: str) -> str:
    try:
        text = docx2txt.process(docx_path)

        if not text.strip():
            return "others"

        img = Image.new('RGB', (2480, 3508), color='white')  # A4 size
        draw = ImageDraw.Draw(img)

        try:
            font = ImageFont.truetype("arial.ttf", size=20)
        except:
            font = ImageFont.load_default()

        margin = 50
        offset = 50
        for line in text.splitlines():
            if offset > img.height - 50:
                break
            draw.text((margin, offset), line, fill=(0, 0, 0), font=font)
            offset += 30

        buf = io.BytesIO()
        img.save(buf, format='PNG')
        buf.seek(0)
        img = Image.open(buf)

        encoding = processor(images=img, return_tensors="pt")
        encoding = {k: v.to(device) for k, v in encoding.items()}

        with torch.no_grad():
            outputs = model(**encoding)
            logits = outputs.logits
            predicted_class = logits.argmax(-1).item()

        label_map = model.config.id2label
        return label_map[predicted_class]
    except Exception as e:
        print(f"[WARNING] classify_docx crashed: {e}")
        return "others"

if __name__ == "__main__":
    file = "Balance-Sheet-Example.pdf"
    start = time.time()
    print(classify_pdf(file))
    end = time.time()
    print(end-start)





