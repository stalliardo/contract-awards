import React from 'react';
import { COLOURS } from '../../utils/constants';

const generateTotals = (monthlyCoreTotals, monthlyTargetTotal) => {
    const totals = []

    for(let i = 0; i < monthlyCoreTotals.length; i++) {
      if(i === 0) {
        const result = monthlyCoreTotals[i].sum - monthlyTargetTotal;

        totals.push({column: monthlyCoreTotals[i].column, sum: result})
      } else {

        let sumCounter = 0;

        for(let x = 0; x <= i; x++) {
          sumCounter += monthlyCoreTotals[i - x].sum;
        }

        const result = sumCounter - monthlyTargetTotal * (i + 1);

        totals.push({column: monthlyCoreTotals[i].column, sum: result})
        sumCounter = 0;
      }
    }

    return totals;
  }

const TenderSummaryCumalitivePerformanceRow = ({monthlyCoreTotals, monthlyTargetTotal}) => {
    const totals = generateTotals(monthlyCoreTotals, monthlyTargetTotal);

    return totals.map((total, i) => {
      return <td key={i} style={{color: parseInt(total.sum) >= 0 ? COLOURS.GREEN : COLOURS.RED}}>
        £{(total.sum).toLocaleString()}
        </td>
    })
}

export default TenderSummaryCumalitivePerformanceRow;

