import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import './tenders-submitted.css';

import { generateFinancialYearMonths } from '../../utils/DateUtils';
import TendersSubmittedRow from './TendersSubmittedRow';

import TendersSubmittedUkCoreTotalsRow from './TendersSubmittedUkCoreTotalsRow';
import TendersSpecialsRow from './TendersSpecialsRow';
import TendersSummaryTotalsRow from './TendersSummaryTotalsRow';
import TendersSummaryMontlyPerformanceRow from './TendersSummaryMontlyPerformanceRow';
import TenderSummaryCumalitivePerformanceRow from './TenderSummaryCumalitivePerformanceRow';
import { ROLES } from '../../utils/constants';
import { addSlashToYearString } from '../../utils/stringUtils';

const TendersSubmittedTable = ({ data }) => {
    const originalLocations = useSelector(state => state.location.data);
    const authenticatedUser = useSelector(state => state.users.authenticatedUser);
    const [locations, setLocations] = useState([...authenticatedUser.locations].sort());
    const selectedFinancialYear = useSelector(state => state.users.selectedFinancialYear);

    const tenders = useSelector(state => state.tender);
    const awards = useSelector(state => state.awards);

    const extractedDataForRow = (location) => {
        return data.find((item) => item.location === location);
    }

    const MonthsForTableHead = ({k}) => {
        const months = generateFinancialYearMonths(addSlashToYearString(selectedFinancialYear));
        
        const cells = months.map((month, i) => {
            return <th key={`${k} ${i}`}>{month}</th>
        })
        
        return cells
    }

    return (
        <div className='awards-page-container'>
            <div className='awards-page-table-container'>
                <h3>Tenders Submitted Summary</h3>
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
                            locations.map((location, index) => {
                                if (location !== "M&E" && location !== "Special Projects" && extractedDataForRow(location)) {
                                    // return <AwardsSummaryCoreTotalsRow targetsData={awardsData.targets} filteredTotals={generateFilteredTotals(location)} cumalitiveTotal={generateCumalitiveTotals(location)} locationRef={location} key={index} />
                                    return <TendersSubmittedRow key={index} data={extractedDataForRow(location)} />
                                }
                                return null;
                            })
                        }
                        <TendersSubmittedUkCoreTotalsRow />

                        {
                            locations.map((location, index) => {
                                if (location === "M&E" || location === "Special Projects") {
                                    return <TendersSpecialsRow key={index} data={extractedDataForRow(location)} />
                                }
                                return null;
                            })
                        }

                        <tr className='bold-cells'>
                            <td>Total</td>
                            <TendersSummaryTotalsRow
                                ukCoreTotals={tenders.ukCoreTotals.uk}
                                specialCoreTotals={tenders.ukCoreTotals.specials}
                                cumalativeTotals={parseInt(tenders.ukCumalitiveTotal) + parseInt(tenders.specialCumalitiveTotals)}
                            // ukAndSpecialTargetTotal={awardsData.ukAndSpecialTargetTotal}
                            />
                        </tr>
                    </tbody>
                </table>
                <p>% T A = Percentage of Target Achieved (TBC)</p>
            </div>

            {
                authenticatedUser.role === ROLES.CA01 &&
                <>
                    <div className='awards-page-table-container'>
                        <h3>Company Performance</h3>
                        <table id="awards-table">
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <MonthsForTableHead k="2" />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Plus/Minus</td>
                                    <TendersSummaryMontlyPerformanceRow
                                        monthlyCoreTotals={tenders.ukCoreTotals.all}
                                        monthlyTargetTotal={awards.tendersSubmittedTargets.reduce((prev, current) => parseInt(prev) + parseInt(current.targetValue), 0)}
                                    />
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='awards-page-table-container'>
                        <table id="awards-table">
                            <thead>
                                <tr>
                                    <th>Cumalitive</th>
                                    <MonthsForTableHead k="3" />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Plus/Minus</td>
                                    <TenderSummaryCumalitivePerformanceRow
                                        monthlyCoreTotals={tenders.ukCoreTotals.all}
                                        monthlyTargetTotal={awards.tendersSubmittedTargets.reduce((prev, current) => parseInt(prev) + parseInt(current.targetValue), 0)}
                                    />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </div>
    )
}

export default TendersSubmittedTable;