import React, { useEffect, useState } from 'react';
import SelectMenu from '../selectMenu/SelectMenu';

import '../awards/table/awardsTable.css';


// REMOVE...
const TEMP_LOCATIONS = [
    "Basingstoke",
    "AWE",
    "Birmingham",
    "Glasgow",
    "London",

]


const UsersTableRow = ({ data, availableLocations }) => {




    const [showLocationsDropdown, setshowLocationsDropdown] = useState(false);
    const [showAddNewLocation, setShowAddNewLocation] = useState(false);

    useEffect(() => {
        
    }, [])

    

    const onEditClicked = () => {

    }

    const onDeleteClicked = () => {

    }

    const formattedRole = (groupName) => {
        if (groupName === "CA01") return "Director";
        if (groupName === "CA02") return "Regional Director";
        if (groupName === "CA03") return "User";
    }

    const onViewLocationsClicked = () => {
        console.log('clicked');
        setshowLocationsDropdown(true);

    }

    const testLeave = () => {
        // console.log('leave called');
        // setshowLocationsDropdown(false);
        // setShowAddNewLocation(false);
    }



    return (
        <tr>
            <td>{data.name}</td>
            <td>{formattedRole(data.role)}</td>
            <td>Required???</td>
            <td>
                {
                    !showLocationsDropdown ?
                        <div className='users-table-locations-container' >
                            <p>10</p>
                            <button onClick={onViewLocationsClicked}>View</button>
                        </div> :
                        <div className='blackout-overlay'>
                            <div className={`users-table-locations-dropdown-container`}>
                                <div className='users-table-locations-dropdown-container-left'>
                                    <h4>Current Locations</h4>
                                    <ul>
                                        {
                                            TEMP_LOCATIONS.map((location, index) => {
                                                return <li className='' key={index}>
                                                    {location}
                                                    <button className='red'>Remove</button>
                                                </li>
                                            })
                                        }
                                    </ul>
                                    {/* <button onClick={() => setShowAddNewLocation(true)}>Edit</button> */}
                                </div>
                                <div className='users-table-display-locations-container'>
                                        <h4>Add New Location</h4>
                                        {/* <ul>
                                            {
                                                availableLocations.map((location, index) => {
                                                    return <li key={index}>{location.name}</li>
                                                })
                                            }
                                        </ul> */}

                                        <SelectMenu menuItems={availableLocations} placeholder={"Locations"}/>

                                        <div className='users-table-display-locations-spacer'>
                                        </div>

                                        <div className='users-table-display-locations-buttons'>
                                            <button onClick={() => setShowAddNewLocation(false)}>Cancel</button>
                                            <button onClick={() => setShowAddNewLocation(true)}>Save</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                }
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell' onClick={onEditClicked}>Edit</button>
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell red' onClick={onDeleteClicked}>Delete</button>
            </td>
        </tr>
    )
}

export default UsersTableRow;

// need to check a users permissions to see what they can actually do on this page.  Or just not enable certain options for certain people

// will need a new members model, route, controller, endpoint