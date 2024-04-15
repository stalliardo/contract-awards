import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Spinner from '../../spinner/Spinner';

import { addData, editItem } from '../../../redux/features/awards/awardsThunks';

const AwardsTableAddRow = ({ awardsTableId, location, month, onItemAdded, onCancelClicked, dataFromEdit }) => {
    const [data, setData] = useState(dataFromEdit ?? { contractNumber: "", project: "", programme: "", contractor: "", region: "", core: "", location: "", month: "" }); // Use data passed in or defaults

    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setSaveButtonEnabled(isFormValid());
    }, [data])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const onSaveClicked = () => {
        setIsLoading(true);
        if(!dataFromEdit) {data.awardsDiaryId = awardsTableId;}
        data.location = location; // TODO <- needed?

        if(!dataFromEdit) { // Add
            dispatch(addData({data, month, location})).unwrap().then((response) => {
                console.log('response from unwrap = ', response);
                onItemAdded(response);
            }).catch((error) => {
                console.log('Error adding item: ', error);
            }).finally(() => {
                setIsLoading(false);
            })

        } else { // Edit
            dispatch(editItem({data, month, location, previousCoreValue: dataFromEdit.core})).unwrap().then((response) => {
                console.log('response from unwrap = ', response);
                onItemAdded(response);
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
                <input type='number' name='core' value={data.core} onChange={handleChange} />
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell' onClick={onCancelClicked}>Cancel</button>
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