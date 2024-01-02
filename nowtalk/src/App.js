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
    axios.get('http://localhost:5000/api/messages/getMessages')
      .then(response => setMessages(response.data))
      .catch(error => console.error(error));

    // Listen for new messages from the socket and update state
    socket.on('chat message', newMessage => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    // Cleanup: Unsubscribe from the socket when the component unmounts
    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    // Check if user and content are not empty before sending a message
    if (user.trim() === '' || content.trim() === '') {
      return;
    }

    const newMessage = { user, content };

    // Update state immediately for a responsive UI
    setMessages(prevMessages => [...prevMessages, newMessage]);

    // Send the message to the server
    axios.post('http://localhost:5000/api/messages/postMessages', newMessage)
      .then(response => {
        if (response.data.success) {
          // Update state with the server response
          setMessages(prevMessages => [...prevMessages, newMessage]);

          // Emit the message through the socket to update other clients
          socket.emit('chat message', newMessage);
          
          // Clear the message input
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
