<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Routes, Route, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Login from './screen/login';
import About from './screen/about';
import Main from './screen/comunicateChatScreen';
import { useLocation } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const loggedInUsername = location.state?.loggedInUsername;
  const [user, setUser] = useState();

  useEffect(() => {
    if (typeof loggedInUsername !== "undefined") {
      setUser(loggedInUsername);
    }
  }, [loggedInUsername]);
  

  const handleLogin = () => {
      setIsLoggedIn(true);
      // setUser(loggedInUsername)
  };

  console.log("login: " + user)
  return (
    <div>
      {isLoggedIn ? (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
          <Sidebar className="app">
            <Menu>
              <MenuItem
                component={<Link to="/" className="link" />}
                className="menu1"
            
              >
                <h2>NowTalk</h2>
              </MenuItem>

              <MenuItem
                component={<Link to="communicateChat" className="link" />}
  
              >
                Communicate
              </MenuItem>
              <MenuItem
                component={<Link to={{ pathname: '/about', state: { loggedInUsername: user } }} className="link" />}
    
              >
                About
              </MenuItem>
            </Menu>
          </Sidebar>

          <section style={{ width: '100%' }}>
            <Routes>
              <Route
                path="communicateChat"
                element={<Main loggedInUsername={user} />}
              />
              <Route
                path="/about"
                element={<About loggedInUsername={user} />}
              />
            </Routes>
          </section>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screen/login';
import Home from './screen/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Tuyến đường mặc định */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
>>>>>>> b85c96160e4198fc415ab3ebc1bbe574472803fc
  );
};

export default App;
