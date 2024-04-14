import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './InputComponent.css';

const InputComponent = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");  // Clear the input after sending
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="input-container">
            <FontAwesomeIcon icon={faMicrophone} className="mic-icon" />
            <input
                type="text"
                placeholder="Type message..."
                className="input-field"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <FontAwesomeIcon icon={faPaperPlane} className="send-icon" onClick={handleSend} />
        </div>
    );
};

export default InputComponent;
