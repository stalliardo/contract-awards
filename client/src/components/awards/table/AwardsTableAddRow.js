import React from 'react'

const AwardsTableAddRow = () => {

const handleChange = () => {

}

const setShowAddRow = () => {
    
}

    return (
        <tr className='conditional-row'>
            <td>
                <input type='text' name='contractNumber' placeholder='Contract No' onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='project' placeholder='Project' onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='contractNumber' placeholder='Programme' onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='contractNumber' placeholder='Contractor' onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='contractNumber' placeholder='Region' onChange={handleChange} />
            </td>
            <td>
                <input type='text' name='contractNumber' placeholder='Core' onChange={handleChange} />
            </td>
            <td className='table-actions-cell' onClick={() => setShowAddRow(false)}>
                <button className='table-actions-cell edit'>Cancel</button>
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell edit'>Save</button>
            </td>

        </tr>
    )
}

export default AwardsTableAddRow