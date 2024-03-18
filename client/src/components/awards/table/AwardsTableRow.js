import React, { useEffect } from 'react'
import axios from 'axios';

const AwardsTableRow = ({data, onItemDeleted}) => {

    useEffect(() => {
        console.log('data from useEffect = ', data);
    }, [])

    const onDeleteClicked = () => {
        console.log('clicked');

       const confirmation = window.confirm("Are you sure you want to delete this item?");

       if(confirmation){
        axios.delete(`/api/awards-diary/${data.awardsDiary}/items/${data._id}`).then((response) => {
            // update the filtereddata.items array on success
            console.log('Item deeleted');

            onItemDeleted(data._id);
        }).catch((error) => {
            console.log('Error deleting Item. Error: ', error);
        })
       }
    }

    return (
        <tr>
            <td>{data.contractNumber}</td>
            <td>{data.project}</td>
            <td>{data.programme}</td>
            <td>{data.contractor}</td>
            <td>{data.region}</td>
            <td>{data.core}</td>


            <td className='table-actions-cell'>
                <button className='table-actions-cell blue'>Edit</button>
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell red' onClick={onDeleteClicked}>Delete</button>
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