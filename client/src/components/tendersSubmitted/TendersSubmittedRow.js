import React, { useState } from 'react';
import { getMonthsInFinancialOrder } from '../../utils/DateUtils';
import TendersSubmittedCell from './TendersSubmittedCell';

const monthsInFinancialOrder = getMonthsInFinancialOrder();

const TendersSubmittedRow = ({ data }) => {
    
    // console.log('data from row = ', data);

    return (
        <tr>
            <td></td>
            {
                data.items.map((item, i) => {
                    return (
                       <TendersSubmittedCell key={i} item={{...item, location: data.location, _id: data._id}}/>
                    )
                })
            }
        </tr>
    )
}

export default TendersSubmittedRow;