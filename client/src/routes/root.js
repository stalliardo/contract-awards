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
            // console.log('not authed called');
            // navigate("/auth"); // TODO
        }
    }, []);

    useEffect(() => {
      if(authenticatedUser._id) {
        if(authenticatedUser.locations.length) {
          const sortedLocations = [...authenticatedUser.locations].sort();
          setLocations(sortedLocations);
        } else {
          console.log('no locations');
        }

        setUserHasLoaded(true);
      } else {
        setUserHasLoaded(false);
      }

    }, [authenticatedUser])

  return (
    <div className='root-page-awards-table'>
      { userHasLoaded &&
        
          locations.length ? <AwardsTable locations={locations}/>
          : <div className='root-page-no-locations-message'>
            <p>Oops! It seems you haven't been assigned to any locations yet. Only directors, regional directors ans site admins can allocate locations. Please reach out to the appropriate person for further assistance.</p>
          </div>
        
      }
    </div>
  )
}

export default Root;