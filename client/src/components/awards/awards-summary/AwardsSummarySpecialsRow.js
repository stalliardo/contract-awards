import React from 'react';
import { getMonthsInFinancialOrder } from '../../../utils/DateUtils';
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from '../../../utils/financialTotals';
import { COLOURS } from '../../../utils/constants';

const monthsInFinancialOrder = getMonthsInFinancialOrder();

const AwardsSummarySpecialsRow = ({ coreTotals, targetsData, cumalitiveTotal, locationRef, filteredTotals }) => {
    const formattedTargetValue = () => {
        const validTarget = targetsData.find((t) => t.location === locationRef);

        if (validTarget) {
            return validTarget.targetValue;
        }

        return 0;
    }

    const targetAchievedPrecentage = generateTargetAcheivedPercentage(formattedTargetValue() * 12, cumalitiveTotal);
    const colour = targetAchievedPrecentage >= 100 ? COLOURS.GREEN : COLOURS.RED;

    return (
        <tr>
            <td>{locationRef}</td>
            {
                monthsInFinancialOrder.map((month, index) => {
                    const total = filteredTotals.find((total) => total.month === month).sum;
                    const target = parseInt(formattedTargetValue());
                    const colour =  total >= target ? COLOURS.GREEN : COLOURS.RED;

                    return <td style={{color: colour}} key={index}>£{total.toLocaleString()}</td>
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
            <td style={{color: colour}}>{targetAchievedPrecentage}%</td>
        </tr>
    )
}

export default AwardsSummarySpecialsRow;

