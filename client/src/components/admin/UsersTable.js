import React, { useEffect, useState } from 'react';

import '../awards/table/awardsTable.css';
import UsersTableRow from './UsersTableRow';
import UsersTableAddRow from './UsersTableAddRow';

import { useDispatch, useSelector } from 'react-redux';
import { ROLES } from '../../utils/constants';

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
                console.log('01 called');
                break;
            }
            case ROLES.CA02: {
                console.log('02 called');
                filteredUsersBasedOnRole.push(users.data.filter(user => user.role === ROLES.CA03));
                console.log('filteredUsersBasedOnRole = ', ...filteredUsersBasedOnRole);
                setPermittedVisibleUserData(...filteredUsersBasedOnRole);
                break;
            }
            case ROLES.CA03: {
                console.log('03 called');
                break;
            }
        }

        console.log('current user stats = ', users.authenticatedUser);

        setFormattedAvailableLocations(formattedSelectMenuItems);
        setIsLoading(false);
    }, [availableLocations.length, users.data])

    console.log('data from table=  ', users.data);



    const [showAddMember, setShowAddMember] = useState(false);

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
                                        <th>Permissions</th>
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