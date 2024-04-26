import React, { useState } from 'react'
import '../awards/table/awardsTable.css';

const LocationsCheckboxItem = ({location}) => {

    const [itemChecked, setItemChecked] = useState(false);

    const handleOnChange = (e) => {
        console.log('changed called');

        setItemChecked((prevState) => !prevState);
    }

  return (
    <div className='location-checkbox-item'>
        <label>{location.name}</label>
        <input type='checkbox' checked={location.checked} onChange={handleOnChange}/>
    </div>
  )
}

export default LocationsCheckboxItem