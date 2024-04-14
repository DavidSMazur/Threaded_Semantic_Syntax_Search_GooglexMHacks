import React , {useState} from 'react';
import './App.css';
import TabBar from './TabBar';
import FileUploader from './FileUploader';
import Admin from './Admin';
import Interface from './Interface';
import Slide from './Slide';

const Parent = () => {
  const [admin, setAdmin] = useState(false);

  const [items, setItems] = useState([]);
  const [showSlide, setShowSlide] = useState(false);

  const addItem = (item) => {
    setItems(prevItems => [...prevItems, item]);
  };

  const toggleSlide = () => {
    console.log(showSlide);
    setShowSlide(prevShowSlide => !prevShowSlide);
  };


  return (
    <div className="App">
      <div style={{display: "flex", justifyContent: 'right', alignItems: "center", marginBottom: "-10vh", marginTop : "5vh", textAlign:"right" }}>
      <div style= {{textDecoration: "underline", textDecorationColor: "rgb(148, 114, 222)", marginRight: "0vw", fontSize: "large", textAlign: "right"}}>Community Gem</div>
      {/* <div><img src='/logo.png' alt="helo" width="25"></img></div> */}
      </div>
      <div className="App-header" style={{display: "flex", flexDirection: "row"}}>

        {admin && <Admin setAdmin={setAdmin} addItem={addItem}  />}
        <div>
        {!admin && <Interface setAdmin={setAdmin} toggleSlide={toggleSlide}/>}
        
        </div>
        {!admin && showSlide && <Slide items={items}/>}
      </div>
    </div>
  );
}

export default Parent;
