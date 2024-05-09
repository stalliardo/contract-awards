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
import { COLOURS, ROLES } from '../../../utils/constants';
import AwardsSummaryCumalitivePerformanceRow from './AwardsSummaryCumalitivePerformanceRow';
import { generateFinancialYearMonths } from '../../../utils/DateUtils';
import { useNavigate } from 'react-router-dom';
import { addSlashToYearString, removeSlashFromyearString } from '../../../utils/stringUtils';

const AwardsSummary = () => {
    const dispatch = useDispatch();
    let cumalitiveTotalsSum = 0;
    const authenticatedUser = useSelector(state => state.users.authenticatedUser);
    const selectedFinancialYear = useSelector(state => state.users.selectedFinancialYear);
    const awardsData = useSelector((state) => state.awards);
    const isLoading = useSelector((state) => state.awards.loading);
    const [locations, setLocations] = useState(authenticatedUser.locations ? [...authenticatedUser.locations].sort() : []);
    const originalLocations = useSelector((state) => state.location.data);
    const specialLocations = useSelector((state) => state.awards.specialLocations);
    const navigate = useNavigate();

    const [spinnerComplete, setSpinnerComplete] = useState(false);
    const showUI = !isLoading && spinnerComplete;

    const MonthsForTableHead = ({k}) => {
        const months = generateFinancialYearMonths(addSlashToYearString(selectedFinancialYear));
        
        const cells = months.map((month, i) => {
            return <th key={`${k} ${i}`}>{month}</th>
        })
        
        return cells
    }

    useEffect(() => {

        if(!authenticatedUser._id) {
            navigate("/");
        } else {
            if (awardsData.coreTotals.length > 0) {
                setTimeout(() => {
                    setSpinnerComplete(true); // to fix the flash, added a delay
                }, 500);
            } else {
               if(authenticatedUser){
                dispatch(fetchData({locationData: originalLocations, authenticatedUser, selectedFinancialYear: removeSlashFromyearString(selectedFinancialYear)})).finally(() => {
                    setTimeout(() => {
                        setSpinnerComplete(true);
                    }, 500);
                })
               }
            }
        }
    }, []);

    useEffect(() => {
        console.log('locations = ', locations);
    }, [selectedFinancialYear])

    const generateFilteredTotals = (location) => {
        const totals = awardsData.coreTotals.filter((totals) => totals.location === location)
        if(totals.length === 0) {
            console.log('zero detected');
            return null;
        }

        return totals;
    }

    const generateCumalitiveTotals = (location) => {
        const filteredTotals = generateFilteredTotals(location);

        if(filteredTotals === null) {
            return null;
        }

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
                    <h3>Contract Awards Summary</h3>
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
                                locations.map((location, index) => {
                                    if (location !== "M&E" && location !== "Special Projects" && generateFilteredTotals(location)) {
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
                                locations.map((location, index) => {
                                   if( location === "Special Projects" || location === "M&E") {
                                    return <AwardsSummarySpecialsRow targetsData={awardsData.targets} filteredTotals={generateFilteredTotals(location)} cumalitiveTotal={generateCumalitiveTotals(location)} locationRef={location} key={index} />
                                   }
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
                    <p>T A = Percentage of Target Achieved</p>
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
                    </>
                }
               
            </div>
    )
}
export default AwardsSummary;