import React, { useEffect, useState } from 'react';

import '../awards/table/awardsTable.css';
import { useDispatch, useSelector } from 'react-redux';
import { addAllLocationsToUser, addProvidedLocationsToUser, removeLocationFromUser } from '../../redux/features/users/usersThunk';
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
        document.body.style.overflow = 'hidden';
        setshowLocationsDropdown(true);
    }

    const onCancelClicked = () => {
        document.body.style.overflow = 'auto';
        setshowLocationsDropdown(false);
        setSelectedLocation({});
        setSaveButtonDisabled(true);
    }

    const onSaveLocationClicked = () => {
        const checkedLocations = selectedLocations.filter(location => location.checked === true).map(location => location.name);
        dispatch(addProvidedLocationsToUser({ userId: data._id, locations: checkedLocations }));
        onCancelClicked();
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
        setSelectedLocations(locations);
        setSaveButtonDisabled(!locations.find(location => location.checked === true))
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
                                    <div id='scroller'>
                                        {
                                            addAllButtonDisabled ?
                                                <p id='all-assigned'>{data.name} has all locations assigned</p>
                                                :
                                                <AddLocationsCheckboxContainer locations={filteredLocations} authenticatedUser={authenticatedUser} saveButtonDisabledHandler={saveButtonDisabledHandler} />
                                        }
                                    </div>
                                    <div className='users-table-display-locations-buttons cancel'>
                                        <button disabled={saveButtonDisabled} onClick={onSaveLocationClicked}>Save Locations</button>
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