import React from 'react';
import './App.css';
import Parent from './Parent';

function App() {
  const handleTabSelect = (index) => {
    console.log('Selected tab:', index);
  };


  return (
    <div className="App">
      <header className="App-header">
        <Parent/>
      </header>
    </div>
  );
}

export default App;
