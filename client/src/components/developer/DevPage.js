import React, { useState } from 'react';
import axios from 'axios';
import "./devPage.css";
import AwardsTable from '../awards/table/AwardsTable';
import { useSelector } from 'react-redux';

const functionCardData = [
    {
        title: "Generate all data for new financial year",
        description: "This function is only to be called once at the start of the financial year. It will generate all the default data so the app can render tables with default values.",
        buttonText: "Generate Default Data"
    },
    {
        title: "Generate all data for new financial year",
        description: "This function is only to be called once at the start of the financial year. It will generate all the default data so the app can render tables with default values.",
        buttonText: "Generate Default Data"
    },
    {
        title: "Generate all data for new financial year",
        description: "This function is only to be called once at the start of the financial year. It will generate all the default data so the app can render tables with default values.",
        buttonText: "Generate Default Data"
    },
    {
        title: "Generate all data for new financial year",
        description: "This function is only to be called once at the start of the financial year. It will generate all the default data so the app can render tables with default values.",
        buttonText: "Generate Default Data"
    },
    {
        title: "Generate all data for new financial year",
        description: "This function is only to be called once at the start of the financial year. It will generate all the default data so the app can render tables with default values.",
        buttonText: "Generate Default Data"
    },
]

const confirmationcallback = (text) => {
    const confirmation = window.confirm(text);

    return confirmation;
}

const DevFunctionCard = ({ title, description, buttonText, clickHandler }) => {

    const handleClick = () => {
        if(confirmationcallback(`Are you sure you want to call the "${buttonText}" function?`)) {
            clickHandler();
        }
    }

    return (
        <div className='dev-function-card'>
            <h3>{title}</h3>
            <p>{description}</p>
            <div>
                <button onClick={handleClick}>{buttonText}</button>
            </div>
        </div>
    )
}


const DevPage = () => {
    const [rowData, setRowData] = useState([]);
    const user = useSelector((state) => state.users);

    // const onAddAwardsClicked = () => {
    //     const awardsdata = {
    //         year: "2024",
    //         month: "March",
    //         location: "Basingstoke"
    //     }

    //     axios.post("/api/awards-diary", awardsdata).then((response) => {
    //     }).catch((error) => console.log('Error from frontend = ', error));
    // }

    // const onCreateYearlyClicked = () => {
    //     const data = {
    //         location: "Avonmouth"
    //     }

    //     axios.post("/api/awards-diary/add-year", data).then((response) => {
    //     }).catch((error) => console.log('Error from frontend = ', error));
    // }

    // const onGetRecordsVialocationClicked = () => {
    //     axios.get("/api/awards-diary/location").then((response) => {
    //         setRowData(response.data);
    //     }).catch((error) => console.log('Error getting location data - ', error))
    // }

    const generateAllDataForYear = () => {
        console.log('called');

        axios.get("/api/awards-diary/generateAllData").then((response) => {

        }).catch((error) => console.log('Error getting location data - ', error))
    }

    // const onCheckUserExists = () => {
    //     const name = "darren.stallard"; // <- This format is a SamAccountName

    //     axios.get(`/api/ad/user-exists/${name}`).then((res) => {

    //     }).catch((error) => {
    //         console.log('Error checking if the user exists. Error: ', error);
    //     })
    // }

    // const onGetUsersForGroup = () => {
    //     const group = "Projects";

    //     axios.get(`/api/ad/users-for-group/${group}`).then((res) => {

    //     }).catch((error) => {
    //         console.log('Error checking the users for the group. Error: ', error);
    //     })
    // }

    // const onCheckToken = () => {
    //    const token = ""
    //     axios.get(`/api/auth/protected-route/${token}`).then((res) => {
    //     }).catch((error) => {
    //         console.log('error = ', error);
    //     })
    // }

    // const onCheckAuthedUser = () => {
    //     console.log('state . autheduser = ', user.authenticatedUser);
    // }

    const onGenerateTendersSubmittedData = () => {
        axios.post("/api/tenders/generate-initial-data");
    }

    const onGenerateDataForNewLocation = () => {
        axios.post("/api/tenders/generate-data-for-new-location", { location: "Bristol" });
    }

    

    const onclickHanlder = () => {
        console.log('hankder called');
    }


    return (
        <div className='dev-page-container'>
            <h2>Site Administrator Functions:</h2>
            <p>Authorized personnel only. Misuse can result in application errors and data loss.</p>


            <div className='dev-functions-container'>


                <DevFunctionCard title={functionCardData[0].title} description={functionCardData[0].description} buttonText={functionCardData[0].buttonText} clickHandler={onclickHanlder} />
                <DevFunctionCard title={functionCardData[1].title} description={functionCardData[1].description} buttonText={functionCardData[1].buttonText} clickHandler={onclickHanlder} />
                <DevFunctionCard title={functionCardData[2].title} description={functionCardData[2].description} buttonText={functionCardData[2].buttonText} clickHandler={onclickHanlder} />


                {/* {
                    functionCardData.map((cardData, index) => {
                        return (
                        )
                    })
                } */}


                {/* <div className='dev-awards-functions-container'>
                    <h3>Awards functions</h3>
                    
                    <button onClick={generateAllDataForYear}>generateAllDataForYear</button>
                </div>
                <div className='dev-awards-functions-container'>
                <h3>Admin functions</h3>
                
                <button onClick={onGenerateTendersSubmittedData}>Generate Tenders Submitted Data</button>
                <button onClick={onGenerateDataForNewLocation}>Generate Tender for new location</button>
                </div> */}
            </div>
        </div>
    )
}

export default DevPage;


// functions required for site-admins
// The ability to set the database name?
// Create the default data for the year ie awards and tenders
// Add or Remove users via their AD group
// Change a users group / role. eg, they are moved from one folder in AD to another. This can be done using the mongodb compass software also
// When a director adds a new location the default tenders data also needs to be updated using the "generate-data-for-new-location" endpoint
