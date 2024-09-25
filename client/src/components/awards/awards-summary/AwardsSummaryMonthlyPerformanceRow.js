import React from 'react'

import { COLOURS } from '../../../utils/constants';

const AwardsSummaryMonthlyPerformanceRow = ({monthlyCoreTotals, monthlyTargetTotal}) => {

  const oprignalArray = [...monthlyCoreTotals];
  
  // Place a cell with the value Month at the start of the array
  oprignalArray.unshift("Month");

  return oprignalArray.map((total, i) => {
    const result = total.sum - monthlyTargetTotal;
    const colour = result > 0 ? COLOURS.GREEN : COLOURS.RED;

    if(total !== "Month") {
      return <td style={{color: colour}} key={i}>£{result.toLocaleString()}</td>
    } else {
      return <td key={i}>{total}</td>
    }
  })
}

export default AwardsSummaryMonthlyPerformanceRow;