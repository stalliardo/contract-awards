import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTokenFromStorage } from '../utils/localStorageUtils';
import { verifyToken } from '../redux/features/auth/authThunk';
import { setIsAuthenticated, setLoading } from '../redux/features/auth/authSlice';
import { clearAuthenticatedUserData, setSignedInUsersFullName, setLoading as setUsersLoading } from '../redux/features/users/usersSlice';
import { fetchUsers } from '../redux/features/users/usersThunk';

const AppEntryPoint = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        console.log('%c\n1: App entry called', "color:red");

        const token = getTokenFromStorage();
        if (token) {
            dispatch(verifyToken(token)).unwrap().then(response => {
                const { status } = response;
                const { user } = response.data;

                if (status === 200 && !users.authenticatedUser._id) {
                    dispatch(setIsAuthenticated(true));
                    dispatch(setSignedInUsersFullName(user.username));

                    if (users.data.length) {
                        console.log('THERE ARE USERS / NOT CALLING FETCH\nand hence not setting the ');
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
            console.log('else called');
            dispatch(setLoading(false));
            dispatch(setUsersLoading(false))
            navigate("/auth");
        }
    }, [])

    if (!auth.loading && !users.loading) {
        return (
            <div>
                <Navbar />
                <Outlet />
            </div>
        )
    }
}

export default AppEntryPoint;