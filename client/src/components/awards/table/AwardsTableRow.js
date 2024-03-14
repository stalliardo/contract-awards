import React from 'react'

const AwardsTableRow = (data) => {

    console.log('data = ', data);

    return (
        <tr>
            <td>83211</td>
            <td>Twickenham</td>
            <td>38 Weeks</td>
            <td>FK Group</td>
            <td>BAS</td>
            <td>£22,999</td>


            <td className='table-actions-cell'>
                <button className='table-actions-cell edit'>Edit</button>
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell delete'>Delete</button>
            </td>
        </tr>
    )
}

export default AwardsTableRow


// Each row will need to display from mongo:
// contractNumber
// project
// programme
// contractor
// region
// core