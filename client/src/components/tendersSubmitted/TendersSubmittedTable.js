import React from 'react'
import './tenders-submitted.css';

import { generateFinancialYearMonths } from '../../utils/DateUtils';
import TendersSubmittedRow from './TendersSubmittedRow';

const MonthsForTableHead = ({k}) => {
  const months = generateFinancialYearMonths();
  
  const cells = months.map((month, i) => {
      return <th key={`${k} ${i}`}>{month}</th>
  })
  
  return cells
}

const TendersSubmittedTable = () => {
  return (
    <div className='awards-page-container'>
                <div className='awards-page-table-container'>
                    <h3>Contract Awards Summary (TBC)</h3>
                    <table id="awards-table" className='awards-summary-table'>
                        <thead>
                            <tr>
                                <th>Location</th>
                                <MonthsForTableHead k="1"/>
                                <th>Cumalitive Totals</th>
                                <th colSpan="3">
                                    <div className='cumulative-totals-container'>
                                        <div>
                                            <h3>Targets</h3>
                                        </div>
                                        <div className='cumulative-totals-m-a'>
                                            <div>
                                                Month
                                            </div>
                                            <div>
                                                Annual
                                            </div>
                                            <div>
                                                To Date
                                            </div>
                                        </div>
                                    </div>
                                </th>
                                <th>% T A</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                exampleDataResponse.map((item, index) => {
                                    if (item.location !== "M&E" && item.location !== "Special Projects") {
                                        // return <AwardsSummaryCoreTotalsRow targetsData={awardsData.targets} filteredTotals={generateFilteredTotals(location)} cumalitiveTotal={generateCumalitiveTotals(location)} locationRef={location} key={index} />
                                        return <TendersSubmittedRow key={index} items={item.items}/>
                                    }
                                    return null;
                                })
                            }
                            <tr className='bold-cells'>
                                {/* <td>UK Core Total</td> */}
                                {/* {
                                    awardsData.ukCoreTotals.map((data, index) => {
                                        return <AwardsSummaryUKCoreTotalsRow data={data} key={index} ukTargetTotal={awardsData.ukTargetTotal} />
                                    })
                                } */}
                                {/* <td>£{cumalitiveTotalsSum.toLocaleString()}</td> */}
                                {/* <td>
                                    £{awardsData.ukTargetTotal.toLocaleString()}
                                </td>
                                <td>
                                    £{(awardsData.ukTargetTotal * 12).toLocaleString()}
                                </td> */}
                                {/* <td>£{generateTargetAmountToDate((awardsData.ukTargetTotal * 12), cumalitiveTotalsSum).toLocaleString()}</td> */}
                                {/* <td style={{ color: generateTargetAcheivedPercentage(awardsData.ukTargetTotal * 12, cumalitiveTotalsSum) >= 100 ? COLOURS.GREEN : COLOURS.RED }}>
                                    {generateTargetAcheivedPercentage(awardsData.ukTargetTotal * 12, cumalitiveTotalsSum)}%
                                </td> */}
                            </tr>
                            {/* {
                                specialLocations.map((location, index) => {
                                    return <AwardsSummarySpecialsRow targetsData={awardsData.targets} filteredTotals={generateFilteredTotals(location)} cumalitiveTotal={generateCumalitiveTotals(location)} locationRef={location} key={index} />
                                })
                            } */}
                            <tr className='bold-cells'>
                                {/* <td>Total</td> */}
                                {/* <AwardsSummaryTotalsRow
                                    ukCoreTotals={awardsData.ukCoreTotals}
                                    specialCoreTotals={awardsData.specialCoreTotals}
                                    cumalativeTotals={cumalitiveTotalsSum}
                                    ukAndSpecialTargetTotal={awardsData.ukAndSpecialTargetTotal}
                                /> */}
                            </tr>
                        </tbody>
                    </table>
                    <p>% T A = Percentage of Target Achieved (TBC)</p>
                </div>

                {/* <div className='awards-page-table-container'>
                    <h3>Company Performance</h3>
                    <table id="awards-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <MonthsForTableHead k="2"/>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Plus/Minus</td>
                                <AwardsSummaryMonthlyPerformanceRow monthlyCoreTotals={awardsData.ukAndSpecialCoreTotals} monthlyTargetTotal={awardsData.ukAndSpecialTargetTotal} />
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='awards-page-table-container'>
                    <table id="awards-table">
                        <thead>
                            <tr>
                                <th>Cumalitive</th>
                                <MonthsForTableHead k="3"/>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Plus/Minus</td>
                                <AwardsSummaryCumalitivePerformanceRow monthlyCoreTotals={awardsData.ukAndSpecialCoreTotals} monthlyTargetTotal={awardsData.ukAndSpecialTargetTotal} />
                            </tr>
                        </tbody>
                    </table>
                </div> */}
            </div>
  )
}

export default TendersSubmittedTable;


// 1 - location and month cells are all inputs


// Data:
    const exampleDataResponse = [
        {
            location: "Avonmouth",
            items: [
                { month: "January", value: 1000 },
                { month: "February", value: 500 },
                { month: "March", value: 300 }
            ]
        },
        {
            location: "Basingstoke",
            items: [
                { month: "January", value: 1000 },
                { month: "February", value: 500 },
                { month: "March", value: 300 }
            ]
        },
        
    ]