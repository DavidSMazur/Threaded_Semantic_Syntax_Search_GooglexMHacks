import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './FileUploader.css';  // Ensure to create this CSS file
import './GeminiLoading.css'
import axios from 'axios';

const FileUploader = ({selectedTab, addItem}) => {
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)
    const fileInputRef = useRef(null);
    const [uploaded, setUploaded] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const [filename, setFileName] = useState("")

    const handleFileChange = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
            uploadFile(file);
        }
    };




    const handleButtonClick = () => {
        fileInputRef.current.click();  // Triggers the hidden file input dialog
    };

    const uploadFile = (file) => {
        setLoading(true);
        console.log(loading)
        setTimeout(() => {
            console.log('Uploading file:', file);
            setUploaded(true);
            setUploadedFile(file);
            setLoading(false);
        }, 1500)
    };

    const handleClose = ()=> {
      setSuccess(false);
      handleReset();
    }

    const sendFile = (url) => {
      setSending(true);
      const formData = new FormData();
      formData.append("file", uploadedFile);
      axios.post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
      }).then(response => {
          console.log('File uploaded successfully', response.data);
          let item = {"filename" : response.data.filename, "summary" : response.data.summary};
          addItem(item);
          setSending(false);
          if (uploadedFile) {
            setFileName(uploadedFile.name)
          }
          setSuccess(true);
      }).catch(error => {
          console.error('Error uploading file', error);
          
      });
  };

  const sendDocFile = () => sendFile("http://localhost:8000/api/upload/docs/");
  const sendVideoFile = () => sendFile("http://localhost:8000/api/upload/video/");

    const handleReset = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset file input value
        }
        setUploadedFile(null);
        setUploaded(false);
        setSending(false);
    };

    useEffect(() => {
      
      setUploadedFile(null);
        setUploaded(false);
        handleClose();
    }, [selectedTab]);

    return (
        <div className= "background">
        <div className="buttons" style={{ padding: 20, marginTop : uploaded ? "5vh" : "0vh"}} >
          {!uploaded  &&  selectedTab === 1 && (
            <div>
            <Button onClick={handleButtonClick} variant='secondary-bg' className="icon-circle">
              <p>{loading? "Uploading your file." : "Upload your file here."}</p>
              <i class="bi bi-box-arrow-up"></i>
              <input type="file" hidden onChange={handleFileChange}  ref={fileInputRef} accept= ".txt, application/pdf" />
              
            </Button>
           {!loading && <p className='file-types'> Accepted File Types: .txt, .pdf</p> }
            </div>
            

)}

{!uploaded  &&  selectedTab === 2 && (
  <div>
            <Button onClick={handleButtonClick} variant='secondary-bg' className="icon-circle">
              <p>{loading? "Uploading your file." : "Upload your file here."}</p>
              <i class="bi bi-box-arrow-up"></i>
              <input type="file" hidden onChange={handleFileChange}  ref={fileInputRef} accept="video/*" />
            </Button>
            {!loading && <p className='file-types'> Accepted File Types: .mov, .mp4</p> }
            </div>
)}

             {loading && ( 
              <div className="gemini-loading">
              {'Gemini...'.split('').map((letter, index) => (
                  <span key={index} className="gemini-letter">{letter}</span>
              ))}
          </div>
          
             )}

          {uploaded && selectedTab === 1 &&  !success && (
            <div className="uploaded-container">
                <div className="video-icon">{'\u{1F4C4}'}</div> 
                <p className="video-name">{uploadedFile.name}</p>
              {!sending && <Button variant="primary" className="up-button" onClick={sendDocFile} >Send</Button> } 
              <Button variant="secondary" onClick={handleReset}>Cancel</Button>
            </div>
          )}
          {uploaded && selectedTab === 2 && !success && (
            <div className="uploaded-container">
                <div className="video-icon">{'\u{1F4F9}'}</div> 
                <p className="video-name">{uploadedFile.name}</p>
              <Button variant="primary" className="up-button" onClick={sendVideoFile} style = {{display: sending ? "hidden" : "visible"}}>Send</Button>
              <Button variant="secondary" onClick={handleReset}>Cancel</Button>
            </div>
          )}

{sending && ( 
              <div className="gemini-loading">
              {"Sending".split('').map((letter, index) => (
                  <span key={index} className="gemini-letter">{letter}</span>
              ))}
          </div>
          
             )}
          {success && selectedTab === 2  && <div className="success">
            <div style = {{color: "black", marginBottom: "2vh"}}>{filename} sent to Gemini succesfully!</div>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            </div>}
            {success && selectedTab === 1  && <div className="success">
            <div style = {{color: "black", marginBottom: "2vh"}}>{filename} sent to Gemini succesfully!</div>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            </div>}
        </div>
        </div>
      );
    };


export default FileUploader;
