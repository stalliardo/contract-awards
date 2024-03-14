import React from 'react';
import axios from 'axios';
import "./devPage.css";

const DevPage = () => {
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
        </div>
    )
}

export default DevPage