import React, { useState } from 'react';
import axios from 'axios';
import "./devPage.css";
import AwardsTable from '../awards/table/AwardsTable';
import { useSelector } from 'react-redux';

const DevPage = () => {
    const [rowData, setRowData] = useState([]);
    const user = useSelector((state) => state.users);

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

    const onCheckUserExists = () => {
        const name = "darren.stallard"; // <- This format is a SamAccountName

        axios.get(`/api/ad/user-exists/${name}`).then((res) => {

        }).catch((error) => {
            console.log('Error checking if the user exists. Error: ', error);
        })
    }

    const onGetUsersForGroup = () => {
        const group = "Projects";

        axios.get(`/api/ad/users-for-group/${group}`).then((res) => {

        }).catch((error) => {
            console.log('Error checking the users for the group. Error: ', error);
        })
    }

    const onCheckToken = () => {
       const token = ""
        axios.get(`/api/auth/protected-route/${token}`).then((res) => {
            console.log('res from check tokon = ', res);
        }).catch((error) => {
            console.log('error = ', error);
        })
    }

    const onCheckAuthedUser = () => {
        console.log('state . autheduser = ', user.authenticatedUser);
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
                <button onClick={onCheckUserExists}>check user exists</button>
                <button onClick={onGetUsersForGroup}>get users for group</button>
                <button onClick={onCheckToken}>Check Token</button>
                <button onClick={onCheckAuthedUser}>Check authed user</button>

                </div>
            </div>
        </div>
    )
}

export default DevPage;