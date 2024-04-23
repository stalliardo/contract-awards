import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const AppEntryPoint = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default AppEntryPoint;