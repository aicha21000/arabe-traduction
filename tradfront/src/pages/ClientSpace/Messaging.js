// src/pages/ClientSpace/Messaging.js
import React, { useState, useRef, useEffect } from 'react';
import './Messaging.css';

function Messaging() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Admin', content: 'Welcome to the messaging system!' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messageInputRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessageObj = {
      id: messages.length + 1,
      sender: 'User',
      content: newMessage.trim(),
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  useEffect(() => {
    messageInputRef.current.scrollTop = messageInputRef.current.scrollHeight;
  }, [messages]);

  return (
    <div>
      <h2>Messaging</h2>
      <div ref={messageInputRef} style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.sender}: </strong>
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Messaging;
