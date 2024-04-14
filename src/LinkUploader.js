import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './LinkUploader.css';  // Import the CSS file


const LinkUploader = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
        setError('');  // Clear error when the user modifies the URL
    };

    const isValidGithubUrl = (url) => {
        const regex = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
        const regex2 = /^git@github\.com:[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\.git$/;
        return regex.test(url) || regex2.test(url);
    };

    const handleSend = () => {
        if (url.trim() && isValidGithubUrl(url)) {
            setLoading(true);
            console.log('Sending URL:', url);
            setTimeout(() => {
                setLoading(false);
                console.log('URL uploaded');
            }, 1500);
        } else {
            setError('Please enter a valid GitHub repository URL.');
        }
    };

    return (
        <div className="link-uploader-container">
            <div className="url-input-group">
                <div className="url-label">URL:</div>
                <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    className="url-input"
                    placeholder="Paste your repository link here"
                />
            </div>
            <Button
                className="send-button"
                variant="primary"
                disabled={!url.trim() || loading}
                onClick={handleSend}
                style= {{height: "10vh", fontSize : "large"}}
            >
                {loading ? 'Uploading...' : 'Upload'}
            </Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default LinkUploader;
