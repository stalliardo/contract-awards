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
    const auth = useSelector(state => state.auth);

    useEffect(() => {
      console.log('use ffect called from root');
      if(authenticatedUser._id) {
        if(authenticatedUser.locations.length) {

          console.log('locations called');
          const sortedLocations = [...authenticatedUser.locations].sort();
          setLocations(sortedLocations);
        } else {
          console.log('no locations');
        }

        console.log('user has loaded called');

        setUserHasLoaded(true);
      } else {
        setUserHasLoaded(false);
      }

    }, [])

  return (
    <div className='root-page-awards-table'>
      { userHasLoaded &&
        
          locations.length ? <AwardsTable locations={locations}/>
          : <div className='root-page-no-locations-message'>
            <p>Oops! It seems you haven't been assigned to any locations yet. Only directors, regional directors and site admins can allocate locations. Please reach out to the appropriate person for further assistance.</p>
          </div>
      }
    </div>
  )
}

export default Root;

// The above error message should only apply to none CA01 users
//almost like if they ahave the ca01 titel they should automatically have all locations assigned by default.