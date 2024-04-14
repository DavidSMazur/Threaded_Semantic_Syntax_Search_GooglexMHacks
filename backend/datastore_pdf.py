# import fitz 
# import os
# import shutil
# from fastapi import FastAPI, File, UploadFile, HTTPException


# app = FastAPI()

# # import hisotry articles for dates -> 
# doc_data = ""
# page_limit = 1500
# total_pages_processed = 0

# UPLOAD_DIR = "uploaded_files"
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# # when testing, call it using a specifc date 

# # * normal function for extracting text from pdf initially when the pdf is uploaded
# @app.post("/api/upload/docs/")
# async def extract_text_from_pdf(file: UploadFile = File(...)):
#     if file.content_type != 'application/pdf':
#         raise HTTPException(status_code=400,  detail="Invalid file type. Only PDFs are allowed.")

#     file_location = os.path.join(UPLOAD_DIR, file.filename)
#     try:
#         with open(file_location, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)
#     finally:
#         file.file.close()
#     global total_pages_processed
#     global doc_data
#     with fitz.open(file_location) as pdf:
#         for page in pdf:
#             total_pages_processed += 1
#             if total_pages_processed < page_limit:
#                 doc_data += page.get_text()
#                 total_pages_processed += 1
#             else:
#                 break  # Stop processing if page limit is reached
#         return "".join(doc_data)
 

# extract_text_from_pdf('Hyland, Stance and Engagement.pdf')