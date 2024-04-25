import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AwardsTableRow from './AwardsTableRow';
import { extractMonthFromString, generateDateOptionsForSelectMenu, getCurrentMonth } from '../../../utils/DateUtils';
import { generateLocationOptionsForSelectMenu } from '../../../utils/locationUtils';
import axios from 'axios';
import AwardsTableAddRow from './AwardsTableAddRow';
import FirstAwardsEntry from '../../forms/FirstAwardsEntry';
import SelectMenu from '../../selectMenu/SelectMenu';

import { getCoreTotal } from '../../../utils/financialTotals';
import { useSelector } from 'react-redux';

import './awardsTable.css';
import '../../awards/awards.css';

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const AwardsTable = ({ locations }) => {
    const user = useSelector(state => state.users);

    const currentMonth = getCurrentMonth();
    const [filteredData, setFilteredData] = useState({ items: [] });
    const [showAddRow, setShowAddRow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(locations[0]);

    const [dateOptions, setDateOptions] = useState([])
    const [month, setMonth] = useState(currentMonth);
    const [coreSum, setCoreSum] = useState(0);

    const locationOptions = generateLocationOptionsForSelectMenu(locations);
    const locationHelper = useLocation();
    const queryParams = new URLSearchParams(locationHelper.search);
    const locationParam = queryParams.get("location");
    const monthParam = queryParams.get("month");

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
        }

        if (locationParam && monthParam) {
            setLocation(capitalizeFirstLetter(locationParam));
            setMonth(capitalizeFirstLetter(monthParam));
        }

        let encodedLocation = encodeURIComponent(location);
        let url = `/api/awards-diary/location?location=${encodedLocation}`

        axios.get(url).then((response) => {
            const filteredLocationData = response.data.find((item) => item.month === month);
            setFilteredData(filteredLocationData);
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
        console.log('on month selected called');
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
            <div className='awards-page-table-container'>
                <div className='awards-page-title-and-button'>
                    <h3>{location} {filteredData.month}-{filteredData.year}</h3>

                    {filteredData.items.length ?
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
                                            <AwardsTableRow data={data} key={data._id} onItemDeleted={itemDeleted} onItemEdited={onItemEdited} location={location} month={month} />
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
                            <h3>No awards found for {month}. Enter one below.</h3>
                            <FirstAwardsEntry awardsTableId={filteredData._id} location={filteredData.location} onItemAdded={itemAdded} month={month} />
                        </div>
                }
            </div>
        </div>
    )
}
export default AwardsTable;