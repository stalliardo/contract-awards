import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux/features/awards/awardsThunks';
import Spinner from '../../spinner/Spinner';
import AwardsSummaryCoreTotalsRow from './AwardsSummaryCoreTotalsRow';
import AwardsSummaryUKCoreTotalsRow from './AwardsSummaryUKCoreTotalsRow';
import AwardsSummarySpecialsRow from './AwardsSummarySpecialsRow';
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from '../../../utils/financialTotals';
import AwardsSummaryTotalsRow from './AwardsSummaryTotalsRow';
import AwardsSummaryMonthlyPerformanceRow from './AwardsSummaryMonthlyPerformanceRow';
import { COLOURS, ROLES, extractADFriendlyRegionalName, sortLocations, sortLocationsObject } from '../../../utils/constants';
import AwardsSummaryCumalitivePerformanceRow from './AwardsSummaryCumalitivePerformanceRow';
import { generateFinancialYearMonths, getFinancialYearString } from '../../../utils/DateUtils';
import { useNavigate } from 'react-router-dom';
import { addSlashToYearString, removeSlashFromyearString } from '../../../utils/stringUtils';
import { clearExportData, generateExportData } from '../../../redux/features/awards/awardsSlice';
import { generateCSVString } from '../../../utils/CSVExport';
import SelectMenu from '../../selectMenu/SelectMenu';
import { filterOutVoidLocationsForYear } from '../../../utils/locationUtils';

const filterOptions = [
    { value: "All" },
    { value: "London" },
    { value: "Northern" },
    { value: "Southern" },
    { value: "Europe, Birmingham & Glasgow" },
    { value: "M&E" }
];

