import React, { useEffect, useState } from 'react';

import '../awards/table/awardsTable.css';
import UsersTableRow from './UsersTableRow';
import UsersTableAddRow from './UsersTableAddRow';

import { useDispatch, useSelector } from 'react-redux';

const UsersTable = ({ availableLocations }) => {
    const users = useSelector((state) => state.users);
    const [formattedAvailableLocations, setFormattedAvailableLocations] = useState([]);


    useEffect(() => {
        const formattedSelectMenuItems = availableLocations.map((location) => {
            return { ...location, value: location.name }
        })

        setFormattedAvailableLocations(formattedSelectMenuItems);
    }, [availableLocations.length])

  

    const [showAddMember, setShowAddMember] = useState(false);

    return (
        <div className='awards-table-container'>
            <div className='awards-page-table-container'>
                <div className='awards-page-title-and-button admin'>
                    <h3>Users</h3>

                    {/* <button onClick={() => setShowAddMember(true)}>
                        Add User
                    </button> */}
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
                                {/* {
                                    showAddMember &&
                                    // the below line will be used to replace the below code for adding data in the table
                                    <UsersTableAddRow />
                                } */}
                            </tbody>
                        </table>
                        : <div className='awards-table-no-data-container'>
                            <h3>No Members Found</h3>
                            {/* Now how to dispay the add row? */}
                            {/* <FirstAwardsEntry awardsTableId={filteredData._id} location={filteredData.location} onItemAdded={itemAdded} /> */}
                        </div>
                }
            </div>
        </div>
    )
}

export default UsersTable