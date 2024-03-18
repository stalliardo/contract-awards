import React, { useEffect, useState } from 'react'
import AwardsTableRow from './AwardsTableRow';
import { getCurrentMonth } from '../../../utils/DateUtils';
import axios from 'axios';
import './awardsTable.css';
import AwardsTableAddRow from './AwardsTableAddRow';
import FirstAwardsEntry from '../../forms/FirstAwardsEntry';

const AwardsTable = ({ location }) => {

    const [filteredData, setFilteredData] = useState({ items: [] });
    const [showAddRow, setShowAddRow] = useState(false);

    useEffect(() => {
        const currentMonth = getCurrentMonth();

        axios.get(`/api/awards-diary/location?location=${location}`).then((response) => {
            // Got the data for the given location, now need to filter based on current month.
            // Is this where state would come in handy becuase now gonna have to make anetwirk request for every time an option is selected??????
            const filteredLocationData = response.data.find((item) => item.month === currentMonth);
            setFilteredData(filteredLocationData);
        })
    }, []);

    const itemAdded = (data) => {
        const updatedFilteredData = [...filteredData.items, data];
        setFilteredData(prevState => ({
            ...prevState,
            items: updatedFilteredData
        }));

        // if the add row is open, close it
        if(showAddRow) {
            setShowAddRow(false);
        }
    }

    const itemDeleted = (awardsDiaryItemId) => {
        const updatedFilteredData = filteredData.items.filter(item => item._id !== awardsDiaryItemId);

        // Update the state with the filteredArray
        setFilteredData(prevState => ({
            ...prevState,
            items: updatedFilteredData
        }));
    }

    return (
        <div>
            <div className='awards-page-table-container'>
                <div className='awards-page-title-and-button'>
                    <h3>{location} Dec-23</h3>

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

                                            <AwardsTableRow data={data} key={data._id} onItemDeleted={itemDeleted} />
                                        ))
                                        : null
                                }
                                {
                                    showAddRow &&
                                    // the below line will be used to replace the below code for adding data in the table
                                    <AwardsTableAddRow awardsTableId={filteredData._id} onCancelClicked={() => setShowAddRow(false)} onItemAdded={itemAdded}/>
                                }
                                <tr className='last-row'>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className='last-cell'>Total: £100,000</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                
                            </tbody>

                        </table>
                        : <div className='awards-table-no-data-container'>
                            <h3>No entries located</h3>
                            {/* Now how to dispay the add row? */}
                            <FirstAwardsEntry awardsTableId={filteredData._id} location={filteredData.location} onItemAdded={itemAdded} />
                        </div>
                }
            </div>
        </div>
    )
}

export default AwardsTable;


// This will be the component that displays informaiton for a location and month ie "Basingstoke January 2024"
// When instantiated will load the data via location and month -> this will either default to the current month or be selected
// The location returned by default will be sorted alphabetically?
// Locations retrieved Will need to based off the USER MATRIX
// useEffect will be used to get the default for the current Month axios.get(/api/awards-diary/current?location=Basingstoke)...


// useEffect....

// location will be passed in
// Get the data based on that value ie "Basingstoke"
// Get the current Month using Date Utils, use that value to filter the table
