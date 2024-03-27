import React from 'react'
import { getMonthsInFinancialOrder } from '../../../utils/DateUtils'

const monthsInFinancialOrder = getMonthsInFinancialOrder();

const AwardsSummaryTableRow = ({coreTotals, locationRef}) => {

    const filteredTotals = coreTotals.filter((totals) => totals.location === locationRef);
    // The above works well but need to make sure the months are ALWAYS in the financial year order


    // ONLY display / process the totals when the coreTotals.fulfilled flag is set

    console.log('coreTotals abibr filter = ', coreTotals);
    console.log('filteredTotals = ', filteredTotals);


    return (
        <tr>
            <td>{locationRef}</td>

            {
                monthsInFinancialOrder.map((month) => {
                    return <td>£{filteredTotals.find((total) => total.month ===  month).sum}</td>
                })
            }


            {/* Total */}
            <td>£29,011</td>

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

export default AwardsSummaryTableRow