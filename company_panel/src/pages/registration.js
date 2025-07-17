import React, { useState } from "react";
import axios from "axios";
import {Link } from 'react-router-dom';
export default function Registration() {
  const [nm, setnm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const validateForm = () => {
    if (password !== confirmPassword) {
      setPasswordMismatch("Passwords do not match.");
      return false;
    } else {
      setPasswordMismatch("");
      return true;
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try
      {
        
        // Update the axios.post URL
        await axios.post("http://localhost:6001/registration", {
          
          nm,
          email,
          password,
          contact,
          address,
         

        })
        alert("logged in successfully");
      }  catch (error) {
        console.error('Error during login:', error.message);
      }
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
              onSubmit={handleRegister}
            >
              <h2 className="form-title">Create account</h2>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  value={nm}
                  onChange={(e) => {
                    setnm(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                />
                <p id="passwordMismatch" className="error-message">
                  {passwordMismatch}
                </p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  name="address"
                  id="address"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  name="contact"
                  id="contact"
                  placeholder="Your Contact"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="agree-term"
                  id="agree-term"
                  className="agree-term"
                  required
                />
                <label htmlFor="agree-term" className="label-agree-term">
                  <span>
                    <span></span>
                  </span>
                  <b>I agree to all statements in </b>
                  <a href="#" className="term-service">
                    <b>Terms of service</b>
                  </a>
                </label>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  name="submit"
                  id="submit"
                  className="form-submit"
                  value="Sign up"
                  onClick={validateForm}
                />
              </div>
            </form>
            <p className="loginhere">
              Have already an account ?{" "}
              <Link className="loginhere-link" to="/login"> Login Here </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
