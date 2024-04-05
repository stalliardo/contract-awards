import React, { useState } from 'react'
import Spinner from '../spinner/Spinner';

const UsersTableAddRow = () => {

    const initialData = {name: "", role: "", permissions: "", locations: ""};

    const [isLoading, setIsLoading] = useState(false);
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
    const [data, setData] = useState(initialData);

    const handleOnChange = (e) => {
        // TODO
    } 

    const onCancelClicked = () => {

    }

    const onSaveClicked = () => {

    }

    return (
        <tr>
            <td><input name="name" value={data.name} onChange={handleOnChange}/></td>
            <td><input name="role" value={data.name} onChange={handleOnChange}/></td>
            <td><input name="permission" value={data.name} onChange={handleOnChange}/></td>
            <td><input name="locations" value={data.name} onChange={handleOnChange}/></td>
            
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

export default UsersTableAddRow