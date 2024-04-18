import React, { useState } from 'react';
import EditTenderValueModal from './EditTenderValueModal';

const TendersSubmittedCell = ({ item }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <td onClick={() => setShowModal(true)}>
            {item.value}

            {
                showModal &&
                <EditTenderValueModal item={item}/>
            }
        </td>
    )
}

export default TendersSubmittedCell