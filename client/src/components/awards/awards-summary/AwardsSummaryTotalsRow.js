import React from 'react'
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from '../../../utils/financialTotals';

const AwardsSummaryTotalsRow = ({ukCoreTotals, specialCoreTotals, cumalativeTotals, ukAndSpecialTargetTotal}) => {
  const monthlyTotals = []
    ukCoreTotals.forEach((total, i) => {
     const monthlyTotalsSum = (total.ukCoreTotal + specialCoreTotals[i].specialsTotal);
      monthlyTotals.push({column: total.month, sum: monthlyTotalsSum})
    })

    const yearlyTarget = ukAndSpecialTargetTotal * 12;
    
    monthlyTotals.push({column: "cumalitive", sum: cumalativeTotals})
    monthlyTotals.push({column: "monthlyTargetTotal", sum: ukAndSpecialTargetTotal})
    monthlyTotals.push({column: "annualTargetTotal", sum: yearlyTarget})
    monthlyTotals.push({column: "targetToDateTotal", sum: generateTargetAmountToDate(yearlyTarget)})
    monthlyTotals.push({column: "targetAchieved", sum: generateTargetAcheivedPercentage(yearlyTarget, cumalativeTotals)})

  return monthlyTotals.map((data, index) => {
    return <td key={index}>{data.column !== "targetAchieved" ? "£" : ""}{data.sum.toLocaleString()}{data.column === "targetAchieved" ? "%" : ""}</td>
})
}

export default AwardsSummaryTotalsRow;