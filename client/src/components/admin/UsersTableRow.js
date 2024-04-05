import React, { useEffect, useState } from 'react';
import SelectMenu from '../selectMenu/SelectMenu';

import '../awards/table/awardsTable.css';
import { useDispatch } from 'react-redux';
import { addLocationToUser, removeLocationFromUser } from '../../redux/features/users/usersThunk';


// REMOVE... Replace with real data
const TEMP_LOCATIONS = [
    "Basingstoke",
    "AWE",
    "Birmingham",
    "Glasgow",
    "London",

]


const UsersTableRow = ({ data, availableLocations }) => {

    const dispatch = useDispatch();

    const [showLocationsDropdown, setshowLocationsDropdown] = useState(false);
    const [showAddNewLocation, setShowAddNewLocation] = useState(false);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState({});

    useEffect(() => {
        if (Object.keys(selectedLocation).length) {
            setSaveButtonDisabled(false);
        }
    }, [selectedLocation])



    const onEditClicked = () => {

    }

    const onDeleteUserClicked = () => {

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

    const onCancelClicked = () => {
        setshowLocationsDropdown(false);
        setSelectedLocation({});
        setSaveButtonDisabled(true);
    }

    const onLocationSelected = (location) => {
        console.log('location from parent = ', location);
        // set save button to visisble

        setSelectedLocation(location);
    }

    const onSaveLocationClicked = () => {
        dispatch(addLocationToUser({location: selectedLocation.name, userId: data._id}));
    }

    const onRemoveLocationClicked = (location) => {
        const confirmation = window.confirm(`Are you sure you want to remove "${location}"?`);

        // TODO once the real locations have been retrieved
        if(confirmation) {
            dispatch(removeLocationFromUser({location: selectedLocation.name, userId: data._id}));
        } else {
            console.log('den');
        }
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
                            <div className="users-table-locations-dropdown-container">
                                <h2>Location Information for {data.name}</h2>
                                <div className='fixer'>
                                    <div className='users-table-locations-dropdown-container-left'>
                                        <h4>Current Locations</h4>
                                        <ul>
                                            {
                                                TEMP_LOCATIONS.map((location, index) => {
                                                    return <li className='' key={index}>
                                                        {location}
                                                        <button onClick={() => onRemoveLocationClicked(location)} className='red'>Remove</button>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                        {/* <button onClick={() => setShowAddNewLocation(true)}>Edit</button> */}
                                    </div>
                                    <div className='users-table-display-locations-container'>
                                        <div>
                                            <h4>Add New Location</h4>


                                            <SelectMenu menuItems={availableLocations} placeholder={"Locations"} handleItemSelection={onLocationSelected} />

                                            <div className='users-table-display-locations-buttons'>
                                                {/* Button disabled TODO TODO TODO TODO */}

                                            </div>
                                        </div>

                                        <div className='users-table-display-locations-buttons cancel'>
                                            <button disabled={saveButtonDisabled} onClick={onSaveLocationClicked}>Save</button>
                                            <button onClick={onCancelClicked}>Cancel</button>
                                        </div>
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
                <button className='table-actions-cell red' onClick={onDeleteUserClicked}>Delete</button>
            </td>
        </tr>
    )
}

export default UsersTableRow;

// need to check a users permissions to see what they can actually do on this page.  Or just not enable certain options for certain people

// will need a new members model, route, controller, endpoint



// TODO Save button needs to be hidden by default

// REMOVE edit button in the row - no longer needed