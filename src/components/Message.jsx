import React from 'react';

const Message = () => {
  return (
    <div className="message ">
      <div className="messageInfo">
        <img
          src="https://i.pinimg.com/236x/5a/65/85/5a65852a5c0a75c5c5eb8088346e63e7.jpg"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img
          src="https://i.pinimg.com/236x/5a/65/85/5a65852a5c0a75c5c5eb8088346e63e7.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Message;
