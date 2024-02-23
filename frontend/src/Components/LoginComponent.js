import React, { useEffect, useState } from 'react';
import '../Styles/Login.css';
import {axiosInstance} from '../util/baseurl';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setmessage] = useState(null);
  const [buttonText, setButtonText] = useState("Submit");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;

      if (email && password) {
        const response = await axiosInstance.post('/api/auth/login', {
          email, password
        })
        const data = response.data;
        if (response) {
          console.log(data.token);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userEmail', data.useremail);

          setFormData({
            email: '',
            password: '',
          });
          setmessage(data.message);
          setTimeout(() => {
            setButtonText("Redirecting...");
            setTimeout(() => {
              navigate('/homepage');
            }, 3000);
          }, 2000);
        }
      }
    } catch (e) {
      setmessage("Login Error");
    }
  };

  useEffect((req, res) => {
    if (message) {
      setTimeout(() => {
        setmessage(null)
      }, 3000);
    }
  })

  return (
    <div className="maincontainer">
      <div className='logincontainer'>
        <div className='logintitle'>
          <h1 className='loginheading'>Login</h1>
        </div>
        <div className='divisioncontainer'>
          <div className='formoneside'>
            <div className='formonesideinfo'>
              <h1 className='hirestyle'>Latsify<p className='instyle'>CRM</p></h1>
              <p>Welcome aboard to Connect People</p>
              <p>{message}</p>
            </div>
          </div>
          <div className="formsecondside">
            <form onSubmit={handlesubmit} className='loginform'>
              <label className='emaillabel'>Email</label>
              <input
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <label className='passwordlabel'>Password</label>
              <input
                type='password'
                placeholder='Password'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button className="loginbutton" type='submit'>{buttonText}</button>
            </form>
            <div className='bottomend'>
              <span>Don't have an account? Signup here.</span><br /><a href="/">Signup</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;