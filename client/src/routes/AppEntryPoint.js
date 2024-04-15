import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getTokenFromStorage } from '../utils/localStorageUtils';


const AppEntryPoint = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getTokenFromStorage();
        if (token) {
            console.log('token from storage found! Verifying...');

            axios.get(`/api/auth/verify/${token}`).then((res) => {
                if (res.status === 200) {
                    console.log('200 called');
                    navigate("/");
                }
            }).catch((error) => {
                console.log('error = ', error);
            })

        } else {
            console.log('No token found in storgae');
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