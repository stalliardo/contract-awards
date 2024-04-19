import React, { useState } from 'react';
import { getMonthsInFinancialOrder } from '../../utils/DateUtils';
import TendersSubmittedCell from './TendersSubmittedCell';

const monthsInFinancialOrder = getMonthsInFinancialOrder();

const TendersSubmittedRow = ({ data }) => {
    
    const cumalitiveTotals = () => {
        const sum = data.items.reduce((total, target) => total + target.value, 0);

        return sum;
    }

    return (
        <tr>
            <td>{data.location}</td>
            {
                data.items.map((item, i) => {
                    return (
                       <TendersSubmittedCell key={i} item={{...item, location: data.location, _id: data._id}}/>
                    )
                })
            }
            <td>£{cumalitiveTotals().toLocaleString()}</td>
        </tr>
    )
}

export default TendersSubmittedRow;