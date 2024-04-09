import React, { useEffect, useState } from 'react'
import Spinner from '../spinner/Spinner';
import axios from 'axios';

const TargtesTableRow = ({ location, target, targetCategory, data }) => {

    const [showModal, setShowModal] = useState(false);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [targetState, setTargetState] = useState(target || {});
    const [newTargetValue, setNewTargetValue] = useState(targetState.targetValue || "");

    useEffect(() => {
        setSaveButtonDisabled(!newTargetValue.length > 0);
    }, [newTargetValue])

    const handleChange = (e) => {
        setNewTargetValue(e.target.value);
    }

    const onSetTargetClicked = async () => {

        try {
            setIsSaving(true);

            let targetPostData = {}

            if (targetState._id) {
                console.log('if called + t = ', target);
                targetPostData = {
                    category: targetCategory,
                    targetValue: newTargetValue,
                    location: location.name,
                    id: targetState._id
                }
            } else {
                console.log('else called');
                targetPostData = {
                    category: targetCategory,
                    targetValue: newTargetValue,
                    location: location.name,
                }
            }

            const targetAdded = await axios.put("/api/target", targetPostData);
            console.log('target addede = ', targetAdded);

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

    const onCloseModal = () => {
        setShowModal(false);
    }

    return (
        <tr id='admin-targets-tr'>
            <td>{location.name}</td>
            <td>£{newTargetValue !== "" ? newTargetValue : 0}</td>
            <td>
                <button onClick={() => setShowModal(true)}>{newTargetValue === 0 || newTargetValue === "" ? "Add" : "Edit"}</button>
            </td>

            {
                showModal &&
                <td>
                    <div className='blackout-overlay'>
                        <div className='admin-modal'>
                            <h3>TEMP text generated basde on adding or editing</h3>
                            <input type='number' value={newTargetValue} onChange={handleChange} />
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