import React, { useState } from 'react';
import axios from 'axios';
import "./devPage.css";
import AwardsTableRow from '../awards/table/AwardsTableRow';

const DevPage = () => {



    const [rowData, setRowData] = useState([]);


    const onAddAwardsClicked = () => {
        // pass some data as an object via axios
        const awardsdata = {
            year: "2024",
            month: "March",
            location: "Basingstoke"
        }

        axios.post("/api/awards-diary", awardsdata).then((response) => {
            console.log('response from backend: ', response);
        }).catch((error) => console.log('Error from frontend = ', error));
    }

    const onCreateYearlyClicked = () => {
        const data = {
            location: "Basingstoke"
        }

        axios.post("/api/awards-diary/add-year", data).then((response) => {
            console.log('response from backend: ', response);
        }).catch((error) => console.log('Error from frontend = ', error));
    }

    const onGetRecordsVialocationClicked = () => {
        axios.get("/api/awards-diary/location").then((response) => {
            console.log('response from get: ', response);
            setRowData(response.data);
        }).catch((error) => console.log('Error getting location data - ', error))
    }





    return (
        <div className='dev-page-container'>
            <h2>Test Page</h2>
            <div className='dev-page-container-buttons'>
                <button onClick={onAddAwardsClicked}>create awards diary</button>
                <button onClick={onCreateYearlyClicked}>create yearly location records</button>
                <button onClick={onGetRecordsVialocationClicked}>Get records via location</button>
            </div>

            
            <div>
                <div className='awards-page-table-container'>
                    <div className='awards-page-title-and-button'>
                        <h3>Basingstoke Dec-23</h3>

                        {/* <button onClick={() => setShowAddRow(true)}>
                        Add Row
                    </button> */}

                    </div>
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
                            rowData.length && 
                                rowData.map((rData) => {
                                    return <AwardsTableRow />
                                })
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

                            {/* {
                                showAddRow &&
                                <tr className='conditional-row'>
                                    <td>
                                        <input type='text' name='contractNumber' placeholder='Contract No' onChange={handleChange} />
                                    </td>
                                    <td>
                                        <input type='text' name='contractNumber' placeholder='Project' onChange={handleChange} />
                                    </td>
                                    <td>
                                        <input type='text' name='contractNumber' placeholder='Programme' onChange={handleChange} />
                                    </td>
                                    <td>
                                        <input type='text' name='contractNumber' placeholder='Contractor' onChange={handleChange} />
                                    </td>
                                    <td>
                                        <input type='text' name='contractNumber' placeholder='Region' onChange={handleChange} />
                                    </td>
                                    <td>
                                        <input type='text' name='contractNumber' placeholder='Core' onChange={handleChange} />
                                    </td>
                                    <td className='table-actions-cell' onClick={() => setShowAddRow(false)}>
                                    <button className='table-actions-cell edit'>Cancel</button>
                                </td>
                                <td className='table-actions-cell'>
                                    <button className='table-actions-cell edit'>Save</button>
                                </td>

                                </tr>
                            } */}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default DevPage