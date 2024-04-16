import React, { useEffect, useState } from 'react';

import '../awards/table/awardsTable.css';
import UsersTableRow from './UsersTableRow';
import UsersTableAddRow from './UsersTableAddRow';

import { useDispatch, useSelector } from 'react-redux';

const UsersTable = ({ availableLocations }) => {
    const users = useSelector((state) => state.users);
    const [isLoading, setIsLoading] = useState(true);
    const [formattedAvailableLocations, setFormattedAvailableLocations] = useState([]);

    useEffect(() => {
        const formattedSelectMenuItems = availableLocations.map((location) => {
            return { ...location, value: location.name }
        })

        setFormattedAvailableLocations(formattedSelectMenuItems);
        setIsLoading(false);
    }, [availableLocations.length])

  

    const [showAddMember, setShowAddMember] = useState(false);

    if(!isLoading){
        return (
            <div className='awards-table-container'>
                <div className='awards-page-table-container'>
                    <div className='awards-page-title-and-button admin'>
                        <h3>Users</h3>
                    </div>
                    {
                        users.data.length ?
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
                                        users.data.length ?
                                            users.data.map((data, index) => (
    
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

export default UsersTable