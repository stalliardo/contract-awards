import React, { useState } from 'react';
import EditTenderValueModal from './EditTenderValueModal';
import { COLOURS } from '../../utils/constants';

const TendersSubmittedCell = ({ item }) => {
    const [showModal, setShowModal] = useState(false);

    const onCloseModal = () => {
        setShowModal(false)
    }

    const color = item.value >= item.montlyTarget ? COLOURS.GREEN : COLOURS.RED;

    return (
        <td>
            <div style={{color: color}} className='tenders-cell' onClick={() => setShowModal(true)}>£{item.value.toLocaleString()}</div>

            {
                showModal &&
                <EditTenderValueModal item={item} handleCloseModal={onCloseModal}/>
            }
        </td>
    )
}

export default TendersSubmittedCell