import React, { useEffect, useState } from 'react'
import Spinner from '../spinner/Spinner';
import addedxios from 'axios';


// Need to pass in some formatted data from the admin comp
// Associate the locations with their target values


const TargtesTableRow = ({ location, target }) => {

    const [showModal, setShowModal] = useState(false);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [newTargetValue, setNewTargetValue] = useState("");

    const [buttonText, setButtonText] = useState("Add");

    useEffect(() => {
        setSaveButtonDisabled(!newTargetValue.length > 0);
    }, [newTargetValue])

    const handleChange = (e) => {
        setNewTargetValue(e.target.value);
    }

    const onSetTargetClicked = async () => {
        console.log('klocation = ', location.name);
        console.log('category = ', "");
        console.log('newTargetValue = ', newTargetValue);
        // await axios.post("/api/target", {
        //     category: "",
        //     targetValue: newTargetValue,
        //     location: location.name
        // })
    }

    const onCloseModal = () => {
        setShowModal(false);
    }


    return (
        <tr id='admin-targets-tr'>
            <td>{location.name}</td>
            {/* Is the ?? valie here? TEST */}
            <td>{target.targetValue ?? 0}</td>
            <td>
                {/* // TEST */}
                <button onClick={() => setShowModal(true)}>{target.targetValue === 0 || target.targetValue === undefined ? "Add" : "Edit"}</button>
            </td>

            {
                showModal &&
                // the below line will be used to replace the below code for adding data in the table
                <td>
                    <div className='blackout-overlay'>
                    <div className='admin-modal'>
                        <h3>TEMP text generated basde on adding or editing</h3>
                        <input type='number' value={target.targetValue} onChange={handleChange} />
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