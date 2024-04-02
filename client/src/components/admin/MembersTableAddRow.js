import React, { useState } from 'react'
import Spinner from '../spinner/Spinner';

const MembersTableAddRow = () => {

    const initialData = {name: "", role: "", permissions: "", locations: ""};

    const [isLoading, setIsLoading] = useState(false);
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
    const [data, setData] = useState(initialData);

    const handleOnChange = (e) => {
        
    } 

    const onCancelClicked = () => {

    }

    const onSaveClicked = () => {

    }

    return (
        <tr>
            <td><input name="name" value={data.name} onChange={handleOnChange}/></td>
            <td><input name="name" value={data.name} /></td>
            <td><input name="name" value={data.name} /></td>
            <td><input name="name" value={data.name} /></td>
            
            <td className='table-actions-cell'>
                <button className='table-actions-cell' onClick={onCancelClicked}>Cancel</button>
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell green' disabled={!saveButtonEnabled} onClick={onSaveClicked}>
                    {isLoading ? <div className='spinner-button'><Spinner classes="button" /></div> : "Save"}
                </button>
            </td>
        </tr>
    )
}

export default MembersTableAddRow