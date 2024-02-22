import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AwardsPage from '../components/awards/AwardsPage';

const Root = () => {

    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if authenticated, if not transition to the auth page
        if(!isAuthenticated) {
          // TODO - re-enable
            console.log('not authed called');
            // navigate("/auth")
        }
    }, []);

  return (
    <div>
        <AwardsPage />
    </div>
  )
}

export default Root