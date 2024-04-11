import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux/features/awards/awardsThunks';
import Spinner from '../../spinner/Spinner';
import AwardsSummaryCoreTotalsRow from './AwardsSummaryCoreTotalsRow';
import AwardsSummaryUKCoreTotalsRow from './AwardsSummaryUKCoreTotalsRow';
import AwardsSummarySpecialsRow from './AwardsSummarySpecialsRow';
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from '../../../utils/financialTotals';
import AwardsSummaryTotalsRow from './AwardsSummaryTotalsRow';

let cumalitiveTotalsSum = 0;

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
            setSpinnerComplete(true);
        } else {
            dispatch(fetchData()).finally(() => {
                setTimeout(() => {
                    setSpinnerComplete(true);
                }, 500);
            })
        }
    }, []);

    useEffect(() => {
        if (!awardsData.loading) {
            // const filteredTotals = coreTotals.filter((totals) => totals.location === locationRef);
            // const cumalitiveTotal = filteredTotals.reduce((total, currentItem) => total + currentItem.sum, 0);
        }
    }, [awardsData.loading])

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
                                <th>Oct-23</th>
                                <th>Nov-23</th>
                                <th>Dec-23</th>
                                <th>Jan-24</th>
                                <th>Feb-24</th>
                                <th>Mar-24</th>
                                <th>Apr-24</th>
                                <th>May-24</th>
                                <th>Jun-24</th>
                                <th>Jul-24</th>
                                <th>Aug-24</th>
                                <th>Sep-24</th>
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
                            {/* Totals below here core total is exactly that - need a function to loop each branch and each month and get a sum for each of the months */}
                            <tr className='bold-cells'>
                                <td>UK Core Total</td>
                                {
                                    awardsData.ukCoreTotals.map((data, index) => {
                                        return <AwardsSummaryUKCoreTotalsRow data={data} key={index} />
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
                                <td>{generateTargetAcheivedPercentage(awardsData.ukTargetTotal * 12, cumalitiveTotalsSum)}%</td>
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










                {/* Temporay tables for demo purposes only TO BE REMOVED */}
                <div className='awards-page-table-container'>
                    <h3>Company Performance</h3>
                    <table id="awards-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Oct-23</th>
                                <th>Nov-23</th>
                                <th>Dec-23</th>
                                <th>Jan-24</th>
                                <th>Feb-24</th>
                                <th>Mar-24</th>
                                <th>Apr-24</th>
                                <th>May-24</th>
                                <th>Jun-24</th>
                                <th>Jul-24</th>
                                <th>Aug-24</th>
                                <th>Sep-24</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Plus/Minus</td>
                                <td>£300,000</td>
                                <td>£300,000</td>
                                <td>£300,000</td>
                                <td>£300,000</td>
                                <td>£300,000</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className='awards-page-table-container'>
                    <table id="awards-table">
                        <thead>
                            <tr>
                                <th>Cumalitive</th>
                                <th>Oct-23</th>
                                <th>Nov-23</th>
                                <th>Dec-23</th>
                                <th>Jan-24</th>
                                <th>Feb-24</th>
                                <th>Mar-24</th>
                                <th>Apr-24</th>
                                <th>May-24</th>
                                <th>Jun-24</th>
                                <th>Jul-24</th>
                                <th>Aug-24</th>
                                <th>Sep-24</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Plus/Minus</td>
                                <td>£300,000</td>
                                <td>£300,000</td>
                                <td>£300,000</td>
                                <td>£300,000</td>
                                <td>£300,000</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default AwardsSummary

