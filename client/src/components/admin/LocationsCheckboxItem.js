import React from 'react'
import '../awards/table/awardsTable.css';

const LocationsCheckboxItem = ({location}) => {
  return (
    <div className='location-checkbox-item'>
        <label>{location.name}</label>
        <input type='checkbox'/>
    </div>
  )
}

export default LocationsCheckboxItem