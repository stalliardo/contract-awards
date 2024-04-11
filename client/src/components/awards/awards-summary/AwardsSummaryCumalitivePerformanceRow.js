import React from 'react'

import { COLOURS } from '../../../utils/constants';

const AwardsSummaryCumalitivePerformanceRow = ({monthlyCoreTotals, monthlyTargetTotal}) => {
  // return monthlyCoreTotals.map((total, i) => {

  //   console.log('totals = ', total);
  //   const result = total.sum - monthlyTargetTotal;
  //   const colour = result > 0 ? COLOURS.GREEN : COLOURS.RED;

  //   return <td style={{color: colour}} key={i}>£{result.toLocaleString()}</td>
  // })

  const totals = generateTotals(monthlyCoreTotals, monthlyTargetTotal);

  return totals.map((total) => {
    return <td>{(total.sum).toLocaleString()}</td>
  })
}

export default AwardsSummaryCumalitivePerformanceRow;


// formula = 
  // mothlyCoreTotal[0] = 1000;

  // loop 1 counter = 0
    // if counter > 0
  // monthlyTotal + monthlyTotal[couter - 1] =
  
  const generateTotals = (monthlyCoreTotals, monthlyTargetTotal) => {
    const totals = []


    for(let i = 0; i < monthlyCoreTotals.length; i++) {
      if(i === 0) {
        const result = monthlyCoreTotals[i].sum - monthlyTargetTotal;

        totals.push({column: monthlyCoreTotals[i].column, sum: result})
      } else {

        let sumCounter = 0;

        for(let x = 0; x <= i; x++) {
          // const sumOfPreviousMonths = (monthlyCoreTotals[x].sum + monthlyCoreTotals[i - x].sum);
          // console.log('i = ', i, " x = ", x, " i - x = ", i - x);
          sumCounter += monthlyCoreTotals[i - x].sum;
        }

        console.log('iteration:  ', i + 1, ". Sum counter = ", sumCounter);

        const result = (sumCounter - monthlyTargetTotal) * (i + 1);

        totals.push({column: monthlyCoreTotals[i].column, sum: result})
        sumCounter = 0;

      }

      

    }
    console.log('totals = ', totals);

    return totals;
  }


  // results should be need to * 2
    // -287,000
    // -564,000
    // -564,000
    // -1,126,000
