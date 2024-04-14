import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './FileUploader.css';
import './GeminiLoading.css';

const FileUploader = ({ selectedTab }) => {
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
            uploadFile(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const uploadFile = (file) => {
        setLoading(true);
        setTimeout(() => {
            console.log('Uploading file:', file);
            setUploaded(true);
            setUploadedFile(file);
            setLoading(false);
        }, 1500);
    };

    const sendFile = (url) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", uploadedFile);

        axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(response => {
            console.log('File uploaded successfully', response.data);
            setShowPopup(true);
            setLoading(false);
        }).catch(error => {
            console.error('Error uploading file', error);
            setLoading(false);
        });
    };

    const sendDocFile = () => sendFile("http://localhost:8000/api/upload/docs/");
    const sendVideoFile = () => sendFile("http://localhost:8000/api/upload/video/");

    const handleReset = () => {
        fileInputRef.current.value = '';
        setUploadedFile(null);
        setUploaded(false);
        setShowPopup(false);
    };

    useEffect(() => {
        setUploadedFile(null);
        setUploaded(false);
    }, [selectedTab]);

    return (
        <div className="background">
            <div className="buttons" style={{ padding: 20, marginTop: uploaded ? "5vh" : "0vh" }}>
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
                        {'Your videos and gems and so are you!'.split('').map((letter, index) => (
                            <span key={index} className="gemini-letter">{letter}</span>
                        ))}
                    </div>
                )}
                <Modal show={showPopup} onHide={handleReset} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Video sent to Gemini successfully!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleReset}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default FileUploader;
