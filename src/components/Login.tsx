import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import axios from 'axios';
import '../style/Login.css'
import Cookies from 'js-cookie';
import CreateUser from './CreateUser';

const Login: React.FC = () => {
  const [errors,setErrors] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpToken,setOtpToken] = useState('')
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp' | 'google'>('email');
  const navigate = useNavigate();


  const handleLogin = async () => {
    setErrors('');
    try {
      if (loginMethod === 'email') {
        const response = await axios.post('http://localhost:8080/auth/login', {
          email,
          password,
        });
  
        
          const { token } = response.data.data;
          console.log(token);
          
          Cookies.set('token', token, { expires: 1});
          navigate('/users');
        
      }
      if (loginMethod === 'otp') {

      

        if (email&&!otp) {
          const response = await axios.post('http://localhost:8080/auth/login/otp', {
            email
          });
          setOtpToken(response.data.data.token);
          console.log(otpToken);
          
        }

        if (otp&&otpToken) {
          console.log(otpToken);
          
          const response = await axios.post('http://localhost:8080/auth/login/otp/v', {
            token:otpToken,
            otp
          });
          const secondToken = response.data.data.token;
          
          
          Cookies.set('token', secondToken, { expires: 1});
          navigate('/users');
        
        }


        
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data.errorMessage || error.message);
        setErrors(error.response?.data.errorMessage || 'An error occurred while logging in.');
      } else {
        console.error('Unexpected error:', error);
        setErrors('An unexpected error occurred. Please try again.');
      }
    }
  };

  



  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-form">
        <div className="method-select">
          <button onClick={() => setLoginMethod('email')} className={loginMethod === 'email' ? 'active' : ''}>
            Email & Password
          </button>
          <button onClick={() => setLoginMethod('otp')} className={loginMethod === 'otp' ? 'active' : ''}>
            Email OTP
          </button>
        </div>
        {loginMethod === 'email' && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>
              Login
            </button>
          </>
        )}

        {loginMethod === 'otp' && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleLogin}>
              <LogIn /> Login with OTP
            </button>
          </>
        )}

        {/* כפתור Google */}
        <a href="http://localhost:8080/auth/google" className="google-login">
          Login with Google
        </a>
        <p>{errors && errors}</p>
        <Link to="/" className="header-logo">
              
            </Link>
      </div>
    </div>
  );
};

export default Login;
