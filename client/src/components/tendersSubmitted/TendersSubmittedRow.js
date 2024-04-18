import React, { useState } from 'react';
import { getMonthsInFinancialOrder } from '../../utils/DateUtils';
import TendersSubmittedCell from './TendersSubmittedCell';

const monthsInFinancialOrder = getMonthsInFinancialOrder();

const TendersSubmittedRow = ({ data }) => {
    

    return (
        <tr>
            <td></td>
            {
                data.items.map((item, i) => {
                    return (
                       <TendersSubmittedCell key={i} item={item}/>
                    )
                })
            }
        </tr>
    )
}

export default TendersSubmittedRow;