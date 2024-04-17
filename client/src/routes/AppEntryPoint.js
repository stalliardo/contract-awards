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
import Spinner from '../components/spinner/Spinner';

const AppEntryPoint = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        console.log('%c\n1: App entry called ', "color:red");

        const token = getTokenFromStorage();

        if (token && !users.authenticatedUser._id) {
            console.log('if token called');
            dispatch(verifyToken(token)).unwrap().then(response => {
                const { status } = response;
                const { user } = response.data;

                if (status === 200) {
                    dispatch(fetchUsers(user.username)).unwrap().then((res) => {
                        const {locations} = res;
                        console.log('locations - ', locations);
                        dispatch(setIsAuthenticated(true));
                    })
                }
            }).catch((error) => {
                dispatch(setIsAuthenticated(false));
                dispatch(clearAuthenticatedUserData());
                navigate("/auth");
            })
        } else if(token && users.authenticatedUser._id) {
            dispatch(setLoading(false));
            dispatch(setUsersLoading(false))
            navigate("/");
        } else {
            dispatch(setLoading(false));
            dispatch(setUsersLoading(false))
            navigate("/auth");
        }
    }, [auth.isAuthenticated])

    if (!auth.loading && !users.loading) {
        return (
            <div>
                <Navbar />
                <Outlet />
            </div>
        )
    } else {
        return <div style={{marginTop: "100px"}} className='spinner-container'><Spinner classes="page" /></div>
    }
}

export default AppEntryPoint;