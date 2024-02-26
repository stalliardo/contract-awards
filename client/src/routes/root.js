import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AwardsForm from '../components/awards/AwardsForm';

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
        <AwardsForm />
    </div>
  )
}

export default Root