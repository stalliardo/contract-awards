import React, { useEffect, useState } from 'react'


const AwardsSummaryTotalsRow = ({ukCoreTotals, specialCoreTotals, cumalativeTotals, ukAndSpecialTargetTotal}) => {
  
  const monthlyTotals = []


  console.log('ukcore tots = ', ukCoreTotals);
  console.log('specialCoreTotals tots = ', specialCoreTotals);
  console.log('cumalativeTotals tots = ', cumalativeTotals);
  console.log('ukTargetTotal = ', ukAndSpecialTargetTotal);

  // const [monthlyTotals, setMonthlyTotals] = useState([]);


  // useEffect(() => {
    console.log('Generating totals cells.....');
    ukCoreTotals.forEach((total, i) => {
     const monthlyTotalsSum = (total.ukCoreTotal + specialCoreTotals[i].specialsTotal);
      monthlyTotals.push({column: total.month, sum: monthlyTotalsSum})
    })

    // add the cumalative totals to the array...
    monthlyTotals.push({column: "cumalitive", sum: cumalativeTotals})
    monthlyTotals.push({column: "monthlyTargetTotal", sum: ukAndSpecialTargetTotal})

    



    console.log('mothy totals sum = ', monthlyTotals);


  // }, [])


  return monthlyTotals.map((data, index) => {
    console.log('Called??????????????');
    return <td key={index}>£{data.sum.toLocaleString()}</td>
})
}

export default AwardsSummaryTotalsRow;

const data2 = [
  {
    column: "Oct",
    total: 2000
  },
  {
    column: "cumalitive",
    total: 200000
  },
  {
    column: "monthlyTarget",
    total: 100000
  },
  {
    column: "yearlyTarget",
    total: 200000 
  },
  {
    column: "To Date",
    total: 20000
  },
  {
    column: "Target achieved",
    total: 20000
  }
]

// for bottom row totals:

//    if columns = months {
//      // need the uk core totals = awardsData.ukCoreTotals
//     // special project totals = awardsData.specialCoreTotals
//    }


    
    // cumalitiveTotals = cumalitiveTotalsSum

    // 17 columns / items

    // const data = [
    //     {
    //         column: "Oct",
    //         TotalSum: 20000
    //     },
    //     {
    //         column: "Cumalitive",
    //         TotalSum: 1000000
    //     },
    //     ...,

    // ]