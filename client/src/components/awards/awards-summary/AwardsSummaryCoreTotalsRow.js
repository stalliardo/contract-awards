import React from 'react';
import { getMonthsInFinancialOrder } from '../../../utils/DateUtils';
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from '../../../utils/financialTotals';

const monthsInFinancialOrder = getMonthsInFinancialOrder();

const AwardsSummaryCoreTotalsRow = ({ targetsData, cumalitiveTotal, locationRef, filteredTotals }) => {

    const formattedTargetValue = () => {
        const validTarget = targetsData.find((t) => t.location === locationRef);

        if (validTarget) {
            return validTarget.targetValue;
        }

        return 0;
    }

    return (
        <tr>
            <td>{locationRef}</td>
            {
                monthsInFinancialOrder.map((month, index) => {
                    return <td key={index}>£{filteredTotals.find((total) => total.month === month).sum.toLocaleString()}</td>
                })
            }

            <td style={{width: "80px"}}>£{cumalitiveTotal.toLocaleString()}</td>

            {/* Month Target */}
            <td>
                £{parseInt(formattedTargetValue()).toLocaleString()}
            </td>

            {/* Annual Target */}
            <td>
                £{(formattedTargetValue() * 12).toLocaleString()}
            </td>
            {/* New Target amount to date column */}
            <td>£{generateTargetAmountToDate(formattedTargetValue() * 12, cumalitiveTotal).toLocaleString()}</td>

            {/* // TODO below value */}
            <td>{generateTargetAcheivedPercentage(formattedTargetValue() * 12, cumalitiveTotal)}%</td>
        </tr>
    )
}

export default AwardsSummaryCoreTotalsRow;