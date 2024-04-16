import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTokenFromStorage } from '../utils/localStorageUtils';
import { verifyToken } from '../redux/features/auth/authThunk';
import { setIsAuthenticated } from '../redux/features/auth/authSlice';
import { clearAuthenticatedUserData, setSignedInUsersFullName } from '../redux/features/users/usersSlice';
import { fetchUsers } from '../redux/features/users/usersThunk';

const AppEntryPoint = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);

    useEffect(() => {
        const token = getTokenFromStorage();
        if (token) {
            dispatch(verifyToken(token)).unwrap().then(response => {
                const {status} = response;
                const {user} = response.data;

                if(status === 200) {
                    dispatch(setIsAuthenticated(true));
                    dispatch(setSignedInUsersFullName(user.username));

                    if(users.data.length) {
                    } else {
                      dispatch(fetchUsers());
                    }
                }
            }).catch((error) => {
                dispatch(setIsAuthenticated(false));
                dispatch(clearAuthenticatedUserData());
                navigate("/auth");
            })
        } else {
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