import React from 'react'

const TargtesTableRow = ({data}) => {
  return (
    <tr id='admin-targets-tr'>
        <td>{data.name}</td>
        <td>£10000</td>
        <td>
            <button>Edit</button>
        </td>
    </tr>
  )
}

export default TargtesTableRow