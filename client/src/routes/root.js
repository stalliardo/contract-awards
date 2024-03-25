import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AwardsTable from '../components/awards/table/AwardsTable';

const Root = () => {

    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if authenticated, if not transition to the auth page
        if(!isAuthenticated) {
          // TODO - re-enable
            console.log('not authed called');
            // navigate("/auth"); // TODO
        }
    }, []);

  return (
    <div className='root-page-awards-table'>
      <AwardsTable />
    </div>
  )
}

export default Root