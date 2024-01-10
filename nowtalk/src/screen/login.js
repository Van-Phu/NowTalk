import React, { useState, useEffect } from 'react';
import '../css/login.css'
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = ({ onLogin }) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleGetValueUsername = (event) => {
        const value = event.target.value;
        setUsername(value);
      };

    const handleGetValuePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
    };

    const handleLogin = () => {
      if (!username.trim() || !password.trim()) {
        alert("Vui lòng nhập tên đăng nhập và mật khẩu.");
        return;
      }
      axios.post('https://curly-pollen-steam.glitch.me/api/users/login', {
        username: username,
        password: password,
      })
      .then(response => {
        console.log("Đăng nhập thành công:", response.data);
        const loggedInUsername = response.data.username || username;
        onLogin();
        navigate('/', { state: { loggedInUsername: loggedInUsername } });
      })
      .catch(error => {
        console.error("Đăng nhập thất bại:", error);
      });
    };
    

    return(
        <div className='safeArea'>
            <div className='imageBackground'>
            </div>
            
            <div className='formLogin'>
                <h1 style={{color:'white', fontSize: 40, marginBottom: 50}}>ĐĂNG NHẬP</h1>

                <div className='input'>
                    <p className='textInput'>Tài khoản</p>
                    <div className='inputType'>
                        <Icon icon="solar:user-broken" color="#a4a4a4" fontSize={30} style={{margin: 10}} />
                        <input value={username} onChange={handleGetValueUsername} style={{height: 30, width: '100%', marginRight: 10, background: "#261046", border: 0, color: "#A4A4A4", fontSize: 20}}></input>
                    </div>
                </div>

                <div className='input'>
                    <p className='textInput'>Mật khẩu</p>
                    <div className='inputType'>
                        <Icon icon="mdi:password-outline" color="#a4a4a4" fontSize={30} style={{margin: 10}} />
                        <input type='password' value={password} onChange={handleGetValuePassword} style={{height: 30, width: '100%', marginRight: 10, background: "#261046", border: 0, color: "#A4A4A4", fontSize: 20}}></input>
                    </div>
                </div>

                <button onClick={handleLogin} className='btnLogin'>Đăng nhập</button>
            </div>
        </div>
    )
}

export default Login;