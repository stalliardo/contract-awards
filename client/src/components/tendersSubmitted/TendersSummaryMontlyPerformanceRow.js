import React from 'react'
import { COLOURS } from '../../utils/constants';

const TendersSummaryMontlyPerformanceRow = ({monthlyCoreTotals, monthlyTargetTotal}) => {
    return monthlyCoreTotals.map((total, i) => {
        const result = total.sum - monthlyTargetTotal;
        const colour = result > 0 ? COLOURS.GREEN : COLOURS.RED;
    
        return <td style={{color: colour}} key={i}>£{result.toLocaleString()}</td>
      })
}

export default TendersSummaryMontlyPerformanceRow