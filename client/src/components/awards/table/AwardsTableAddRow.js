import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../spinner/Spinner';

const AwardsTableAddRow = ({ awardsTableId, location, onItemAdded, onCancelClicked, dataFromEdit }) => {
    const [data, setData] = useState(dataFromEdit ?? { contractNumber: "", project: "", programme: "", contractor: "", region: "", core: "" }); // Use data passed in or defaults

    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSaveButtonEnabled(isFormValid());
        console.log('data from dataFromEdit = ', data);
    }, [data])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const onSaveClicked = () => {
        setIsLoading(true);
        if(!dataFromEdit) {data.awardsDiaryId = awardsTableId;}
        data.location = location; // TODO <- needed?

        // Use the dataFromEdit as flag to determine whether adding or editing a document.

        if(!dataFromEdit) { // Add
            axios.post("/api/awards-diary/add-item", data).then((response) => {
                onItemAdded(response.data);
            }).catch((error) => {
                console.log('Error adding item: ', error);
            }).finally(() => {
                setIsLoading(false);
            })
        } else { // Edit
            axios.patch(`/api/awards-diary/edit-item`, data).then((response) => {
                // onItemAdded(response.data);
            }).catch((error) => {
                console.log('Error adding item: ', error);
            }).finally(() => {
                setIsLoading(false);
            })
        }
    }

    const isFormValid = () => {
        return data.contractNumber.length > 0 &&
            data.project.length > 0 &&
            data.programme.length > 0 &&
            data.contractor.length > 0 &&
            data.region.length > 0 &&
            data.core.length > 0
    }

    return (
        <tr className='conditional-row'>
            <td>
                <input type='text' name='contractNumber' value={data.contractNumber} onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='project' value={data.project} onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='programme' value={data.programme} onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='contractor' value={data.contractor} onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='region' value={data.region} onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='core' value={data.core} onChange={handleChange} />
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell blue' onClick={onCancelClicked}>Cancel</button>
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell green' disabled={!saveButtonEnabled} onClick={onSaveClicked}>
                    {isLoading ? <div className='spinner-button'><Spinner classes="button"/></div> : "Save"}
                </button>
            </td>
        </tr>
    )
}

export default AwardsTableAddRow;


// This creates a new record however this is not desired behaviour when editing....
// Easy fix, use the isEditing flag todetermine whether editing or adding a doc