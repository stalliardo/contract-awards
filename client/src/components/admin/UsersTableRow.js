import React, { useEffect, useState } from 'react';
import SelectMenu from '../selectMenu/SelectMenu';

import '../awards/table/awardsTable.css';
import { useDispatch, useSelector } from 'react-redux';
import { addAllLocationsToUser, addLocationToUser, addProvidedLocationsToUser, removeLocationFromUser } from '../../redux/features/users/usersThunk';
import { ROLES } from '../../utils/constants';
import AddLocationsCheckboxContainer from './AddLocationsCheckboxContainer';

const UsersTableRow = ({ data, availableLocations }) => {
    const dispatch = useDispatch();

    const [showLocationsDropdown, setshowLocationsDropdown] = useState(false);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState({});
    const [selectedLocations, setSelectedLocations] = useState([]); // -< test
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
        let permittedLocationsForCurrentUser = [];

        if (authenticatedUser.role !== ROLES.CA01) {
            authenticatedUser.locations.forEach((location) => {
                permittedLocationsForCurrentUser.push(availableLocations.find((item) => item.name === location));
            })
        } else if (authenticatedUser.role === ROLES.CA01) {
            permittedLocationsForCurrentUser = availableLocations;
        }

        const filteredLocs = permittedLocationsForCurrentUser.filter(location => !data.locations.includes(location.name));

        setFilteredLocations(filteredLocs);

    }, [data.locations, availableLocations])

    const formattedRole = (groupName) => {
        if (groupName === ROLES.CA01) return "Director";
        if (groupName === ROLES.CA02) return "Regional Director";
        if (groupName === ROLES.CA03) return "User";
    }

    const editButtonDisabled = () => {
        if (authenticatedUser.role === ROLES.CA01) {
            if (data.name === authenticatedUser.name || data.role === ROLES.CA01) {
                return true;
            }
        }

        return false;
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
        // dispatch(addLocationToUser({ location: selectedLocation.name, userId: data._id }));

        const checkedLocations = selectedLocations.filter(location => location.checked === true).map(location => location.name);


        console.log('selected locations = ', checkedLocations);
        dispatch(addProvidedLocationsToUser({ userId: data._id, locations: checkedLocations }));

        setSaveButtonDisabled(true);
        setSelectedLocation({});
    }

    const onAddAllLocationsClicked = () => {
        const confirmation = window.confirm(`Are you sure you want to give ${data.name} access to all locations?`);

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

    const saveButtonDisabledHandler = (locations) => {
        console.log('save button disabled handler called + disbaled = ', locations);

        // loop the locations provided
        // if all checked call the onAddAllLocationsClicked function
        // else for part checked do i loop this dispatch(addLocationToUser({ location: selectedLocation.name, userId: data._id })); could try

        // first check if all are checked
        // const allLocationsAreChecked = !locations.find(location => location.checked === false);

        setSelectedLocations(locations);


        
        // if(allLocationsAreChecked) {
        //     // below function needs testing....
        // }
    }

    return (
        <tr>
            <td>{data.name}</td>
            <td>{formattedRole(data.role)}</td>
            <td>
                <div className='users-table-locations-container' >
                    <p>{data.locations.length}/{availableLocations.length}</p>
                    <button disabled={editButtonDisabled()} onClick={onViewLocationsClicked}>Edit</button>
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

                                                    let removeButtonDisabled = true;

                                                    if (authenticatedUser.locations.includes(location)) {
                                                        removeButtonDisabled = false;
                                                    }

                                                    return <li key={index}>
                                                        {location}
                                                        <button disabled={removeButtonDisabled} onClick={() => onRemoveLocationClicked(location)} className='red'>Remove</button>
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
                                                    {/* <h4>Add New Location</h4>
                                                    <SelectMenu menuItems={filteredLocations} placeholder="Locations" handleItemSelection={onLocationSelected} />
                                                    {authenticatedUser.role === ROLES.CA01 ?
                                                        <div className='users-table-display-locations-buttons add-all'>
                                                            <button disabled={addAllButtonDisabled} onClick={onAddAllLocationsClicked}>Save / Add All</button>
                                                        </div>
                                                        : null
                                                    } */}

                                                    <AddLocationsCheckboxContainer locations={filteredLocations} authenticatedUser={authenticatedUser} saveButtonDisabledHandler={saveButtonDisabledHandler}/>
                                                </>
                                        }
                                    </div>

                                    <div className='users-table-display-locations-buttons cancel'>
                                        <button disabled={false} onClick={onSaveLocationClicked}>Save / Add One</button>
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


// edit button enabled for director when...
// 1 - it is not their account
// 2 - it is not another tier 1 user