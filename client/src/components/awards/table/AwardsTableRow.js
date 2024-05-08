import React, { useState } from 'react';
import AwardsTableAddRow from './AwardsTableAddRow';

import axios from 'axios';

const AwardsTableRow = ({ data, onItemDeleted, onItemEdited, location, month, isCurrentFinancialYear }) => {

    const [isEditing, setIsEditing] = useState(false);
    const onDeleteClicked = () => {
        const confirmation = window.confirm("Are you sure you want to delete this item?");

        if (confirmation) {
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

    const itemEdited = (data) => {
        onItemEdited(data)
        setIsEditing(false);
    }

    if (isEditing) {
        return <AwardsTableAddRow awardsTableId={data.awardsDiary} dataFromEdit={data} onCancelClicked={() => setIsEditing(false)} onItemAdded={itemEdited} location={location} month={month} />
    } else {
        return (
            <tr>
                <td>{data.contractNumber}</td>
                <td>{data.project}</td>
                <td>{data.programme}</td>
                <td>{data.contractor}</td>
                <td>{data.region}</td>
                <td>£{(parseInt(data.core)).toLocaleString()}</td>

                {
                    isCurrentFinancialYear ?
                    <div>
                        <td className='table-actions-cell'>
                            <button className='table-actions-cell' onClick={onEditClicked}>Edit</button>
                        </td>
                        <td className='table-actions-cell'>
                            <button className='table-actions-cell red' onClick={onDeleteClicked}>Delete</button>
                        </td>
                    </div>
                    :
                    <div id='awards-table-row-readonly'>Read Only</div>
                }
            </tr>
        )
    }
}

export default AwardsTableRow;