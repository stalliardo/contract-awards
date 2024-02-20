import React, { useEffect, useState } from 'react'
import './auth.css' 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {


  useEffect(() => {
    console.log('getting env var = ', process.env.REACT_APP_TEST);



    axios.get("/api");

  }, [])

  const initialFormData = {username: "", password: ""};
  const [formData, setFormData] = useState(initialFormData);
  const [errorText, setErrorText] = useState("");

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault()

    console.log('login called + formdata = ', formData);

    axios.post("/login", {
      username: formData.username,
      password: formData.password
    }).then((res) => {  
      console.log('post login success + res = ', res);
      navigate("/contract-form");

      setErrorText("");
    }).catch((e) => {
      console.log('Error posting login data = ', e);
      console.log('e.response', e.response.data.error);

      if(e.response.data.error === "Invalid Credentials") {
        setErrorText(e.response.data.error)
      }
    })
  }

  const handleChange = (e) => {
    setErrorText("");
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <div className='auth-container'>
        <h1>Contract Awards Authentication</h1>

        <form className='auth-form-container' onSubmit={login}>
          <input type='text' name="username" placeholder='John.Smith' onChange={handleChange}/> 
          <input type='password' name="password" placeholder='password' onChange={handleChange}/> 
          <button>Submit</button>
          {errorText ? <p>{errorText}</p> : null}
        </form>
    </div>
  )
}

export default Auth