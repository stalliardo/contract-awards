import React, { useEffect, useState } from 'react'
import Spinner from '../spinner/Spinner';
import axios from 'axios';

const TargtesTableRow = ({ location, target, targetCategory, data }) => {

    const [showModal, setShowModal] = useState(false);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [targetState, setTargetState] = useState(target || {targetValue: ""});
    const [prevTargetState, setPrevTargetState] = useState({});
    // const [newTargetValue, setNewTargetValue] = useState(targetState.targetValue || "");

    useEffect(() => {
        setSaveButtonDisabled(!targetState.targetValue?.length > 0);
    }, [targetState.targetValue])

    const handleChange = (e) => {
        setTargetState({
            ...targetState,
            targetValue: e.target.value
        })
    }

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
            <td>£{targetState.targetValue !== "" ? targetState.targetValue : 0}</td>
            <td>
                <button onClick={onShowModal}>{targetState.targetValue === "" || targetState.targetValue === "" ? "Add" : "Edit"}</button>
            </td>

            {
                showModal &&
                <td>
                    <div className='blackout-overlay'>
                        <div className='admin-modal'>
                            <input type='number' value={targetState.targetValue} onChange={handleChange} />
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


// only set the value once the button has been pressed (save). cuurrently entering a value adds that to the celleven when closing the model