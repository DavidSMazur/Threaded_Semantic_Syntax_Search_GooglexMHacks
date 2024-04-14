import React, { useEffect, useRef } from 'react';
import './Feed.css';

const Feed = ({ convo }) => {
  const feedRef = useRef(null);

//   const scrollToBottom = () => {
//     endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
//     console.log("is scrolling down")
//   };

  useEffect(() => {
    if (feedRef.current) {
      // This will set the scrollTop to the maximum scrollable height,
      // effectively scrolling to the bottom.
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [convo]);

  const formatMessage = (msg) => {
    if (msg.type === 'loading') {
      return (
        <div className="message response">
        <div className="loading-animation" key={msg.id}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        </div>
      );
    }
    const className = msg.type === 'prompt' ? 'message prompt' : 'message response';
    return (
      <div className={className} key={msg.id}>
        {msg.message}
      </div>
    );
  };

  return (
    <div ref={feedRef} className="feed">
      {convo.map(msg => formatMessage(msg))}
      <div  />
    </div>
  );
};

export default Feed;
