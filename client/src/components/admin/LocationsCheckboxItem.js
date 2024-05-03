import React, { useState } from 'react'
import '../awards/table/awardsTable.css';

const LocationsCheckboxItem = ({location, onChecked}) => {

    const [itemChecked, setItemChecked] = useState(false);

    // const handleOnChange = (e) => {
    //     onChecked
    // }

  return (
    <div className='location-checkbox-item'>
        <label>{location.name}</label>
        <input type='checkbox' checked={location.checked} onChange={() => onChecked(location)}/>
    </div>
  )
}

export default LocationsCheckboxItem