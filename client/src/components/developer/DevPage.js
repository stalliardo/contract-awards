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
        title: "Generate all data for new financial year",
        description: "This function is only to be called once at the start of the financial year.",
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

const DevFunctionCard = ({ title, description, buttonText, clickHandler, isLoading, loadingText }) => {
    const handleClick = () => {
        if (confirmationcallback(`Are you sure you want to call the "${buttonText}" function?`)) {
            clickHandler();
        }
    }

    return (
        <div className='dev-function-card'>
            {
                isLoading ? <div className='dev-spinner'><Spinner/></div> :
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

    const generateAllDataForYear = async () => {
        console.log('called');
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
                <DevFunctionCard title={functionCardData[0].title} 
                    description={functionCardData[0].description} 
                    buttonText={functionCardData[0].buttonText} 
                    clickHandler={generateAllDataForYear} 
                    isLoading={isGeneratingAllData}
                    loadingText="Generating Data..."
                />
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
