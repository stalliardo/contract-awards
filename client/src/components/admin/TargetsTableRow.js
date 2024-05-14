import React, { useEffect, useState } from 'react'
import Spinner from '../spinner/Spinner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateTargets } from '../../redux/features/awards/awardsSlice';

const TargtesTableRow = ({ location, target, targetCategory, data }) => {
    const [showModal, setShowModal] = useState(false);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [targetState, setTargetState] = useState(target);
    const [prevTargetState, setPrevTargetState] = useState({});

    const isCurrentFinancialYear = useSelector(state => state.users.isCurrentFinancialYear);

    const dispatch = useDispatch();

    useEffect(() => {
        setSaveButtonDisabled(!targetState?.targetValue?.length > 0);
    }, [targetState?.targetValue])

    const handleChange = (e) => {
        setTargetState({
            ...targetState,
            targetValue: e.target.value
        })
    }

    useEffect(() => {
        setTargetState(target);
    }, [target])

    const onSetTargetClicked = async () => {

        try {
            setIsSaving(true);

            let targetPostData = {}

            if (targetState._id) {
                targetPostData = {
                    category: targetCategory,
                    targetValue: targetState.targetValue,
                    location: location.name,
                    id: targetState._id
                }
            } else {
                targetPostData = {
                    category: targetCategory,
                    targetValue: targetState.targetValue,
                    location: location.name,
                }
            }

            const targetAdded = await axios.put("/api/target", targetPostData);

            // once added, dispatch a function that changes the data either by adding to the awards.targets or editing an exisiting one

            dispatch(updateTargets(targetAdded.data));

            setTargetState({
                ...targetState,
                ...targetAdded.data
            })

            setShowModal(false);
        } catch (error) {
            console.log('Error while adding the new target. Error: ', error);
        } finally {
            setIsSaving(false);
        }
    }

    const onShowModal = () => {
        setPrevTargetState(targetState);
        setShowModal(true);
    }

    const onCloseModal = () => {
        setTargetState(prevTargetState);
        setShowModal(false);
    }

    return (
        <tr id='admin-targets-tr'>
            <td>{location.name}</td>
            <td>£{targetState !== undefined ? targetState.targetValue : 0}</td>
            <td>
                {
                    isCurrentFinancialYear ? 
                    <button onClick={onShowModal}>{targetState?.targetValue === "" || targetState?.targetValue === "" ? "Add" : "Edit"}</button>
                    :
                    <span>Read Only</span>
                }
            </td>

            {
                showModal &&
                <td>
                    <div className='blackout-overlay'>
                        <div className='admin-modal'>
                            <input type='number' value={targetState?.targetValue} onChange={handleChange} />
                            <div className='admin-modal-buttons'>
                                <button className='green' onClick={onSetTargetClicked} disabled={saveButtonDisabled}>
                                    {isSaving ? <div className='spinner-button'><Spinner classes="button" /></div> : "Save"}
                                </button>
                                <button onClick={onCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </td>
            }
        </tr>
    )
}

export default TargtesTableRow;

// TODO - Disable editing when not the currentYear