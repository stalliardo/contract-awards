import React from 'react'
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from '../../../utils/financialTotals';
import { COLOURS } from '../../../utils/constants';

const AwardsSummaryTotalsRow = ({ukCoreTotals, specialCoreTotals, cumalativeTotals, ukAndSpecialTargetTotal}) => {
    const monthlyTotals = []
    ukCoreTotals.forEach((total, i) => {
     const monthlyTotalsSum = (total.ukCoreTotal + specialCoreTotals[i].specialsTotal);
     const colour = monthlyTotalsSum >= ukAndSpecialTargetTotal ? COLOURS.GREEN : COLOURS.RED;

      monthlyTotals.push({column: total.month, sum: monthlyTotalsSum, colour})
    })

    const yearlyTarget = ukAndSpecialTargetTotal * 12;
    const targetAchieved = generateTargetAcheivedPercentage(yearlyTarget, cumalativeTotals);
    const targetAchievedColour = targetAchieved >= 100 ? COLOURS.GREEN : COLOURS.RED;
    
    monthlyTotals.push({column: "cumalitive", sum: cumalativeTotals})
    monthlyTotals.push({column: "monthlyTargetTotal", sum: ukAndSpecialTargetTotal})
    monthlyTotals.push({column: "annualTargetTotal", sum: yearlyTarget})
    monthlyTotals.push({column: "targetToDateTotal", sum: generateTargetAmountToDate(yearlyTarget)})
    monthlyTotals.push({column: "targetAchieved", sum: targetAchieved})

    return monthlyTotals.map((data, index) => {
      const colour = data.column === "targetAchieved" ? targetAchievedColour : data.colour;

      return <td key={index} style={{color: colour}}>
          {data.column !== "targetAchieved" ? "£" : ""}{data.sum.toLocaleString()}{data.column === "targetAchieved" ? "%" : ""}
        </td>
    })
}

export default AwardsSummaryTotalsRow;