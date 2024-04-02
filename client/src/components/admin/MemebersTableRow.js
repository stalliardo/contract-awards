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
                <button className='table-actions-cell' onClick={onEditClicked}>Edit</button>
            </td>
            <td className='table-actions-cell'>
                <button className='table-actions-cell red' onClick={onDeleteClicked}>Delete</button>
            </td>
        </tr>
    )
}

export default MemebersTableRow;

// need to check a users permissions to see what they can actually do on this page.  Or just not enable certain options for certain people

// will need a new members model, route, controller, endpoint