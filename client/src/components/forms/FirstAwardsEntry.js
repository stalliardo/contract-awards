import React from 'react'
import './forms.css';

const FirstAwardsEntry = () => {

    const handleChange = (e) => {

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
                <button className='blue'>Save</button>
            </div>
        </div>
    )
}

export default FirstAwardsEntry