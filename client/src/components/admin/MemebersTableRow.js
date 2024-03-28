import React from 'react'

const MemebersTableRow = ({ data }) => {


    const onEditClicked = () => {

    }

    const onDeleteClicked = () => {

    }

    return (
        <tr>
            <td>{data.name}</td>
            <td>{data.role}</td>
            <td>{data.permissions}</td>
            <td>{data.locations}</td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell blue' onClick={onEditClicked}>Edit</button>
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell red' onClick={onDeleteClicked}>Delete</button>
            </td>
        </tr>
    )
}

export default MemebersTableRow