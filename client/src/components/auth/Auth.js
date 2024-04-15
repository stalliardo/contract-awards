import React, { useEffect, useState } from 'react'
import './auth.css' 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addTokenToStorage, getTokenFromStorage } from '../../utils/localStorageUtils';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated } from '../../redux/features/auth/authSlice';

const Auth = () => {
  useEffect(() => {
    console.log('getting env var = ', process.env.REACT_APP_TEST);
  }, [])


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
    console.log('login called + formdata = ', formData);

    axios.post("/login", {
      username: formData.username,
      password: formData.password
    }).then((res) => {  
      console.log('token = ', res.data.token);

      const token = res.data.token;

      addTokenToStorage(token);

      // set the isAuthenticated value to true

      dispatch(setIsAuthenticated(true));

      navigate("/");

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
        <h1>Authentication</h1>

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



// 1: Authentication with Active Directory - DONE
// 2: JWT Generation                       - DONE
// 3: Send JWT to Client                   - DONE
// 4: Client-Side Storage                  - DONE
// 5: Secure HTTP Cookies: 
// 6: Verify JWT on Requests               - DONE
// 7: Session Expiry and Refresh
// 8: Logout
// 9: Secure Backend Routes
// 10: Handle Unauthorized Access:

// Token Expiration Handling:

// When you receive the token from the server, along with the token, you should also receive an expiration timestamp or duration.
// Store this expiration information along with the token in localStorage.
// Before using the token for any authenticated requests, check if the token has expired by comparing the current time with the expiration time stored in localStorage.
// If the token has expired, you should prompt the user to re-authenticate or automatically refresh the token if your backend supports token refreshing.

// Secure Storage:

// Although localStorage provides a convenient way to store data on the client-side, it's important to note that data stored in localStorage is accessible to any script running in the same origin.
// To enhance security, you should still ensure that sensitive data, such as authentication tokens, are transmitted over secure HTTPS connections to prevent interception.
// Additionally, consider encrypting sensitive data before storing it in localStorage to add an extra layer of security, especially if the token contains sensitive user information.
// Token Refresh Mechanism:

// Implement a token refresh mechanism if your authentication server supports it. This allows the client to request a new token without requiring the user to re-authenticate.
// When the token is close to expiration, initiate a token refresh request to the server using the refresh token (if available) or the expired token.
// Update the stored token in localStorage with the new token received from the server.
// Clearing Token on Logout:

// When the user logs out or the session expires, clear the token from localStorage to ensure that it's no longer accessible.
// You can also provide an option for the user to manually log out, which will clear the token from localStorage and invalidate the session on the server side.