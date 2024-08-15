import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./devPage.css";
import Spinner from '../spinner/Spinner';
import { getTokenFromStorage } from '../../utils/localStorageUtils';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    useEffect(() => {
        const token = getTokenFromStorage();
        if(!token) {
            // navigate("/auth");        
        }
    }, [])

    const [isGeneratingAllData, setIsGeneratingAllData] = useState(false);
    const [isUpdatingUsers, setIsUpdatingUsers] = useState(false);

    const generateAllDataForYear = async () => {
        setIsGeneratingAllData(true);

        const token = getTokenFromStorage();

        console.log('token = ', token);
        try {
            // generate all awards data...
            // TODO - reenable below line
            // await axios.get("/api/awards-diary/generateAllData");

            // generate all tenders data...
            await axios.post(`/api/tenders/generate-initial-data/${token}`,);
        } catch (error) {
            console.log('Error from gnenerateAllData: ', error);
        } finally {
            setTimeout(() => {
                setIsGeneratingAllData(false);
            }, 1250);
        }
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

    const generateTenders = async () => {
        await axios.post("/api/tenders/generate-initial-data");
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
            </div>

            {/* Disabled - DS 15/08/24 */}
            {/* <button onClick={generateTenders}>generate data</button> */}
        </div>
    )
}
export default DevPage;