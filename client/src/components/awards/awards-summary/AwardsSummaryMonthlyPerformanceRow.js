import React from 'react'

import { COLOURS } from '../../../utils/constants';

const AwardsSummaryMonthlyPerformanceRow = ({monthlyCoreTotals, monthlyTargetTotal}) => {
  return monthlyCoreTotals.map((total, i) => {
    const result = total.sum - monthlyTargetTotal;
    const colour = result > 0 ? COLOURS.GREEN : COLOURS.RED;

    return <td style={{color: colour}} key={i}>£{result.toLocaleString()}</td>
  })
}

export default AwardsSummaryMonthlyPerformanceRow;