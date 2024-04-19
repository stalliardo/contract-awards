import React, { useState } from 'react';
import EditTenderValueModal from './EditTenderValueModal';

const TendersSubmittedCell = ({ item }) => {
    const [showModal, setShowModal] = useState(false);

    const onCloseModal = () => {
        console.log('outer calose');
        setShowModal(false)
    }

    return (
        <td>
            <div className='tenders-cell' onClick={() => setShowModal(true)}>£{item.value.toLocaleString()}</div>

            {
                showModal &&
                <EditTenderValueModal item={item} handleCloseModal={onCloseModal}/>
            }
        </td>
    )
}

export default TendersSubmittedCell