import React, { useEffect, useState } from 'react'
import AwardsTable from '../components/awards/table/AwardsTable';
import { useSelector } from 'react-redux';

const Root = () => {
  const [locations, setLocations] = useState([]);

  const authenticatedUser = useSelector(state => state.users.authenticatedUser);

  useEffect(() => {
    if (authenticatedUser._id) {
      if (authenticatedUser.locations.length) {
        const sortedLocations = [...authenticatedUser.locations].sort();
        setLocations(sortedLocations);
      } else {
        console.log('no locations');
      }
    }
  }, [])

  return (
    <div className='root-page-awards-table'>
      {
        locations.length ? <AwardsTable locations={locations}/>
        : <div className='root-page-no-locations-message'>
          <p>Oops! It seems you haven't been assigned to any locations yet. Only directors, regional directors and site admins can allocate locations. Please reach out to the appropriate person for further assistance.</p>
        </div>
      }
    </div>
  )
}

export default Root;