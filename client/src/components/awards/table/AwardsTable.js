import React, { useEffect, useState } from 'react'
import AwardsTableRow from './AwardsTableRow';
import { extractMonthFromString, generateDateOptionsForSelectMenu, getCurrentMonth } from '../../../utils/DateUtils';
import { getLocations, generateLocationOptionsForSelectMenu } from '../../../utils/locationUtils';
import axios from 'axios';
import AwardsTableAddRow from './AwardsTableAddRow';
import FirstAwardsEntry from '../../forms/FirstAwardsEntry';
import SelectMenu from '../../selectMenu/SelectMenu';
import Spinner from '../../spinner/Spinner';

import './awardsTable.css';
import '../../awards/awards.css';
import { getCoreTotal } from '../../../utils/financialTotals';

const locationOptions = generateLocationOptionsForSelectMenu();

const AwardsTable = () => {
    // Get the cuurent month to display that information by default
    const currentMonth = getCurrentMonth();
    const [filteredData, setFilteredData] = useState({ items: [] });
    const [showAddRow, setShowAddRow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const locations = getLocations()
    const [location, setLocation] = useState(locations[2]); // TODO change and handle "Cannot read properties of undefined (reading 'items')" error
    const [dateOptions, setDateOptions] = useState([])
    const [month, setMonth] = useState(currentMonth);
    const [coreSum, setCoreSum] = useState(0);

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
        }
        axios.get(`/api/awards-diary/location?location=${location}`).then((response) => {
            // Got the data for the given location, now need to filter based on current month.
            // Is this where state would come in handy becuase now gonna have to make anetwirk request for every time an option is selected??????
            const filteredLocationData = response.data.find((item) => item.month === month);
            setFilteredData(filteredLocationData);
        }).catch((error) => {
            console.log('Error getting filterd data. Error: ', error);
        }).finally(() => {

        })
    }, [location, month]);

    // This useEffect hook will be used to load the year from the selected diary
    useEffect(() => {
        setDateOptions(generateDateOptionsForSelectMenu(filteredData.year));
        setIsLoading(false);
    }, [filteredData]);

    useEffect(() => {
        setCoreSum(getCoreTotal(filteredData.items));
    }, [filteredData.items]) // observe the items array for changes

    const itemAdded = (data) => {
        const updatedFilteredData = [...filteredData.items, data];
        setFilteredData(prevState => ({
            ...prevState,
            items: updatedFilteredData
        }));

        // if the add row is open, close it
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

        // Update the state with the filteredArray
        setFilteredData(prevState => ({
            ...prevState,
            items: updatedFilteredData
        }));
    }

    const onLocationSelected = ({ value }) => {
        setLocation(value);
    }

    const onMonthSelected = ({ value }) => {
        setMonth(extractMonthFromString(value));
    }

    if (isLoading) {
        return <div className='spinner-container'><Spinner classes="page" /></div>
    } else {
        return (
            <div className='awards-table-container'>
                <div className='awards-table-container-select-menus'>
                    <div className='awards-table-select'>
                        <SelectMenu placeholder={location} menuItems={locationOptions} handleItemSelection={onLocationSelected} />
                    </div>
                    <div className='awards-table-select'>
                        <SelectMenu placeholder={month} menuItems={dateOptions} handleItemSelection={onMonthSelected} allSettingPlaceholder={false} />
                    </div>
                </div>

                <div className='awards-page-table-container'>
                    <div className='awards-page-title-and-button'>
                        <h3>{location} {filteredData.month}-{filteredData.year}</h3>

                        <button onClick={() => setShowAddRow(true)}>
                            Add Row
                        </button>
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

                                                <AwardsTableRow data={data} key={data._id} onItemDeleted={itemDeleted} onItemEdited={onItemEdited} />
                                            ))
                                            : null
                                    }
                                    {
                                        showAddRow &&
                                        // the below line will be used to replace the below code for adding data in the table
                                        <AwardsTableAddRow awardsTableId={filteredData._id} onCancelClicked={() => setShowAddRow(false)} onItemAdded={itemAdded} />
                                    }
                                    <tr className='last-row'>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className='last-cell'>Total: £{coreSum.toFixed(2)}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            : <div className='awards-table-no-data-container'>
                                <h3>No entries found for {month}</h3>
                                {/* Now how to dispay the add row? */}
                                <FirstAwardsEntry awardsTableId={filteredData._id} location={filteredData.location} onItemAdded={itemAdded} />
                            </div>
                    }
                </div>
            </div>
        )
    }
}
export default AwardsTable;