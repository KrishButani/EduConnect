import React,{useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie'
import '../App.css';



export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user'])

    const handleLogin = async (e) => {
        e.preventDefault();
        // Update the axios.post URL
        axios.post("http://localhost:4001/login", {
            email: email,
            password: password
        })
        .then((res) => {
            alert("logged in successfully");
            setCookie('user', res.data.cookiee, { path: '/' })
              console.log(cookies.user)
              // setToken(res.data.token);
              // console.log(token)
                navigate("/dashboard");
            
        })
        .catch((error) => {
            console.error("Error:", error);
        });
  }


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