const AwardsSummary = () => {
    const dispatch = useDispatch();
    let cumalitiveTotalsSum = 0;
    const authenticatedUser = useSelector(state => state.users.authenticatedUser);
    const selectedFinancialYear = useSelector(state => state.users.selectedFinancialYear);
    const awardsData = useSelector((state) => state.awards);
    const usersData = useSelector((state) => state.users.data);

    const isLoading = useSelector((state) => state.awards.loading);

    const [locations, setLocations] = useState(authenticatedUser.locations ? filterOutVoidLocationsForYear(getFinancialYearString(), authenticatedUser.locations) : []);

    const sortedLocations = useMemo(() => sortLocations(locations), [locations]);

    const originalLocations = useSelector((state) => state.location.data);

    const [selectedLocation, setSelectedLocation] = useState(filterOptions[0].value);

    const navigate = useNavigate();

    const [spinnerComplete, setSpinnerComplete] = useState(false);
    const showUI = !isLoading && spinnerComplete;

    const MonthsForTableHead = ({ k }) => {
        const months = generateFinancialYearMonths(addSlashToYearString(selectedFinancialYear));

        const cells = months.map((month, i) => {
            return <th key={`${k} ${i}`}>{month}</th>
        })

        return cells;
    }

    useEffect(() => {
        if (!authenticatedUser._id) {
            navigate("/");
        } else {
            // if (awardsData.coreTotals.length > 0) {
            //     setTimeout(() => {
            //         setSpinnerComplete(true); // to fix the flash, added a delay
            //     }, 500);
            // } else {
            if (authenticatedUser) {
                dispatch(fetchData({ locationData: originalLocations, authenticatedUser, selectedFinancialYear: removeSlashFromyearString(selectedFinancialYear) })).finally(() => {
                    setTimeout(() => {
                        setSpinnerComplete(true);
                    }, 500);
                })
            }
            // }
        }
    }, []);

    const generateFilteredTotals = (location) => {
        const totals = awardsData.coreTotals.filter((totals) => totals.location === location)
        if (totals.length === 0) {
            return null;
        }

        return totals;
    }

    const generateCumalitiveTotals = (location) => {
        const filteredTotals = generateFilteredTotals(location);

        if (filteredTotals === null) {
            return null;
        }

        const sum = filteredTotals.reduce((total, currentItem) => total + currentItem.sum, 0);

        cumalitiveTotalsSum += sum;
        return sum;
    }

    const onExportCSV = () => {
        dispatch(generateExportData(sortLocationsObject(originalLocations)));
    }

    useEffect(() => {
        if (awardsData.exportData) {
            const confirmation = window.confirm("Are you sure you want to export CSV data for the awards summary?");
            if (confirmation) {
                generateCSVString(awardsData.exportData, selectedFinancialYear);
            }
            dispatch(clearExportData());
        }
    }, [awardsData.exportData])


    const onFilterSelected = ({ value }) => {
        setSelectedLocation(value);

        const extractedRegion = extractADFriendlyRegionalName(value);
        const user = usersData.find(user => user.name === extractedRegion);

        if (value !== "All" && user && user.locations.length > 0) {
            setLocations(user.locations);
            dispatch(fetchData({ locationData: originalLocations, authenticatedUser: { locations: user.locations }, selectedFinancialYear: removeSlashFromyearString(selectedFinancialYear) })).finally(() => {
                setTimeout(() => {
                    setSpinnerComplete(true);
                }, 500);
            })
        }

        if (value === "All") {
            setLocations(authenticatedUser.locations);
            dispatch(fetchData({ locationData: originalLocations, authenticatedUser, selectedFinancialYear: removeSlashFromyearString(selectedFinancialYear) })).finally(() => {
                setTimeout(() => {
                    setSpinnerComplete(true);
                }, 500);
            })
        }
    }

    return (
        !showUI ?
            <div className='spinner-container-page'><Spinner classes="page" text="Generating Summary Table...." /></div>
            :
            <div className='awards-page-container'>
                <div className='awards-page-table-container'>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <h3>Contract Awards Summary</h3>
                        {
                            authenticatedUser.role === ROLES.CA01 &&
                            <button onClick={onExportCSV}>Export CSV</button>
                        }
                    </div>
                    <table id="awards-table" className='awards-summary-table'>
                        <thead>
                            <tr>
                                <th style={{ maxWidth: "150px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            Location
                                        </div>
                                        {
                                            authenticatedUser.role === ROLES.CA01 || authenticatedUser.role === ROLES.CA02 ?
                                                <div style={{ width: "50%" }}>
                                                    <SelectMenu placeholder={selectedLocation} dropDownContainerStyles={{ width: "260px" }} menuItems={filterOptions} handleItemSelection={onFilterSelected} styles={{ color: "black" }} />
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                </th>
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
                                    if (location !== "M&E" && location !== "Europe" && generateFilteredTotals(location)) {
                                        return <AwardsSummaryCoreTotalsRow targetsData={awardsData.targets} filteredTotals={generateFilteredTotals(location)} cumalitiveTotal={generateCumalitiveTotals(location)} locationRef={location} key={index} />
                                    }
                                    return null;
                                })
                            }
                            {
                                selectedLocation === "All" ?
                                    <tr className='bold-cells' style={{ borderTop: "2px solid black" }}>
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
                                    :
                                    null
                            }
                            {
                                sortedLocations.map((location, index) => {
                                    if (location === "Europe" || location === "M&E") {
                                        return <AwardsSummarySpecialsRow targetsData={awardsData.targets} filteredTotals={generateFilteredTotals(location)} cumalitiveTotal={generateCumalitiveTotals(location)} locationRef={location} key={index} />
                                    }
                                })
                            }
                            <tr className='bold-cells' style={{ borderTop: "2px solid black" }}>
                                <td>Total</td>
                                <AwardsSummaryTotalsRow
                                    ukCoreTotals={awardsData.ukCoreTotals}
                                    specialCoreTotals={awardsData.specialCoreTotals}
                                    cumalativeTotals={cumalitiveTotalsSum}
                                    ukAndSpecialTargetTotal={awardsData.ukAndSpecialTargetTotal}
                                />
                            </tr>

                            {
                                authenticatedUser.role === ROLES.CA01 &&
                                <>
                                    <tr style={{background: "white", color: "black", border: "none"}}><td style={{border: "none"}}><h3 style={{margin: "10px 0px 0px -10px"}}>Company Performance</h3></td></tr>
                                    <tr></tr>
                                    

                                    <tr>
                                        <AwardsSummaryMonthlyPerformanceRow monthlyCoreTotals={awardsData.ukAndSpecialCoreTotals} monthlyTargetTotal={awardsData.ukAndSpecialTargetTotal} />
                                    </tr>


                                    <tr>
                                        <AwardsSummaryCumalitivePerformanceRow monthlyCoreTotals={awardsData.ukAndSpecialCoreTotals} monthlyTargetTotal={awardsData.ukAndSpecialTargetTotal} />
                                    </tr>
                                </>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
    )
}
export default AwardsSummary;