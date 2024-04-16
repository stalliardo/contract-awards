import React, { useEffect, useState } from 'react';
import SelectMenu from '../selectMenu/SelectMenu';

import '../awards/table/awardsTable.css';
import { useDispatch, useSelector } from 'react-redux';
import { addAllLocationsToUser, addLocationToUser, removeLocationFromUser } from '../../redux/features/users/usersThunk';
import { ROLES } from '../../utils/constants';

const UsersTableRow = ({ data, availableLocations }) => {
    const dispatch = useDispatch();

    const [showLocationsDropdown, setshowLocationsDropdown] = useState(false);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState({});
    const [addAllButtonDisabled, setAddAllButtonDisabled] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState([]);

    const authenticatedUser = useSelector(state => state.users.authenticatedUser);

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
        const permittedLocationsForCurrentUser = [];

        console.log('authed user from row = ', authenticatedUser.locations);
        console.log('available locations = ', availableLocations);

        authenticatedUser.locations.forEach((location) => {
            permittedLocationsForCurrentUser.push(availableLocations.find((item) => item.name === location));
        })     
        
        console.log('permitted = = ', permittedLocationsForCurrentUser);

        const filteredLocs = permittedLocationsForCurrentUser.filter(location => !data.locations.includes(location.name));

        setFilteredLocations(filteredLocs);

    }, [data.locations, availableLocations])

    const formattedRole = (groupName) => {
        if (groupName === ROLES.CA01) return "Director";
        if (groupName === ROLES.CA02) return "Regional Director";
        if (groupName === ROLES.CA03) return "User";
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
        setSelectedLocation(location);
    }

    const onSaveLocationClicked = () => {
        dispatch(addLocationToUser({ location: selectedLocation.name, userId: data._id }));
    }

    const onAddAllLocationsClicked = () => {
        const confirmation = window.confirm("Are you sure you want to add ALL locations?");

        if (confirmation) {
            dispatch(addAllLocationsToUser({ userId: data._id }));
        }
    }

    const onRemoveLocationClicked = (location) => {
        const confirmation = window.confirm(`Are you sure you want to remove "${location}"?`);

        if (confirmation) {
            dispatch(removeLocationFromUser({ location, userId: data._id }));
        } 
    }

    return (
        <tr>
            <td>{data.name}</td>
            <td>{formattedRole(data.role)}</td>
            <td>Required???</td>
            <td>
                <div className='users-table-locations-container' >
                    <p>{data.locations.length}/{availableLocations.length}</p>
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
        </tr>
    )
}

export default UsersTableRow;

// TODO - need to check a users permissions to see what they can actually do on this page.  Or just not enable certain options for certain people
// TODO - Who can a level 2 (regional director) see within the users table?

// So level two can see level one people only and can only give them access to their locations-> 