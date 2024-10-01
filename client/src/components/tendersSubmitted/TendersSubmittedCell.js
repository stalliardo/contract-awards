import React, { useState } from 'react';
import EditTenderValueModal from './EditTenderValueModal';
import { COLOURS, ROLES } from '../../utils/constants';
import { useSelector } from 'react-redux';

const TendersSubmittedCell = ({ item }) => {
    const [showModal, setShowModal] = useState(false);

    const isCurrentFinancialYear = useSelector(state => state.users.isCurrentFinancialYear);
    const authenticatedUser = useSelector(state => state.users.authenticatedUser);

    const onCloseModal = () => {
        setShowModal(false);
    }

    const onCellClicked = () => {
        if(isCurrentFinancialYear || authenticatedUser.role === ROLES.CA01) setShowModal(true);
    }

    const color = item.value >= item.montlyTarget ? COLOURS.GREEN : COLOURS.RED;

    return (
        <td>
            <div style={{color: color}} className='tenders-cell' onClick={onCellClicked}>£{item.value.toLocaleString()}</div>

            {
                showModal &&
                <EditTenderValueModal item={item} handleCloseModal={onCloseModal}/>
            }
        </td>
    )
}

export default TendersSubmittedCell