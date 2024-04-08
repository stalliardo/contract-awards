import React from 'react'
import TargtesTableRow from './TargtesTableRow';

const TargetsTable = ({tableTitle, data}) => {

console.log('data = ', data);

  return (
    <div className='awards-table-container'>
    <div className='awards-page-table-container'>
        <div className='awards-page-title-and-button admin'>
            <h3>{tableTitle}</h3>

            {/* <button onClick={() => setShowAddMember(true)}>
                Add User
            </button> */}
        </div>
        {
            data.length ?
                <table id="awards-table" className='awards-form-table'>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length ?
                                data.map((location, index) => (
                                    <TargtesTableRow data={location}/>
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
                    <h3>No locations Found</h3>
                    
                </div>
        }
    </div>
</div>
  )
}

export default TargetsTable