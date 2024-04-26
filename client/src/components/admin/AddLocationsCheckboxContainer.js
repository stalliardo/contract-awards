import React from 'react'
import '../awards/table/awardsTable.css';
import LocationsCheckboxItem from './LocationsCheckboxItem';
import { ROLES } from '../../utils/constants';

const AddLocationsCheckboxContainer = ({locations, authenticatedUser}) => {

    console.log('locations = ', locations);
  return (
    <div className='checkbox-container'>
        {
            locations.map((location, index) => {
                return <LocationsCheckboxItem key={index} location={location}/>
            })
        }

        {
            authenticatedUser.role === ROLES.CA01 &&
            <div className='checkbox-buttons'>
                {/* <div className='checkbox-spacer'></div> */}
                <div>
                <button>Add All</button>
                </div>
            </div>
        }
    </div>
  )
}

export default AddLocationsCheckboxContainer