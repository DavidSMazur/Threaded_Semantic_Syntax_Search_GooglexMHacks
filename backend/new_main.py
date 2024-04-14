# # in each function, call the API 
# #functions dictionary 

# import fitz  # PyMuPDF
# import shutil
# import google.generativeai as genai
# import os
# # from datastore_pdf import doc_data, extract_text_from_pdf
# # from datastore_mp4 import make_request, uploaded_files
# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import PlainTextResponse

# app = FastAPI()

# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
# genai.configure(api_key='AIzaSyAnUkFgEVptXno4EV6dJ8rEXABLiyQStzg')

# @app.post("/api/upload/docs")
# async def create_upload_file(file: UploadFile = File(...)):
#     content = await file.read()
#     ptr = PlainTextResponse(content.decode("utf-8"))
#     print(ptr)
#     return ptr





# # This variable will be used to keep track of the total number of pages processed
# total_pages_processed = 0

# page_limit = 1500  # Set the page limit

# def data_store():
#     """
#     This tool utilizies the data that lies within doc_data relating to primarily documents.
#     """
#     return "doc_data"

# # David will handle
# def github_function():
#     """
#     """
    

# pdf_github_tools = [data_store, github_function]
# instruction = "You are a helpful information retrieval bot. You can provide information from doc_data, uploaded_files, and audio_file."

# model = genai.GenerativeModel(
#     "models/gemini-1.5-pro-latest", tools=pdf_github_tools, system_instruction=instruction
# )
# chat = model.start_chat(enable_automatic_function_calling=True)

# #! 
# # input = input("Enter your Question")
# input = "give me information about text"
# response = chat.send_message(input)
# print(response.text)
