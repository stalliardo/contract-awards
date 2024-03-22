import React, { useEffect, useState } from 'react';
import AwardsTableAddRow from './AwardsTableAddRow';

import axios from 'axios';

const AwardsTableRow = ({data, onItemDeleted}) => {

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        console.log('data from useEffect row = ', data);
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

    const onEditClicked = () => {
        // TODO
        // Do i handle this here or bubble up?
        // The parent will need to know this has been edited so it can update the item in the array, so will need to return the new data
        // What about display? Shoow the edit / add row

        // For the addrowComp will need the id of the awardsDiary ie id for the basingstoke branch
        // And handlers for the funcitons
        // also need to pass the values in to the comp

        setIsEditing(true);
    }

    const itemEdited = () => {
        console.log('item edited called');
    }

    if(isEditing) {
        return <AwardsTableAddRow awardsTableId={data.awardsDiary} dataFromEdit={data} onCancelClicked={() => setIsEditing(false)} onItemAdded={itemEdited} />
    } else {
        return (
            <tr>
                <td>{data.contractNumber}</td>
                <td>{data.project}</td>
                <td>{data.programme}</td>
                <td>{data.contractor}</td>
                <td>{data.region}</td>
                <td>{data.core}</td>
    
    
                <td className='table-actions-cell'>
                    <button className='table-actions-cell blue' onClick={onEditClicked}>Edit</button>
                </td>
                <td className='table-actions-cell'>
                    <button className='table-actions-cell red' onClick={onDeleteClicked}>Delete</button>
                </td>
            </tr>
        )
    }


   
}

export default AwardsTableRow


// Each row will need to display from mongo:
// contractNumber
// project
// programme
// contractor
// region
// core