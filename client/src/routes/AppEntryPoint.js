import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTokenFromStorage } from '../utils/localStorageUtils';
import { verifyToken } from '../redux/features/auth/authThunk';
import { setIsAuthenticated } from '../redux/features/auth/authSlice';

const AppEntryPoint = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getTokenFromStorage();
        if (token) {
            console.log('token from storage found! Verifying...');

            dispatch(verifyToken(token)).unwrap().then(response => {
                console.log('response from unwrap = ', response);
                const {status} = response;

                if(status === 200) {
                    console.log('200 called in switch');
                    dispatch(setIsAuthenticated(true));
                    navigate("/");
                }
                
            }).catch((error) => {
                dispatch(setIsAuthenticated(false));

                console.log('error from unwrap. error = ', error);  
            })
        } else {
            console.log('No token found in storgae');
            navigate("/auth");
        }
    }, [])

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default AppEntryPoint