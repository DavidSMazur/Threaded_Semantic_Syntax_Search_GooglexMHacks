import React from 'react';

function Slide({ items }) {
  return (
    <div style={{ width: '200px', height: '75vh', background: 'white', color: "black"}}>
      <div style = {{borderBottom: "2px dashed purple", fontFamily: "Poppins", fontSize: "large", marginTop: "2vh"}}>File Information</div>
      {items.length === 0 && <div style={{fontSize: "medium", marginTop: "1vh", fontFamily: "Poppins"}}>No Files Uploaded Yet!</div>}
      {items.map((item, index) => (
        <div key={index} style={{ borderBottom: '2px solid gray' , fontFamily : "Poppins", fontSize: "small", marginTop: "2vh", paddingBottom: "2vh",
        paddingLeft: "0.5vw", paddingRight: "0.5vw"}} >
          <span style={{fontWeight: "bold", textDecoration: "underline"}}>{item.filename}</span>: {item.summary}
        </div>
      ))}
    </div>
  );
}

export default Slide;