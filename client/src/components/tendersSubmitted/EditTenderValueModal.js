import React from 'react'
import '../../routes/admin.css'
import './tenders-submitted.css'

const EditTenderValueModal = () => {
    return (
        <div className='blackout-overlay'>
            <div className='tenders-modal'>
                <h3>Add Location</h3>
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