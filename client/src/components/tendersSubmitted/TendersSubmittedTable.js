import React, { useEffect, useState, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import './tenders-submitted.css';

import { generateFinancialYearMonths } from '../../utils/DateUtils';
import TendersSubmittedRow from './TendersSubmittedRow';

import TendersSubmittedUkCoreTotalsRow from './TendersSubmittedUkCoreTotalsRow';
import TendersSpecialsRow from './TendersSpecialsRow';
import TendersSummaryTotalsRow from './TendersSummaryTotalsRow';
import TendersSummaryMontlyPerformanceRow from './TendersSummaryMontlyPerformanceRow';
import TenderSummaryCumalitivePerformanceRow from './TenderSummaryCumalitivePerformanceRow';
import { ROLES, sortLocations, sortLocationsObject } from '../../utils/constants';
import { addSlashToYearString } from '../../utils/stringUtils';
import { clearExportData, generateExportData } from '../../redux/features/tenders/tenderSlice';
import { generateCSVForTenders } from '../../utils/CSVExport';

const TendersSubmittedTable = ({ data }) => {
    const originalLocations = useSelector(state => state.location.data);
    const authenticatedUser = useSelector(state => state.users.authenticatedUser);
    // const [locations, setLocations] = useState([...authenticatedUser.locations].sort());

    const [locations, setLocations] = useState([...authenticatedUser.locations]);
    const sortedLocations = useMemo(() => sortLocations(locations), [locations]);

    const selectedFinancialYear = useSelector(state => state.users.selectedFinancialYear);

    const tenders = useSelector(state => state.tender);
    const awards = useSelector(state => state.awards);

    const dispatch = useDispatch();

    const extractedDataForRow = (location) => {
        return data.find((item) => item.location === location);
    }

    const MonthsForTableHead = ({ k }) => {
        const months = generateFinancialYearMonths(addSlashToYearString(selectedFinancialYear));

        const cells = months.map((month, i) => {
            return <th key={`${k} ${i}`}>{month}</th>
        })

        return cells
    }

    const onExportCSV = () => {
        dispatch(generateExportData({locations: sortLocationsObject(originalLocations), targets: awards.tendersSubmittedTargets}));
    }

    useEffect(() => {
        if (tenders.exportData) {
            const confirmation = window.confirm("Are you sure you want to export CSV data for the tenders summary?");
            if (confirmation) {
                generateCSVForTenders(tenders.exportData, selectedFinancialYear);
            }
            dispatch(clearExportData());
        }
    }, [tenders.exportData])

    return (
        <div className='awards-page-container'>
            <div className='awards-page-table-container'>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <h3>Tenders Submitted Summary</h3>
                    {
                        authenticatedUser.role === ROLES.CA01 &&
                        <button onClick={onExportCSV}>Export CSV</button>
                    }
                </div>
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
                            sortedLocations.map((location, index) => {
                                if (location !== "M&E" && location !== "Europe" && extractedDataForRow(location)) {
                                    // return <AwardsSummaryCoreTotalsRow targetsData={awardsData.targets} filteredTotals={generateFilteredTotals(location)} cumalitiveTotal={generateCumalitiveTotals(location)} locationRef={location} key={index} />
                                    return <TendersSubmittedRow key={index} data={extractedDataForRow(location)} />
                                }
                                return null;
                            })
                        }
                        <TendersSubmittedUkCoreTotalsRow />

                        {
                            sortedLocations.map((location, index) => {
                                if (location === "M&E" || location === "Europe") {
                                    return <TendersSpecialsRow key={index} data={extractedDataForRow(location)} />
                                }
                                return null;
                            })
                        }

                        <tr className='bold-cells' style={{borderTop: "2px solid black"}}>
                            <td>Total</td>
                            <TendersSummaryTotalsRow
                                ukCoreTotals={tenders.ukCoreTotals.uk}
                                specialCoreTotals={tenders.ukCoreTotals.specials}
                                cumalativeTotals={parseInt(tenders.ukCumalitiveTotal) + parseInt(tenders.specialCumalitiveTotals)}
                            // ukAndSpecialTargetTotal={awardsData.ukAndSpecialTargetTotal}
                            />
                        </tr>

                        {
                                authenticatedUser.role === ROLES.CA01 &&
                                <>
                                    <tr style={{background: "white", color: "black", border: "none"}}><td style={{border: "none"}}><h3 style={{margin: "10px 0px 0px -10px"}}>Company Performance</h3></td></tr>
                                    <tr></tr>
                                    

                                    <tr>
                                    <TendersSummaryMontlyPerformanceRow
                                        monthlyCoreTotals={tenders.ukCoreTotals.all}
                                        monthlyTargetTotal={awards.tendersSubmittedTargets.reduce((prev, current) => parseInt(prev) + parseInt(current.targetValue), 0)}
                                    />
                                    </tr>


                                    <tr>
                                    <TenderSummaryCumalitivePerformanceRow
                                        monthlyCoreTotals={tenders.ukCoreTotals.all}
                                        monthlyTargetTotal={awards.tendersSubmittedTargets.reduce((prev, current) => parseInt(prev) + parseInt(current.targetValue), 0)}
                                    />
                                    </tr>
                                </>
                            }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TendersSubmittedTable;