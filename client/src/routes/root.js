import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AwardsTable from '../components/awards/table/AwardsTable';
import { useSelector } from 'react-redux';
import { ROLES } from '../utils/constants';

const Root = () => {

    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userHasLoaded, setUserHasLoaded] = useState(false);
    const [locations, setLocations] = useState([]);
    const authenticatedUser = useSelector(state => state.users.authenticatedUser);

    useEffect(() => {
        // Check if authenticated, if not transition to the auth page
        if(!isAuthenticated) {
            console.log('not authed called');
            // navigate("/auth"); // TODO
        }
    }, []);

    useEffect(() => {
      if(authenticatedUser._id) {
        if(authenticatedUser.locations.length) {
          const sortedLocations = [...authenticatedUser.locations].sort();
          setLocations(sortedLocations);
        }

        setUserHasLoaded(true);
      } else {
        setUserHasLoaded(false);
      }

    }, [authenticatedUser])

  return (
    <div className='root-page-awards-table'>
      { userHasLoaded &&
        <AwardsTable locations={locations}/>
        }
    </div>
  )
}

export default Root;