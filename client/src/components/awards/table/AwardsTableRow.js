import React, { useState } from 'react';
import AwardsTableAddRow from './AwardsTableAddRow';

import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '../../../redux/features/awards/awardsThunks';
import { ROLES } from '../../../utils/constants';

const AwardsTableRow = ({ data, onItemDeleted, onItemEdited, location, month, isCurrentFinancialYear, actionsRequired = true }) => {
    const [isEditing, setIsEditing] = useState(false);
    const authenticatedUser = useSelector(state => state.users.authenticatedUser);

    const dispatch = useDispatch();

    const onDeleteClicked = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this item?");

        if (confirmation) {
            await dispatch(deleteItem({ data, location, month, value: data.core }));
            onItemDeleted(data._id);
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
                    actionsRequired ?
                        <>
                            {
                                isCurrentFinancialYear || authenticatedUser.role === ROLES.CA01 ?

                                <>
                                    <td className='table-actions-cell'>
                                        <button className='table-actions-cell' onClick={onEditClicked}>Edit</button>
                                    </td>
                                    <td className='table-actions-cell'>
                                        <button className='table-actions-cell red' onClick={onDeleteClicked}>Delete</button>
                                    </td>
                                </>
                                :
                                <td id='awards-table-row-readonly'>Read Only</td>
                            }
                        </>
                        : null
                    
                       
                    
                }
            </tr>
        )
    }
}

export default AwardsTableRow;