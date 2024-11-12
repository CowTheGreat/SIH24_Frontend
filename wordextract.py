from docx import Document

def extract_text_from_docx(file_path):
    doc = Document(file_path)

    text = []

    for para in doc.paragraphs:
        text.append(para.text)

    return '\n'.join(text)

# Example usage
file_path = "C:/Users/cowar/Downloads/vindhan_resume.docx"
extracted_text = extract_text_from_docx(file_path)
print(extracted_text)
