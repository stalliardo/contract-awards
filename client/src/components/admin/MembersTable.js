import React, { useEffect, useState } from 'react';

import '../awards/table/awardsTable.css';
import MemebersTableRow from './MemebersTableRow';
import MembersTableAddRow from './MembersTableAddRow';

import { useDispatch, useSelector } from 'react-redux';


const MembersTable = () => {
    const users = useSelector((state) => state.users);
    
    useEffect(() => {
        console.log('effect called from members tabke, users = ', users);
    }, [])

    const [showAddMember, setShowAddMember] = useState(false);

    // const members = [ // Will need to load these from either the store or via an api call to get via LDAP
    //     {
    //         name: "Darren Stallard",
    //         role: "Director",
    //         permissions: "Read / Write",
    //         locations: "All"
    //     },
    //     {
    //         name: "Darren Stallard",
    //         role: "Director",
    //         permissions: "Read / Write",
    //         locations: "All"
    //     },
    //     {
    //         name: "Darren Stallard",
    //         role: "Director",
    //         permissions: "Read / Write",
    //         locations: "All"
    //     },
    // ] // TODO REmove

    return (
        <div className='awards-table-container'>
            <div className='awards-page-table-container'>
                <div className='awards-page-title-and-button admin'>
                    <h3>Members</h3>

                    <button onClick={() => setShowAddMember(true)}>
                        Add Member
                    </button>
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
                                    <th colSpan="2" style={{ textAlign: "center", width: "10%" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.data.length ?
                                        users.data.map((data, index) => (

                                            <MemebersTableRow data={data} key={index} />
                                        ))
                                        : null
                                }
                                {
                            showAddMember &&
                            // the below line will be used to replace the below code for adding data in the table
                            <MembersTableAddRow />
                        }
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

export default MembersTable