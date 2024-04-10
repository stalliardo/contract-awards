import React from 'react';
import { getMonthsInFinancialOrder } from '../../../utils/DateUtils';
import { generateTargetAcheivedPercentage } from '../../../utils/financialTotals';

const monthsInFinancialOrder = getMonthsInFinancialOrder();

const AwardsSummaryCoreTotalsRow = ({ coreTotals, targetsData, cumalitiveTotal, locationRef, filteredTotals }) => {
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
                    return <td key={index}>£{filteredTotals.find((total) => total.month === month).sum}</td>
                })
            }

            <td style={{width: "80px"}}>£{cumalitiveTotal}</td>

            {/* Month Target */}
            <td>
                £{formattedTargetValue()}
            </td>

            {/* Annual Target */}
            <td>
                £{formattedTargetValue() * 12}
            </td>

            {/* // TODO below value */}
            <td>{generateTargetAcheivedPercentage(formattedTargetValue() * 12, cumalitiveTotal)}%</td>
        </tr>
    )
}

export default AwardsSummaryCoreTotalsRow;

