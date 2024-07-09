import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AwardsTableRow from './AwardsTableRow';
import { extractMonthFromString, generateDateOptionsForSelectMenu, getCurrentMonth, sortDataInFinancialMonthOrder } from '../../../utils/DateUtils';
import { generateLocationOptionsForSelectMenu } from '../../../utils/locationUtils';
import axios from 'axios';
import AwardsTableAddRow from './AwardsTableAddRow';
import FirstAwardsEntry from '../../forms/FirstAwardsEntry';
import SelectMenu from '../../selectMenu/SelectMenu';

import { getCoreTotal } from '../../../utils/financialTotals';
import { useDispatch, useSelector } from 'react-redux';

import './awardsTable.css';
import '../../awards/awards.css';
import AllAwardsForLocation from '../all-awards-for-location/AllAwardsForLocation';

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const AwardsTable = ({ locations }) => {
    const user = useSelector(state => state.users);
    const isCurrentFinancialYear = user.isCurrentFinancialYear;

    const currentMonth = getCurrentMonth();
    const [filteredData, setFilteredData] = useState({ items: [] });
    const [allAwardsData, setAllAwardsData] = useState()
    const [showAddRow, setShowAddRow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(locations[0]);
    const [allSelected, setAllSelected] = useState(false);

    const [dateOptions, setDateOptions] = useState([])
    const [month, setMonth] = useState(currentMonth);
    const [coreSum, setCoreSum] = useState(0);

    const locationOptions = generateLocationOptionsForSelectMenu(locations);
    const locationHelper = useLocation();

    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(locationHelper.search);
    let locationParam = queryParams.get("location");
    let monthParam = queryParams.get("month");

    useEffect(() => {
        if (locationParam && monthParam) {
            if (locationParam === "MandE") locationParam = "M&E";

            setLocation(capitalizeFirstLetter(locationParam));
            setMonth(capitalizeFirstLetter(monthParam));
        }
    }, [])

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
        }

        let encodedLocation = encodeURIComponent(location);
        let url = `/api/awards-diary/location?location=${encodedLocation}&financialYear=${user.selectedFinancialYear}`;

        axios.get(url).then((response) => {
            let filteredLocationData = [];

            console.log('response = ', response.data);

            if (month === "All") {
                setAllSelected(true);

                // TODO: either sort here or in the allawardsforlocation comp
                sortDataInFinancialMonthOrder(response.data)
                setAllAwardsData(response.data);
            } else {
                setAllSelected(false);

                filteredLocationData = response.data.find((item) => item.month === month);
                setFilteredData(filteredLocationData);
            }

        }).catch((error) => {
            console.log('Error getting filterd data. Error: ', error);
        }).finally(() => {

        })
    }, [location, month, user.authenticatedUser]);

    // This useEffect hook will be used to load the year from the selected diary
    useEffect(() => {
        setDateOptions(generateDateOptionsForSelectMenu(filteredData.year));
        setIsLoading(false);
    }, [filteredData]);

    useEffect(() => {
        setCoreSum(getCoreTotal(filteredData.items));
    }, [filteredData.items])

    const itemAdded = (data) => {
        const updatedFilteredData = [...filteredData.items, data];
        setFilteredData(prevState => ({
            ...prevState,
            items: updatedFilteredData
        }));

        if (showAddRow) {
            setShowAddRow(false);
        }
    }

    const onItemEdited = (data) => {
        const itemId = data._id;
        const itemIndex = filteredData.items.findIndex(item => item._id === itemId);

        if (itemIndex !== -1) {
            const updatedItems = [...filteredData.items];

            updatedItems[itemIndex] = data;

            setFilteredData(prevState => ({
                ...prevState,
                items: updatedItems
            }));
        }

        if (showAddRow) setShowAddRow(false);
    }

    const itemDeleted = (awardsDiaryItemId) => {
        const updatedFilteredData = filteredData.items.filter(item => item._id !== awardsDiaryItemId);

        setFilteredData(prevState => ({
            ...prevState,
            items: updatedFilteredData
        }));
    }

    const onLocationSelected = ({ value }) => {
        setLocation(value);
    }

    const onMonthSelected = ({ value }) => {
        console.log('on month seected = ', extractMonthFromString(value));
        setMonth(extractMonthFromString(value));
    }

    return (
        <div className='awards-table-container'>
            <div className='awards-table-container-select-menus'>
                <div className='awards-table-select'>
                    <SelectMenu placeholder={location} menuItems={locationOptions} handleItemSelection={onLocationSelected} />
                </div>
                <div className='awards-table-select'>
                    <SelectMenu placeholder={month} menuItems={dateOptions} handleItemSelection={onMonthSelected} />
                </div>
            </div>
            {
                !allSelected ? 
                <div className='awards-page-table-container'>
                <div className='awards-page-title-and-button' style={{ marginBottom: "20px", alignItems: "center", height: "40px" }}>
                    <div></div>
                    {filteredData.items.length ?
                        isCurrentFinancialYear &&
                        <button onClick={() => setShowAddRow(true)}>
                            Add Row
                        </button>
                        : null
                    }
                </div>
                {
                    filteredData.items.length ?
                        <table id="awards-table" className='awards-form-table'>
                            <thead>
                                <tr>
                                    <th className='contracts-column'>Contract No.</th>
                                    <th>Project</th>
                                    <th>Programme</th>
                                    <th>Contractor</th>
                                    <th>Region</th>
                                    <th>Core</th>
                                    <th colSpan="2" style={{ textAlign: "center" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredData.items && filteredData.items.length ?
                                        filteredData.items.map((data) => (
                                            <AwardsTableRow data={data} key={data._id} onItemDeleted={itemDeleted} onItemEdited={onItemEdited} location={location} month={month} isCurrentFinancialYear={isCurrentFinancialYear} />
                                        ))
                                        : null
                                }
                                {
                                    showAddRow &&
                                    <AwardsTableAddRow awardsTableId={filteredData._id} onCancelClicked={() => setShowAddRow(false)} onItemAdded={itemAdded} location={location} month={month} />
                                }
                                <tr className='last-row'>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className='last-cell'>Total: £{coreSum.toLocaleString()}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        : <div className='awards-table-no-data-container'>
                            <h3>No awards found for {location}-{month}. Enter one below.</h3>
                            <FirstAwardsEntry awardsTableId={filteredData._id} location={filteredData.location} onItemAdded={itemAdded} month={month} />
                        </div>
                }
            </div>
            : <div><AllAwardsForLocation data={allAwardsData}/></div>
            }
        </div>
    )
}
export default AwardsTable;

// TODOs for displaying all items

// 1 - remove the add row button
// 2 - have a new component that can display all the detaisl based off of an array
// 3 - Remove the ability to edit the row when this view all section is enabled

