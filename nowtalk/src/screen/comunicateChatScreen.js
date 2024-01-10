import React, { useState, useEffect } from 'react';
import '../css/main.css'
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('https://curly-pollen-steam.glitch.me');

const Main =  ({ loggedInUsername }) => {
	const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [content, setContent] = useState('');
  const [dataUser, setDataUser] = useState();
  const [idUser, setIdUser] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://curly-pollen-steam.glitch.me/api/users/getUserByUsername/' + loggedInUsername);
        setDataUser(response.data);
        setUser(response.data.name);
        setIdUser(response.data._id)
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  
  }, [loggedInUsername]);


  useEffect(() => {
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

  const handleKeyEnter = (event) => {
    if(event.key === 'Enter'){
      sendMessage();
    }
  }

  console.log(idUser)
  

  const sendMessage = () => {
    if (idUser.trim() === '' || content.trim() === '') {
      return;
    }
    const newMessage = { user, content };
    axios.post('https://curly-pollen-steam.glitch.me/api/messages/postMessages', newMessage)
      .then(response => {
        if (response.data.success) {
          setMessages(prevMessages => [...prevMessages, newMessage]);
          socket.emit('chat message', newMessage);
          setContent('');
        } else {
          console.error('Failed to send message:', response.data.error);
        }
      })
      .catch(error => console.error(error));
  };
  return (
    <div className='safeArea'>
      <div className='areaContent'>
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
            <div key={index} className={`message ${message.user === user ? 'own-message' : ''}`}>
              <strong>{message.user}:</strong> {message.content}
            </div>
            ))}
          </div>

          <div className="chat-input">
            <input  onKeyDown ={((e) => handleKeyEnter(e))} type="text" placeholder="Nhập tin nhắn" value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={() => sendMessage()}>Gửi</button>
          </div>
        </div>
      </div>
	</div>
  );
};

export default Main;
