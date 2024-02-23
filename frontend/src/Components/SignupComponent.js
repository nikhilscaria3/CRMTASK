/* Signup.js */

import React, { useEffect, useState } from 'react';
import '../Styles/Signup.css';
import {axiosInstance} from '../util/baseurl';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setmessage] = useState(null)

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, confirmPassword } = formData;

      if (email && password === confirmPassword) {
        const response = await axiosInstance.post('/api/auth/signup', {
          email, password
        })
        const data = response.data;
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
        });
        setmessage(data.message);
      }
    } catch (e) {
      setmessage("Registration Error");
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
      <div className='signupcontainer'>
        <div className='signuptitle'>
          <h1 className='signupheading'>Signup</h1>
        </div>
        <div className='divisioncontainer'>
          <div className='formoneside'>
            <div className='formonesideinfo'>
              <h1 className='hirestyle'>Latisfy<p className='instyle'>CRM</p></h1>
              <p>Welcome aboard to Hire and Connect People</p>
              <p>{message}</p>
            </div>
          </div>
          <div className="formsecondside">
            <form onSubmit={handlesubmit} className='signupform'>
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
              <label className='confirmpasswordlabel'>Confirm Password</label>
              <input
                type='password'
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
              <button className="signupbutton" type='submit'>Submit</button>
            </form>
            <div className='bottomend'>
              <span>Already have an account? Login here.</span><br /><a href="/login">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
