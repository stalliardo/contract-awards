import React, { useEffect } from 'react'

const AwardsTableRow = ({data}) => {

    useEffect(() => {
        console.log('data from useEffect = ', data);
    }, [])



    return (
        <tr>
            <td>{data.contractNumber}</td>
            <td>{data.project}</td>
            <td>{data.programme}</td>
            <td>{data.contractor}</td>
            <td>{data.region}</td>
            <td>{data.core}</td>


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