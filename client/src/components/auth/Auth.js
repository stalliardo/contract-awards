import React, { useEffect, useState } from 'react'
import './auth.css' 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addTokenToStorage, getTokenFromStorage } from '../../utils/localStorageUtils';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated } from '../../redux/features/auth/authSlice';

const Auth = () => {
  const initialFormData = {username: "", password: ""};
  const [formData, setFormData] = useState(initialFormData);
  const [errorText, setErrorText] = useState("");

  const [logInButtonDisabled, setLogInButtonDisabled] = useState(true);

  useEffect(() => {
    if(formData.username.length > 2 && formData.password.length > 5) {
      setLogInButtonDisabled(false);
    } else {
      setLogInButtonDisabled(true);
    }
  }, [formData])

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();

    // TODO add disabled state to buttons
    axios.post("/login", {
      username: formData.username,
      password: formData.password
    }).then((res) => {  
      const token = res.data.token;

      addTokenToStorage(token);
      dispatch(setIsAuthenticated(true));
      navigate("/");

      setErrorText("");
    }).catch((e) => {
      if(e.response.data.error === "Invalid Credentials") {
        setErrorText(e.response.data.error)
      } else {
        setErrorText("An error occured. Please try again later. If the issue persists, contact your system administrator.")
      }
    })
  }

  const handleChange = (e) => {
    setErrorText("");
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <div className='auth-container'>
        <h1>Authentication</h1>
        <p>Please log in using your wingate credentials. Using the first.last format.</p>

        <form className='auth-form-container' onSubmit={login}>
          <input type='text' name="username" placeholder='John.Smith' onChange={handleChange}/> 
          <input type='password' name="password" placeholder='Password' onChange={handleChange}/> 
          <button disabled={logInButtonDisabled}>Log In</button>
          {errorText ? <p>{errorText}</p> : null}
        </form>
    </div>
  )
}

export default Auth;