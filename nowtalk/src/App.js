import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const App = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch initial messages from the server when the component mounts
    axios.get('https://curly-pollen-steam.glitch.me/api/messages/getMessages')
      .then(response => setMessages(response.data))
      .catch(error => console.error(error));
    socket.on('chat message', newMessage => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    if (user.trim() === '' || content.trim() === '') {
      return;
    }

    const newMessage = { user, content };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    axios.post('https://curly-pollen-steam.glitch.me/api/messages/postMessages', newMessage)
      .then(response => {
        if (response.data.success) {
          setMessages(prevMessages => [...prevMessages, newMessage]);
          socket.emit('chat message', newMessage);
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
