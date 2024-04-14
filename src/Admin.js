import React, { useState , useEffect} from 'react';
import FileUploader from './FileUploader';
import './tabbar.css';
import LinkUploader from './LinkUploader';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Admin = ({setAdmin, addItem}) => {
    const [selectedTab, setSelectedTab] = useState(0);  // Assume 0 as default selected tab
    const tabs = [
        {name: 'Github', logo: '\u{1F5C4}'}, 
        {name: 'Docs', logo: '\u{1F4C4}'}, 
        {name : 'Videos', logo: '\u{1F4F9}'}]

    const handleTabChange = (index) => {
        setSelectedTab(index);
    };

    const handleClick = () => {
        setAdmin(false);
    }


    const [testData, setTestData] = useState('');

    useEffect(() => {
        console.log("what")
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/test/');
                setTestData(response.data.test); // Assuming the response is an object with a 'test' property
                console.log(response)
                console.log("hello")
                console.log(response.data.test)
            } catch (error) {
                console.error('Error fetching data: ', error);
                setTestData('Failed to fetch data');
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <div className='admin-bar'>
                <div>Administrator View</div>
            <Button className="back-button" variant='primary' onClick={handleClick}>
            <i class="bi bi-arrow-90deg-left"></i>
      </Button>
      
      </div>
      {/* <div style = {{maxWidth: "60vw", fontSize: "medium"}}>Forget about those mid-day disturbances and steep 
      learning curve for new hires. Upload your interntal documentation, onborading videos, or github repo for 
      your codebase and streamline your onboarding so your people can do what they do best and achieve company goals. </div> */}
            <div className="tab-bar">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`tab ${selectedTab === index ? 'active' : ''}`} 
                    
                        onClick={() => handleTabChange(index)}
                    >
                        <div className='tab-info'>
                            <div className='tab-name'>
                        {tab.name}
                        </div>
                        <div className='tab-logo'>
                        {tab.logo}
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            { selectedTab !== 0 && (
            <FileUploader selectedTab={selectedTab} addItem = {addItem}/>
            )}
            { selectedTab ===0 && (
            <LinkUploader />
            )}
        </div>
    );
};

export default Admin;
