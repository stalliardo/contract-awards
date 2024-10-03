import React, { useEffect, useState } from 'react';

import '../awards/table/awardsTable.css';
import UsersTableRow from './UsersTableRow';

import { ROLES } from '../../utils/constants';
import { useSelector } from 'react-redux';

const UsersTable = ({ availableLocations }) => {
    const users = useSelector((state) => state.users);

    const [isLoading, setIsLoading] = useState(true); 
    const [formattedAvailableLocations, setFormattedAvailableLocations] = useState([]);
    const [permittedVisibleUserData, setPermittedVisibleUserData] = useState([]);

    useEffect(() => {
        const formattedSelectMenuItems = availableLocations.map((location) => {
            return { ...location, value: location.name }
        })

        const authenticatedUserRole = users.authenticatedUser.role;
        const filteredUsersBasedOnRole = [];

        switch (authenticatedUserRole) {
            case ROLES.CA01: {
                filteredUsersBasedOnRole.push(users.data);
                setPermittedVisibleUserData(...filteredUsersBasedOnRole);
                break;
            }
            case ROLES.CA02: {
                filteredUsersBasedOnRole.push(users.data.filter(user => user.role === ROLES.CA03));
                setPermittedVisibleUserData(...filteredUsersBasedOnRole);
                break;
            }
            case ROLES.CA03: {
                break;
            }
        }

        setFormattedAvailableLocations(formattedSelectMenuItems);
        setIsLoading(false);
    }, [availableLocations.length, users.data])

    if (!isLoading) {
        return (
            <div className='awards-table-container'>
                <div className='awards-page-table-container'>
                    <div className='awards-page-title-and-button admin'>
                        <h3>Users</h3>
                    </div>
                    {
                        permittedVisibleUserData.length ?
                            <table id="awards-table" className='awards-form-table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Locations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        permittedVisibleUserData.length ?
                                            permittedVisibleUserData.map((data, index) => (

                                                <UsersTableRow data={data} key={index} availableLocations={formattedAvailableLocations} />
                                            ))
                                            : null
                                    }
                                </tbody>
                            </table>
                            : <div className='awards-table-no-data-container'>
                                <h3>No Members Found</h3>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default UsersTable;