import React from 'react'
import '../../routes/admin.css'
import './tenders-submitted.css'

const EditTenderValueModal = ({item}) => {

    const {location, month, value} = item;

    return (
        <div className='blackout-overlay'>
            <div className='tenders-modal'>
                
                {/* TODO Improve the below */}
                <h3>Edit value for {location}/{month}</h3> 
                {/* <input type='text' value={location} onChange={handleChange} /> */}
                <div className='admin-modal-buttons'>
                    {/* <button className='green' onClick={onAddLocation} disabled={saveButtonDisabled}>
                        {isSaving ? <div className='spinner-button'><Spinner classes="button" /></div> : "Save"}
                    </button>
                    <button onClick={onCloseAddLocationModal}>Close</button> */}
                </div>
            </div>
        </div>
    )
}

export default EditTenderValueModal