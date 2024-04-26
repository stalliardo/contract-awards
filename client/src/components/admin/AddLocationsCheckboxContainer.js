import React, { useEffect, useState } from 'react'
import '../awards/table/awardsTable.css';
import LocationsCheckboxItem from './LocationsCheckboxItem';
import { ROLES } from '../../utils/constants';

const AddLocationsCheckboxContainer = ({locations, authenticatedUser}) => {
    const [locationsWithCheck, setLocationsWithCheck] = useState([])

    useEffect(() => {
        const formattedLocations = locations.map((location) => ({...location, checked: true}));
        setLocationsWithCheck(formattedLocations)
        console.log('fomr = ', formattedLocations);
    }, [locationsWithCheck])

  return (
    <div className='checkbox-container'>
        {
            locationsWithCheck.map((location, index) => {
                return <LocationsCheckboxItem key={index} location={location}/>
            })
        }

        {
            authenticatedUser.role === ROLES.CA01 &&
            <div className='checkbox-buttons'>
                <div>
                <button>Add All</button>
                </div>
            </div>
        }
    </div>
  )
}

export default AddLocationsCheckboxContainer