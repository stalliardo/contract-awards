import React, { useEffect, useState } from 'react'
import '../../routes/admin.css'
import './navbar.css'
import Spinner from '../spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { addTender } from '../../redux/features/tenders/tenderThunk';

const YearChangeWarningModal = ({onClose, onProceed}) => {

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

    const dispatch = useDispatch();
    const authenticatedUser = useSelector(state => state.users.authenticatedUser);

   
    return (
        <div className='blackout-overlay'>
            <div className='navbar-modal'>

                {/* TODO Improve the below */}
                <h3>Warning!</h3>
                <p>You are about to view historic data. The data displayed will be readonly. Any required changes will need to be handled by a system administrator.</p>
                
                <div className='admin-modal-buttons'>
                    <button className='green' onClick={onProceed}>
                       Proceed
                    </button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default YearChangeWarningModal;