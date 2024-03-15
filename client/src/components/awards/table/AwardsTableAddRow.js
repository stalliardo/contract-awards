import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AwardsTableAddRow = ({ awardsTableId, location, onItemAdded }) => {
    const [data, setData] = useState({ contractNumber: "", project: "", programme: "", contractor: "", region: "", core: "" })
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);

    useEffect(() => {
        setSaveButtonEnabled(isFormValid());
    }, [data])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const setShowAddRow = () => {

    }

    const onSaveClicked = () => {
        data.awardsDiaryId = awardsTableId;
        data.location = location;

        axios.post("/api/awards-diary/add-item", data).then((response) => {
            console.log('response from adding item = ', response);

            onItemAdded(response.data);
        }).catch((error) => {
            console.log('Error adding item: ', error);
        })
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
                <input type='text' name='contractNumber' onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='project' onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='programme' onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='contractor' onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='region' onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='core' onChange={handleChange} />
            </td>
            <td className='table-actions-cell' onClick={() => setShowAddRow(false)}>
                <button className='table-actions-cell blue'>Cancel</button>
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell green' disabled={!saveButtonEnabled} onClick={onSaveClicked}>Save</button>
            </td>

        </tr>
    )
}

export default AwardsTableAddRow