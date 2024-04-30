import React, { useEffect, useState } from 'react'
import '../awards/table/awardsTable.css';
import LocationsCheckboxItem from './LocationsCheckboxItem';
import { ROLES } from '../../utils/constants';

const AddLocationsCheckboxContainer = ({locations, authenticatedUser, saveButtonDisabledHandler}) => {
    const [locationsWithCheck, setLocationsWithCheck] = useState([]);

    useEffect(() => {
        const formattedLocations = locations.map((location) => ({...location, checked: false}));

        setLocationsWithCheck(formattedLocations)
    }, [locations]);

    const setAllChecked = () => {
        const newLocations = [...locationsWithCheck];
        const formattedLocations = newLocations.map((location) => ({...location, checked: true}));
        setLocationsWithCheck(formattedLocations);

        saveButtonDisabledHandler(formattedLocations);
    }

    const onChecked = (location) => {
       const newLocations = [...locationsWithCheck];
       const index = newLocations.findIndex(item => item.name === location.name);

       if(index > -1) {
            newLocations[index].checked = !newLocations[index].checked;
            setLocationsWithCheck(newLocations);
            saveButtonDisabledHandler(newLocations);
       }
    }

  return (
    <div className='checkbox-container'>
        {
            locationsWithCheck.map((location, index) => {
                return <LocationsCheckboxItem key={index} location={location} onChecked={onChecked}/>
            })
        }
        {
            authenticatedUser.role === ROLES.CA01 &&
            <div className='checkbox-buttons'>
                <div>
                <button onClick={setAllChecked}>Select All</button>
                </div>
            </div>
        }
    </div>
  )
}

export default AddLocationsCheckboxContainer;