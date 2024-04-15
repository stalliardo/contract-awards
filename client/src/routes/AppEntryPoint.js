import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTokenFromStorage } from '../utils/localStorageUtils';
import { verifyToken } from '../redux/features/auth/authThunk';
import { setIsAuthenticated } from '../redux/features/auth/authSlice';
import { extractFirstAndLastName } from '../utils/stringUtils';
import { setSignedInUser } from '../redux/features/users/usersSlice';

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
                const {user} = response.data;

                console.log('user = = ', user);

                // TODO also need to link the logged in user with the users in the database
                // This will enable the handling of roles

                if(status === 200) {
                    dispatch(setIsAuthenticated(true));

                    dispatch(setSignedInUser(user.username));

                    // Can now use the full name to link up with the names in the

                    //bit of a navigation problem TODO
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