import React, { useEffect, useState } from 'react';
import SelectMenu from '../selectMenu/SelectMenu';

import '../awards/table/awardsTable.css';
import { useDispatch } from 'react-redux';
import { addAllLocationsToUser, addLocationToUser, removeLocationFromUser } from '../../redux/features/users/usersThunk';

const UsersTableRow = ({ data, availableLocations }) => {

    const dispatch = useDispatch();

    const [showLocationsDropdown, setshowLocationsDropdown] = useState(false);
    const [showAddNewLocation, setShowAddNewLocation] = useState(false);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState({});
    const [addAllButtonDisabled, setAddAllButtonDisabled] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState([]);

    useEffect(() => {
        if (Object.keys(selectedLocation).length) {
            if (data.locations.includes(selectedLocation.name)) {
                setSaveButtonDisabled(true);
            } else {
                setSaveButtonDisabled(false);
            }
        }
    }, [selectedLocation])

    useEffect(() => {
        setAddAllButtonDisabled(data.locations.length === availableLocations.length);

        const filteredLocs = availableLocations.filter(location => !data.locations.includes(location.name));

        setFilteredLocations(filteredLocs);

    }, [data.locations, availableLocations])

    useEffect(() => {
        

    }, [availableLocations, data.locations])


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
        dispatch(addLocationToUser({ location: selectedLocation.name, userId: data._id }));
    }

    const onAddAllLocationsClicked = () => {
        const confirmation = window.confirm("Are you sure you want to add ALL locations?");

        // disable add all if the length of the locations and the users locations match
        if (confirmation) {
            dispatch(addAllLocationsToUser({ userId: data._id }));
        }
    }

    const onRemoveLocationClicked = (location) => {
        const confirmation = window.confirm(`Are you sure you want to remove "${location}"?`);

        // TODO once the real locations have been retrieved
        if (confirmation) {
            dispatch(removeLocationFromUser({ location, userId: data._id }));
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
                <div className='users-table-locations-container' >
                    <p>{data.locations.length}</p>
                    <button onClick={onViewLocationsClicked}>Edit</button>
                </div>
                {
                    showLocationsDropdown &&
                    <div className='blackout-overlay'>
                        <div className="users-table-locations-dropdown-container">
                            <h2>Location Information for {data.name}</h2>
                            <div className='fixer'>
                                <div className='users-table-locations-dropdown-container-left'>
                                    <h4>Current Locations</h4>
                                    <ul>
                                        {
                                            data.locations.length ?
                                                data.locations.map((location, index) => {
                                                    return <li className='' key={index}>
                                                        {location}
                                                        <button onClick={() => onRemoveLocationClicked(location)} className='red'>Remove</button>
                                                    </li>
                                                }) :
                                                <div className='users-table-locations-dropdown-container-no-locations-container'>
                                                    <p>0</p>
                                                </div>
                                        }
                                    </ul>
                                    {/* <button onClick={() => setShowAddNewLocation(true)}>Edit</button> */}
                                </div>
                                <div className='users-table-display-locations-container'>
                                    <div>
                                        {
                                            addAllButtonDisabled ?
                                                <p id='all-assigned'>{data.name} has all locations assigned</p>
                                                :
                                                <>
                                                    <h4>Add New Location</h4>
                                                    <SelectMenu menuItems={filteredLocations} placeholder={"Locations"} handleItemSelection={onLocationSelected} />
                                                    <div className='users-table-display-locations-buttons add-all'>
                                                        <button disabled={addAllButtonDisabled} onClick={onAddAllLocationsClicked}>Save / Add All</button>
                                                    </div>
                                                </>
                                        }
                                    </div>

                                    <div className='users-table-display-locations-buttons cancel'>
                                        <button disabled={saveButtonDisabled} onClick={onSaveLocationClicked}>Save / Add One</button>
                                        <button onClick={onCancelClicked}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </td>
            {/* <td className='table-actions-cell'>
                <button className='table-actions-cell' onClick={onEditClicked}>Edit</button>
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell red' onClick={onDeleteUserClicked}>Delete</button>
            </td> */}
        </tr>
    )
}

export default UsersTableRow;

// need to check a users permissions to see what they can actually do on this page.  Or just not enable certain options for certain people

// will need a new members model, route, controller, endpoint



// TODO Save button needs to be hidden by default

// REMOVE edit button in the row - no longer needed

// Add ALL option in the location seciton

// Add all works but, should only work once.
// The height of the modal needs to be capped and overflow y set to scroll
// Also, when clicking add all - only add the values that thhe user doesnt already have - same as ^
