import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Root = () => {

    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if authenticated, if not transition to the auth page
        if(!isAuthenticated) {
            console.log('not authed called');
            navigate("/auth")
        }
    }, []);


  return (
    <div>
        Root page
    </div>
  )
}

export default Root