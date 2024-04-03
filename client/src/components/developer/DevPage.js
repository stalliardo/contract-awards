import React, { useState } from 'react';
import axios from 'axios';
import "./devPage.css";
import AwardsTable from '../awards/table/AwardsTable';

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
        }).catch((error) => console.log('Error from frontend = ', error));
    }

    const onCreateYearlyClicked = () => {
        const data = {
            location: "Avonmouth"
        }

        axios.post("/api/awards-diary/add-year", data).then((response) => {
        }).catch((error) => console.log('Error from frontend = ', error));
    }

    const onGetRecordsVialocationClicked = () => {
        axios.get("/api/awards-diary/location").then((response) => {
            setRowData(response.data);
        }).catch((error) => console.log('Error getting location data - ', error))
    }

    const generateAllDataForYear = () => {
        console.log('called');

        axios.get("/api/awards-diary/generateALLData").then((response) => {

        }).catch((error) => console.log('Error getting location data - ', error))
    }

    return (
        <div className='dev-page-container'>
            <h2>Test Page</h2>
            <div className='dev-functions-container'>
                <div className='dev-awards-functions-container'>
                    <h3>Awards functions</h3>
                    <button onClick={onAddAwardsClicked}>create awards diary</button>
                    <button onClick={onCreateYearlyClicked}>create yearly location records</button>
                    <button onClick={onGetRecordsVialocationClicked}>Get records via location</button>
                    <button onClick={generateAllDataForYear}>generateAllDataForYear</button>
                </div>
                <div className='dev-awards-functions-container'>
                <h3>Admin functions</h3>

                </div>
            </div>

            {/* TODO below location needs to be dynamic */}
            {/* <AwardsTable/> */}
        </div>
    )
}

export default DevPage