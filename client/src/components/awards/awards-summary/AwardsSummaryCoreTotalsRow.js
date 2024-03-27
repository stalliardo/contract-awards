import React from 'react'
import { getMonthsInFinancialOrder } from '../../../utils/DateUtils'

const monthsInFinancialOrder = getMonthsInFinancialOrder();

const AwardsSummaryCoreTotalsRow = ({coreTotals, locationRef}) => {
    const filteredTotals = coreTotals.filter((totals) => totals.location === locationRef);
    const cumalitiveTotal = filteredTotals.reduce((total, currentItem) => total + currentItem.sum, 0);

    return (
        <tr>
            <td>{locationRef}</td>
            {
                monthsInFinancialOrder.map((month, index) => {
                    return <td key={index}>£{filteredTotals.find((total) => total.month ===  month).sum}</td>
                })
            }

            {/* Total */}
            <td>£{cumalitiveTotal}</td>

            {/* Month Target */}
            <td>
                £100,000
            </td>

            {/* Annual Target */}
            <td>
                £1,200,000
            </td>
            <td>121%</td>
        </tr>
    )
}

export default AwardsSummaryCoreTotalsRow;

