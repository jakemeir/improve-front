import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import axios from 'axios';
import '../style/Login.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp' | 'google'>('email');
  const navigate = useNavigate();

  const handleLogin = async () => {
    axios.post('http://localhost:8080/auth/login');
    navigate('/users');
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
      </div>
    </div>
  );
};

export default Login;
