import React, { useEffect, useState } from 'react';
import AwardsTableAddRow from './AwardsTableAddRow';

import axios from 'axios';

const AwardsTableRow = ({data, onItemDeleted}) => {

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // console.log('data from useEffect row = ', data);
    }, [])

    const onDeleteClicked = () => {
       const confirmation = window.confirm("Are you sure you want to delete this item?");

       if(confirmation){
        axios.delete(`/api/awards-diary/${data.awardsDiary}/items/${data._id}`).then((response) => {
            onItemDeleted(data._id);
        }).catch((error) => {
            console.log('Error deleting Item. Error: ', error);
        })
       }
    }

    const onEditClicked = () => {
        setIsEditing(true);
    }

    const itemEdited = () => {
        setIsEditing(false);
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