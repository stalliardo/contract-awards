import React, { useEffect, useState } from 'react'
import '../../routes/admin.css'
import './tenders-submitted.css'
import Spinner from '../spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { addTender } from '../../redux/features/tenders/tenderThunk';

const EditTenderValueModal = ({ item, handleCloseModal }) => {

    const { location, month, value, _id } = item;
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [newValue, setNewValue] = useState(value);

    const dispatch = useDispatch();
    const tenders = useSelector(state => state.tender);
    const authenticatedUser = useSelector(state => state.users.authenticatedUser);

    const onEditValue = () => {
       const data = {
        month,
        newValue,
        _id
       }

        dispatch(addTender({data, authenticatedUser}));
    }

    const onCloseModal = () => {
        handleCloseModal()
    }

    const handleChange = (e) => {
        setNewValue(e.target.value);
    }

    useEffect(() => {
        if (newValue === 0 || newValue === "0") {
            setNewValue("");
        }
    }, [])

    useEffect(() => {
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
                        {tenders.loading ? <div className='spinner-button'><Spinner classes="button" /></div> : "Save"}
                    </button>
                    <button onClick={onCloseModal}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default EditTenderValueModal;