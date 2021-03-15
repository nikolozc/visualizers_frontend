import React, { useState } from "react";

function Main({handleLogin, handleSignUp, errors, errorsSignUp}) {

const[name, setName] = useState("");
const[password, setPassword] = useState("");
const[nameS, setNameS] = useState("");
const[passwordS, setPasswordS] = useState("");

  return (
      <div className="mainContent">
          <div className="logIn">
              <h1 style={{transform:"TranslateX(-50px)"}}>Log In</h1>
              <form className="loginForm" onSubmit={handleLogin}>
                <div className="loginFormInput">
                    <label htmlFor="name">name</label>
                    <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} style={{marginBottom: "15px"}}></input>
                    <label htmlFor="name">password</label>
                    <input type="text" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                {errors.map(error => {
                    return <p style={{color: "#0048a7", fontSize: "14px"}} key={error}>{error}</p>
                })}
                <button type="submit" className="mainLoginBtn">Login</button>
            </form>
          </div>
          <div className="signUp">
              <h1 style={{transform:"TranslateX(-50px)"}}>Sign Up</h1>
              <form className="signupForm" onSubmit={handleSignUp}>
                <div className="signupFormInput">
                    <label htmlFor="name">name</label>
                    <input type="text" id="name" name="name" value={nameS} onChange={e => setNameS(e.target.value)} style={{marginBottom: "15px"}}></input>
                    <label htmlFor="name">password</label>
                    <input type="text" id="password" name="password" value={passwordS} onChange={e => setPasswordS(e.target.value)}></input>
                </div>
                {errorsSignUp.map(error => {
                    return <p style={{color: "#0048a7", fontSize: "14px"}} key={error}>{error}</p>
                })}
                <button type="submit" className="mainSignupBtn">Signup</button>
            </form>
          </div>
      </div>
  );
}

export default Main;
