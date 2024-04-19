import React from 'react';

import { useSelector } from 'react-redux';

import './tenders-submitted.css';

import { generateFinancialYearMonths } from '../../utils/DateUtils';
import TendersSubmittedRow from './TendersSubmittedRow';


import { getMonthsInFinancialOrder } from '../../utils/DateUtils';
import TendersSubmittedUkCoreTotalsRow from './TendersSubmittedUkCoreTotalsRow';
import TendersSpecialsRow from './TendersSpecialsRow';

const monthsInFinancialOrder = getMonthsInFinancialOrder();

const MonthsForTableHead = ({ k }) => {
    const months = generateFinancialYearMonths();

    const cells = months.map((month, i) => {
        return <th key={`${k} ${i}`}>{month}</th>
    })

    return cells
}

const TendersSubmittedTable = ({data}) => {

    const originalLocations = useSelector(state => state.location.data);

    const extractedDataForRow = (location) => {
        return data.find((item) => item.location === location);
    }

    return (
        <div className='awards-page-container'>
            <div className='awards-page-table-container'>
                <h3>Contract Awards Summary (TBC)</h3>
                <table id="awards-table" className='awards-summary-table'>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <MonthsForTableHead k="1" />
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
                            originalLocations.map((location, index) => {
                                if (location.name !== "M&E" && location.name !== "Special Projects") {
                                    // return <AwardsSummaryCoreTotalsRow targetsData={awardsData.targets} filteredTotals={generateFilteredTotals(location)} cumalitiveTotal={generateCumalitiveTotals(location)} locationRef={location} key={index} />
                                    return <TendersSubmittedRow key={index} data={extractedDataForRow(location.name)}/>
                                }
                                return null;
                            })
                        }
                        <TendersSubmittedUkCoreTotalsRow />

                        {
                            originalLocations.map((location, index) => {
                                if (location.name === "M&E" || location.name == "Special Projects") {
                                    return <TendersSpecialsRow key={index} data={extractedDataForRow(location.name)}/>
                                }
                                return null;
                            })
                        }
                       
                        <tr className='bold-cells'>
                           
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
