import React, { useState } from 'react';

const TendersSubmittedRow = ({ items }) => {
    const onItemClicked = (item) => {
        // Bubble up and display the modal
        console.log('item = ', item);
    }

    return (
        <tr>
            {
                items.map((item, index) => {
                    return  <td key={index} onClick={() => onItemClicked(item)}>{item.value}</td>
                })
            }
        </tr>
    )
}

export default TendersSubmittedRow