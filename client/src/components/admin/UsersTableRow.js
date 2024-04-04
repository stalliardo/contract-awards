import React from 'react'

const UsersTableRow = ({ data }) => {
    const onEditClicked = () => {

    }

    const onDeleteClicked = () => {

    }

    const formattedRole = (groupName) => {
        if(groupName === "CA01") return "Director";
        if(groupName === "CA02") return "Regional Director";
        if(groupName === "CA03") return "User";
    }

    return (
        <tr>
            <td>{data.name}</td>
            <td>{formattedRole(data.role)}</td>
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

export default UsersTableRow;

// need to check a users permissions to see what they can actually do on this page.  Or just not enable certain options for certain people

// will need a new members model, route, controller, endpoint