import google.generativeai as genai
import cv2
import os
import shutil

# Configure the API with your API key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key='AIzaSyAnUkFgEVptXno4EV6dJ8rEXABLiyQStzg')

# Define the path to the video file
video_file_name = "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"

# Define the directory for extracted frames
FRAME_EXTRACTION_DIRECTORY = "content"
FRAME_PREFIX = "_frame"

def create_frame_output_dir(output_dir):
    """Ensure the directory for frames exists or is cleared before use."""
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    else:
        shutil.rmtree(output_dir)
        os.makedirs(output_dir)

def extract_frame_from_video(video_file_path):
    """Extract frames from video at one frame per second."""
    print(f"Extracting {video_file_path} at 1 frame per second. This might take a bit...")
    create_frame_output_dir(FRAME_EXTRACTION_DIRECTORY)
    vidcap = cv2.VideoCapture(video_file_path)
    fps = vidcap.get(cv2.CAP_PROP_FPS)
    if fps == 0:
        print("Error: FPS is zero. Cannot process video.")
        vidcap.release()
        return
    
    output_file_prefix = os.path.basename(video_file_path).replace('.', '_')
    frame_count = 0
    count = 0
    while vidcap.isOpened():
        success, frame = vidcap.read()
        if not success:
            break
        if int(count / fps) == frame_count:
            min, sec = divmod(frame_count, 60)
            time_string = f"{min:02d}:{sec:02d}"
            image_name = f"{output_file_prefix}{FRAME_PREFIX}{time_string}.jpg"
            output_filename = os.path.join(FRAME_EXTRACTION_DIRECTORY, image_name)
            cv2.imwrite(output_filename, frame)
            frame_count += 1
        count += 1
    vidcap.release()
    print(f"Completed video frame extraction!\n\nExtracted: {frame_count} frames")

extract_frame_from_video(video_file_name)

class File:
    """A class to handle file data for uploads."""
    def __init__(self, file_path: str, display_name: str = None):
        self.file_path = file_path
        self.display_name = display_name or file_path
        self.timestamp = get_timestamp(file_path)
        self.response = None

    def set_file_response(self, response):
        self.response = response

def get_timestamp(filename):
    """Extracts the timestamp from the filename based on the frame prefix."""
    parts = filename.split(FRAME_PREFIX)
    if len(parts) != 2:
        return None
    return parts[1].split('.')[0]

# Process and upload files
files = sorted(os.listdir(FRAME_EXTRACTION_DIRECTORY))
files_to_upload = [File(os.path.join(FRAME_EXTRACTION_DIRECTORY, file)) for file in files]
full_video = False

uploaded_files = []
print(f'Uploading {len(files_to_upload) if full_video else 10} files. This might take a bit...')
for file in (files_to_upload if full_video else files_to_upload[40:50]):
    print(f'Uploading: {file.file_path}...')
    response = genai.upload_file(path=file.file_path)
    file.set_file_response(response)
    uploaded_files.append(file)

print(f"Completed file uploads!\n\nUploaded: {len(uploaded_files)} files")

# List files uploaded in the API
for file in uploaded_files:
    print(file.response.uri)

# Generate content based on uploaded files
prompt = "Describe this video in detail."
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

def make_request(prompt, files):
    """Create a content generation request based on files."""
    request = [prompt]
    for file in files:
        request.append(file.timestamp)
        request.append(file.response)
    return request

request = make_request(prompt, uploaded_files)
response = model.generate_content(request, request_options={"timeout": 600})
print(response.text)

# Cleanup uploaded files
print(f'Deleting {len(uploaded_files)} images. This might take a bit...')
for file in uploaded_files:
    genai.delete_file(file.response.name)
    print(f'Deleted {file.file_path} at URI {file.response.uri}')
print(f"Completed deleting files!\n\nDeleted: {len(uploaded_files)} files")