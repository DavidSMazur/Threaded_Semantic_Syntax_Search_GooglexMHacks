import React , {useState} from "react";
import './interface.css'
import InputComponent from "./InputComponent";
import Feed from "./Feed";
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';


const Interface = ({setAdmin, toggleSlide}) => {

    const [conversation, setConversation] = useState([{
        type: "response",
        id:  1,
        message: "Welcome to Gemini, your go-to for a fun and fast onboarding experience! Why did the employee bring a ladder to work? Because they heard the job was up-and-coming!"
    }])

    const handleSlide = () => {
        toggleSlide();
    }

  

const appendMessage = (userMessage) => {
    const newPrompt = {
        type: "prompt",
        id: conversation.length + 1,
        message: userMessage
    };
    setConversation(prev => [...prev, newPrompt]);

    const loadingIndicator = {
        type: "loading",
        id: conversation.length + 2,
        message: ""
    };
    setConversation(prev => [...prev, loadingIndicator]);

    // setTimeout(() => {
    //     const newResponse = {
    //       type: "response",
    //       id: conversation.length + 2,
    //       message: "This is a simulated response."
    //     };
  
    //     // Replace loading indicator with the actual response
    //     setConversation(prevConvo => [
    //       ...prevConvo.filter(msg => msg.type !== 'loading'),  // Remove loading indicator
    //       newResponse
    //     ]);
    //   }, 2000);

    // Make an actual API call
    
    axios.post('http://localhost:8000/api/response/', { message: userMessage })
        .then(response => {
            const newResponse = {
                type: "response",
                id: conversation.length + 2,
                message: response.data.reply
            };

            // Replace loading indicator with the actual response
            setConversation(prev => [
                ...prev.filter(msg => msg.type !== 'loading'),
                newResponse
            ]);

            
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            // Optionally handle errors, such as removing loading indicator
            setConversation(prev => prev.filter(msg => msg.type !== 'loading'));
        });
};



return (
    <>
    <div className="header">
            <div className="logo">
                <span className="logo-circle">G</span>
            </div>
            <div className="title-container">
                <div className="title">Your Friend Gemini</div>
                <div className="subtitle">Always online</div>
            </div>
            <Button variant="primary" className='upload-button' onClick={() => setAdmin(true)}> <i class="bi bi-box-arrow-up"></i></Button>
            <Button className="upload-button" variant='primary' onClick={handleSlide} style={{marginLeft: "1vw"}}>
      <i class="bi bi-sliders2"></i>
      </Button>
        </div>
    <Feed convo={conversation} />
    <InputComponent onSendMessage={appendMessage} />
    </>
    );
}


export default Interface;