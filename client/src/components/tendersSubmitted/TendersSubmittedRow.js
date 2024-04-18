import React, { useState } from 'react';
import { getMonthsInFinancialOrder } from '../../utils/DateUtils';

const monthsInFinancialOrder = getMonthsInFinancialOrder();

const TendersSubmittedRow = ({ data }) => {
    const onItemClicked = (item) => {
        // Bubble up and display the modal
        console.log('item = ', item);
    }

    return (
        <tr>
            <td></td>
            {
                data.items.map((item, i) => {
                    return <td key={i}>{item.value}</td>
                })
            }
        </tr>
    )
}

export default TendersSubmittedRow;