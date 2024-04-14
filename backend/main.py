from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse, PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException
import google.generativeai as genai
from PyPDF2 import PdfReader
import io

app = FastAPI()

genai.configure(api_key = "AIzaSyDR037bT8P0CZEdJCrFeldJNwcfBTOrcP8")
# genai.configure(api_key='AIzaSyAnUkFgEVptXno4EV6dJ8rEXABLiyQStzg')

shared_data = {}

doc_data = ""
page_limit = 1500
total_pages = 0

shared_data["limit"] = 3
shared_data["total"] = 0
shared_data["text"] = ""


class Message(BaseModel):
    message: str
# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if your frontend runs on a different port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def read_root():
    content = """
    <html>
        <body>
            <div> Hello, Nick, David, Dilan, and Yuchen! </div>
        </body>
    </html>
    """
    return HTMLResponse(content=content)

@app.get("/test/")
async def test():
    return {"test" : "this worked!"}

@app.post("/api/response/")
async def get_response(data: Message):
    model = genai.GenerativeModel('gemini-pro', generation_config=genai.GenerationConfig(
        max_output_tokens=2000,
        temperature=0.9,
    ))
    response = model.generate_content([data.message, shared_data["text"]])
    return {"reply": response.text}


@app.post("/api/upload/docs/")
async def upload_docs(file: UploadFile = File(...)):
    print("reached the python")
    content = await file.read()
    print("finished read")
    try:
        file_stream = io.BytesIO(content)
        reader = PdfReader(file_stream)
        # shared_data["text"] = ""
        text = ""
        for page in reader.pages:
            shared_data["total"] += 1
            if  shared_data["total"] < shared_data["limit"]:
                text += page.extract_text() or ''
            else:
                break
        instruction = "You are a helpful information retrieval bot. You will quickly provide one sentence summaries of the text that you will analyze. "
        model = genai.GenerativeModel(
            "gemini-pro"
        )
        print("got here at leats")
        prompt = "Provide a one sentence concise summary of the text in the file provided."
        response = model.generate_content([prompt, text])
        print("heyyyy")
        shared_data["text"] += text
        print(text)
        return {"status" : "success", "filename" : file.filename, "text" : shared_data["text"], "total": shared_data["total"], "summary" : response.text}

    except Exception as e:
        return {"error": str(e)}



@app.post("/api/upload/video/")
async def upload_video(file: UploadFile = File(...)):
    # TODO LATER
    # implement like upload/docs/ but with a different part of the dict shared_data
    return {"status" : "not_implemented"}