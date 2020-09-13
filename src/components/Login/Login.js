import React, { useContext } from 'react';

import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { intializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFBLogin } from './LoginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: true,
    name: '',
    email: '',
    photoURL: '',
    password: '',
  })

  intializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
        })
  }

  const fbLogin = () => {
    handleFBLogin()
    .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
    })
    }

  const signOut = () => {
      handleSignOut()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);

      })
  }

  
  const handleBlur = (event) => {
    let isFieldValid = true;
    if(event.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const paswordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && paswordHasNumber;
      // console.log(isPasswordValid && paswordHasNumber)
    }
    if (isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (event) => {
    // console.log(user.email,user.password)
    if(newUser && user.email && user.password){
      
    }

    if(!newUser && user.email && user.password){
      
    }

    event.preventDefault();
  }


  return (
    <div style={{textAlign: 'center'}}>
      { 
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
        <button onClick={googleSignIn}>Sign in</button>}
        <br/>
        {
          <button onClick={fbLogin}>Sign in with Facebook</button> 
        }
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} alt=""/>
          </div>
      }

      <h1>Our Own Authentication System</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <form action="" onSubmit={handleSubmit}>
      {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="you name"/>}
        <br/>
      <input type="text" name="email" onBlur={handleBlur} placeholder="Write your email address." required/>
      <br/>
      <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required/>
      <br/>
      <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {user.success && <p style={{color:'green'}}>User {newUser ? 'created' : 'Logged In'} successfully</p>}

    </div>
  );
}

export default Login;
