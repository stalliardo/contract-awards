import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux/features/awards/awardsThunks';
import Spinner from '../../spinner/Spinner';
import AwardsSummaryCoreTotalsRow from './AwardsSummaryCoreTotalsRow';
import AwardsSummaryUKCoreTotalsRow from './AwardsSummaryUKCoreTotalsRow';
import AwardsSummarySpecialsRow from './AwardsSummarySpecialsRow';
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from '../../../utils/financialTotals';
import AwardsSummaryTotalsRow from './AwardsSummaryTotalsRow';
import AwardsSummaryMonthlyPerformanceRow from './AwardsSummaryMonthlyPerformanceRow';
import { COLOURS } from '../../../utils/constants';
import AwardsSummaryCumalitivePerformanceRow from './AwardsSummaryCumalitivePerformanceRow';
import { generateFinancialYearMonths } from '../../../utils/DateUtils';

let cumalitiveTotalsSum = 0;

const MonthsForTableHead = ({k}) => {
    const months = generateFinancialYearMonths();

    const cells = months.map((month, i) => {
        return <th key={`${k} ${i}`}>{month}</th>
    })

    return cells
}

const AwardsSummary = () => {
    const awardsData = useSelector((state) => state.awards);
    const isLoading = useSelector((state) => state.awards.loading);
    const locations = useSelector((state) => state.awards.locations);
    const specialLocations = useSelector((state) => state.awards.specialLocations);

    const dispatch = useDispatch();

    const [spinnerComplete, setSpinnerComplete] = useState(false);
    const showUI = !isLoading && spinnerComplete;

    useEffect(() => {
        if (awardsData.coreTotals.length > 0) {
            console.log('There is data in the store');
            console.log('And the data is: ', awardsData.coreTotals);
            setSpinnerComplete(true);
        } else {
            dispatch(fetchData()).finally(() => {
                setTimeout(() => {
                    setSpinnerComplete(true);
                }, 500);
            })
        }
    }, []);

    const generateFilteredTotals = (location) => {

        return awardsData.coreTotals.filter((totals) => totals.location === location)
    }

    const generateCumalitiveTotals = (location) => {
        const filteredTotals = generateFilteredTotals(location);
        const sum = filteredTotals.reduce((total, currentItem) => total + currentItem.sum, 0);

        cumalitiveTotalsSum += sum;
        return sum;
    }

    return (
        !showUI ?
            <div className='spinner-container-page'><Spinner classes="page" text="Generating Summary Table...." /></div>
            :
            <div className='awards-page-container'>
                <div className='awards-page-table-container'>
                    <h3>Contract Awards Summary (TBC)</h3>
                    <table id="awards-table" className='awards-summary-table'>
                        <thead>
                            <tr>
                                <th>Location</th>
                                {/* Years need to be dynamic */}
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
                                locations.map((location, index) => {
                                    if (location !== "M&E" && location !== "Special Projects") {
                                        return <AwardsSummaryCoreTotalsRow targetsData={awardsData.targets} filteredTotals={generateFilteredTotals(location)} cumalitiveTotal={generateCumalitiveTotals(location)} locationRef={location} key={index} />
                                    }
                                    return null;
                                })
                            }
                            <tr className='bold-cells'>
                                <td>UK Core Total</td>
                                {
                                    awardsData.ukCoreTotals.map((data, index) => {
                                        return <AwardsSummaryUKCoreTotalsRow data={data} key={index} ukTargetTotal={awardsData.ukTargetTotal} />
                                    })
                                }
                                <td>£{cumalitiveTotalsSum.toLocaleString()}</td>
                                <td>
                                    £{awardsData.ukTargetTotal.toLocaleString()}
                                </td>
                                <td>
                                    £{(awardsData.ukTargetTotal * 12).toLocaleString()}
                                </td>
                                <td>£{generateTargetAmountToDate((awardsData.ukTargetTotal * 12), cumalitiveTotalsSum).toLocaleString()}</td>
                                <td style={{ color: generateTargetAcheivedPercentage(awardsData.ukTargetTotal * 12, cumalitiveTotalsSum) >= 100 ? COLOURS.GREEN : COLOURS.RED }}>
                                    {generateTargetAcheivedPercentage(awardsData.ukTargetTotal * 12, cumalitiveTotalsSum)}%
                                </td>
                            </tr>
                            {
                                specialLocations.map((location, index) => {
                                    return <AwardsSummarySpecialsRow targetsData={awardsData.targets} filteredTotals={generateFilteredTotals(location)} cumalitiveTotal={generateCumalitiveTotals(location)} locationRef={location} key={index} />
                                })
                            }
                            <tr className='bold-cells'>
                                <td>Total</td>
                                <AwardsSummaryTotalsRow
                                    ukCoreTotals={awardsData.ukCoreTotals}
                                    specialCoreTotals={awardsData.specialCoreTotals}
                                    cumalativeTotals={cumalitiveTotalsSum}
                                    ukAndSpecialTargetTotal={awardsData.ukAndSpecialTargetTotal}
                                />
                            </tr>
                        </tbody>
                    </table>
                    <p>% T A = Percentage of Target Achieved (TBC)</p>
                </div>

                <div className='awards-page-table-container'>
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
                </div>
            </div>
    )
}
export default AwardsSummary;
// NTH's

// Can click a locations total value and be transistioned to the corresponing awards form