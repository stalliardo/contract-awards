import React, { useEffect, useState } from 'react'
import './forms.css';

const FirstAwardsEntry = () => {

    const [data, setData] = useState({contractNumber: "", project: "", programme: "", contractor: "", region: "", core: ""})
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);


    useEffect(() => {
        setSaveButtonEnabled(isFormValid());
    }, [data])

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const onSaveClicked = () => {
        console.log('data = ', data);
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
        <div className='first-awards-entry-form'>
            <h3>Add Award Form</h3>

            <label>Contract No</label>
            <input type='text' name='contractNumber' onChange={handleChange} />

            <label>Project</label>
            <input type='text' name='project' onChange={handleChange} />

            <label>Programme</label>
            <input type='text' name='programme' onChange={handleChange} />

            <label>Contractor</label>
            <input type='text' name='contractor' onChange={handleChange} />

            <label>Region</label>
            <input type='text' name='region' onChange={handleChange} />

            <label>Core</label>
            <input type='text' name='core' onChange={handleChange} />

            <div className='first-awards-entry-form-button'>
                <button className='blue' disabled={!saveButtonEnabled} onClick={onSaveClicked}>Save</button>
            </div>
        </div>
    )
}

export default FirstAwardsEntry