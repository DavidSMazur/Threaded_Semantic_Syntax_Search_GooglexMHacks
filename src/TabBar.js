import React, { useState } from 'react';
import './tabbar.css';

const TabBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {name: 'Github', logo: '\u{1F5C4}'}, 
    {name: 'Docs', logo: '\u{1F4C4}'}, 
    {name : 'Vidoes', logo: '\u{1F4F9}'}]
    

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tab-bar">
      {tabs.map((tab, index) => (
        <div 
          key={index} 
          className={`tab ${activeTab === index ? 'active' : ''}`} 
          onClick={() => handleTabClick(index)}
        >
            <div>
          {tab.name}
          {tab.logo}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
