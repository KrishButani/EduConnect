import React,{useState} from 'react'
import axios from 'axios'
import {Link } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        // Update the axios.post URL
        await axios.post("http://localhost:6001/login", {
         email,password,
        });
        alert("logged in successfully");
      } catch (error) {
        console.error('Error during login:', error.message);
      }
    
};



  return (
    <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <form
              action="#"
              method="POST"
              id="signup-form"
              className="signup-form"
              onSubmit={handleLogin}
            >
              <h2 className="form-title">Login account</h2>
             
              <div className="form-group">
              <div className="form-group">
              <input
                type="email" onChange={(e)=>{setEmail(e.target.value)}}
                className="form-input"
                name="email"
                id="name"
                placeholder="email"
              />
             </div>
              </div>
              <div className="form-group">
                <input
                  type="password" onChange={(e)=>{setPassword(e.target.value)}}
                  className="form-input"
                  name="password"
                  id="password"
                  placeholder="Password"

                  required
                /> 
              </div>
              <div className="form-group">
                <input
                  type="submit" onClick={handleLogin}
                  name="submit"
                  id="submit"
                  className="form-submit"
                  value="login"
                />
              </div>
            </form>
            
            <p className="loginhere">
              Doesn't have an Account ?{" "}
              
              <Link className="loginhere-link" to="/register"> Register Here </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
