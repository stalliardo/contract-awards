import React, { useState } from 'react';
import axios from 'axios';
import "./devPage.css";
import Spinner from '../spinner/Spinner';

const functionCardData = [
    {
        title: "Generate all data for new financial year",
        description: "This function is only to be called once at the start of the financial year. It will generate all the default data so the app can render tables with default values.",
        buttonText: "Generate Default Data"
    },
    {
        title: "Update AD users",
        description: "If a user has been added or removed from one of the CA groups use this function. This is required so the app doesnt have to perform unnecessary computations every time a user enters the app.",
        buttonText: "Update AD Users"
    },

    {
        title: "Reassign a users group",
        description: "If a users CA group has changed in active directoy use this function. This is required so the app doesnt have to perform unnecessary computations every time a user enters the app.",
        buttonText: "Reassign User Group"
    },
]

const confirmationcallback = (text) => {
    const confirmation = window.confirm(text);
    return confirmation;
}

const DevFunctionCard = ({ title, description, buttonText, clickHandler, isLoading, loadingText, requiresConfirmation = true }) => {
    const handleClick = () => {
        if (requiresConfirmation) {
            if (confirmationcallback(`Are you sure you want to call the "${buttonText}" function?`)) {
                clickHandler();
            }
        } else {
            clickHandler();
        }
    }

    return (
        <div className='dev-function-card'>
            {
                isLoading ? <div className='dev-spinner'><Spinner /></div> :
                    <>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <div className='dev-button-container'>
                            <button onClick={handleClick}>{buttonText}</button>
                        </div>
                    </>
            }
        </div>
    )
}

const DevPage = () => {
    const [isGeneratingAllData, setIsGeneratingAllData] = useState(false);
    const [isUpdatingUsers, setIsUpdatingUsers] = useState(false);

    const generateAllDataForYear = async () => {


        setIsGeneratingAllData(true);
        try {
            // generate all awards data...
            await axios.get("/api/awards-diary/generateAllData");

            // generate all tenders data...
            await axios.post("/api/tenders/generate-initial-data");
        } catch (error) {
            console.log('Error from gnenerateAllData: ', error);
        } finally {
            setTimeout(() => {
                setIsGeneratingAllData(false);
            }, 1250);
        }
    }

    const onGenerateDataForNewLocation = () => {
        axios.post("/api/tenders/generate-data-for-new-location", { location: "Bristol" });
    }

    const onReassignUserClicked = () => {
        console.log('reassign clicked');

        // TODO is this required? This can be achieved using mongo compass software
        // Future feature
    }

    const onUpdateADUsers = async () => {
        setIsUpdatingUsers(true);
    
        try {
            await axios.get("/api/ad/update-AD-users");
        } catch (error) {
            console.log('error upading = ', error);
        } finally { 
            setTimeout(() => {
                setIsUpdatingUsers(false);
            }, 1250);
        }
    }


    return (
        <div className='dev-page-container'>
            <h2>Site Administrator Functions:</h2>
            <p>Authorized personnel only. Misuse can result in application errors and data loss.</p>
            <div className='dev-functions-container'>
                <DevFunctionCard title={functionCardData[0].title}
                    description={functionCardData[0].description}
                    buttonText={functionCardData[0].buttonText}
                    clickHandler={generateAllDataForYear}
                    isLoading={isGeneratingAllData}
                />
                <DevFunctionCard
                    title={functionCardData[1].title}
                    description={functionCardData[1].description}
                    buttonText={functionCardData[1].buttonText}
                    isLoading={isUpdatingUsers}
                    clickHandler={onUpdateADUsers}
                />
                {/* <DevFunctionCard
                    title={functionCardData[2].title}
                    description={functionCardData[2].description}
                    buttonText={functionCardData[2].buttonText}
                    clickHandler={onUpdateADUsers}
                    requiresConfirmation={false}
                /> */}
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


// NEXT function:
// edit users folders ie when moved from CA01 etc
// simple function that allows an admin to select a user from a drowdown, then, select a new group and save.
