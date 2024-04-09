import React, { useEffect, useState } from 'react'
import Spinner from '../spinner/Spinner';
import axios from 'axios';


// Need to pass in some formatted data from the admin comp
// Associate the locations with their target values


const TargtesTableRow = ({ location, target, targetCategory, data }) => {

    console.log('target = ', target);


    const [showModal, setShowModal] = useState(false);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [targetState, setTargetState] = useState(target || {});
    const [newTargetValue, setNewTargetValue] = useState(targetState.targetValue || "");

    const [buttonText, setButtonText] = useState("Add");

    useEffect(() => {
        setSaveButtonDisabled(!newTargetValue.length > 0);
    }, [newTargetValue])

const handleChange = (e) => {
        setNewTargetValue(e.target.value);
    }

    const onSetTargetClicked = async () => {
        
        try {
            setIsSaving(true);
            const targetAdded = await axios.post("/api/target", {
                category: targetCategory,
                targetValue: newTargetValue,
                location: location.name
            });

            setTargetState({
                ...targetState,
                targetValue: newTargetValue,
                category: targetCategory
            })
            // update the value in the array
            // setNewTargetValue(target)
            
            setShowModal(false);
        } catch (error) {
            console.log('Error while adding the new target.');
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
            {/* Is the ?? valie here? TEST */}
            <td>£{newTargetValue !== "" ? newTargetValue : 0}</td>
            <td>
                {/* // TEST */}
                <button onClick={() => setShowModal(true)}>{newTargetValue === 0 || newTargetValue === "" ? "Add" : "Edit"}</button>
            </td>

            {
                showModal &&
                // the below line will be used to replace the below code for adding data in the table
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

export default TargtesTableRow