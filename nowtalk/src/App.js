import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const App = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/messages')
      .then(response => setMessages(response.data))
      .catch(error => console.error(error));
    socket.on('chat message', newMessage => {
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket.off('chat message');
    };
  }, [messages]);

  const sendMessage = () => {
    axios.post('http://localhost:5000/api/messages', { user, content })
      .then(response => {
        if (response.data.success) {
          socket.emit('chat message', { user, content });
          setContent('');
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <div>
        <input type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
        <input type="text" placeholder="Message" value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={sendMessage}>Gửi</button>
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user}:</strong> {message.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
