import React, {useEffect, useState} from 'react'
import '../../routes/admin.css'
import './tenders-submitted.css'
import Spinner from '../spinner/Spinner';

const EditTenderValueModal = ({item, handleCloseModal}) => {

    const {location, month, value} = item;
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [newValue, setNewValue] = useState(value);
    

    const isSaving = false; // TODO repoalce with loading from tender state

    const onEditValue = () => {
       
    }

    const onCloseModal = () => {
        console.log('close clalde');
        handleCloseModal()
    }

    const handleChange = (e) => {
        setNewValue( e.target.value);
    }

    useEffect(() => {
        if(newValue === 0 || newValue === "0") {
            setNewValue("");
        }
    }, [])

    useEffect(() => {
        console.log('new value = ', newValue);
        console.log('value = ', value);
        
        setSaveButtonDisabled(newValue.length < 1 || parseInt(newValue) === value);
    }, [newValue])

    return (
        <div className='blackout-overlay'>
            <div className='tenders-modal'>

                {/* TODO Improve the below */}
                <h3>Edit value for {location}/{month}</h3> 
                <input autoFocus type='number' value={newValue} onChange={handleChange} />
                <div className='admin-modal-buttons'>
                    <button className='green' onClick={onEditValue} disabled={saveButtonDisabled}>
                        {isSaving ? <div className='spinner-button'><Spinner classes="button" /></div> : "Save"}
                    </button>
                    <button onClick={onCloseModal}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default EditTenderValueModal