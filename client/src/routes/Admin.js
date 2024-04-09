import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './admin.css';
import Spinner from '../components/spinner/Spinner';
import UsersTable from '../components/admin/UsersTable';
import TargetsTable from '../components/admin/TargetsTable';
import { TARGET_CATEGORIES } from '../utils/constants';

const Admin = () => {
  const [location, setLocation] = useState("");
  const [locationsRetrieved, setLocationsRetrieved] = useState([]);
  const [targetAndLocationData, setTargetAndLocationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddNewLocation, setShowAddNewLocation] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  useEffect(() => {

    const formattedTargetData = [];

    const awardsData = [];
    const tendersData = [];

    axios.get("/api/location/get-locations").then((response) => {
      setLocationsRetrieved(response.data);

      axios.get("/api/targets").then((res) => {
          response.data.forEach((location) => {
            const targetDataToAdd = res.data.filter(target => target.location === location.name );
            let data = {locationData: {...location}};
            if(targetDataToAdd.length) {
              targetDataToAdd.forEach((dataItem) => {
                if(dataItem.category === TARGET_CATEGORIES.CONTRACT_AWARDS) {
                  data.awardsData = dataItem
                } 
                if(dataItem.category === TARGET_CATEGORIES.TENDERS_SUBMITTED) {
                  data.tendersData = dataItem
                }
              })
              formattedTargetData.push(data);
            } else {
              formattedTargetData.push(data);
            }
          })
          
        setTargetAndLocationData(formattedTargetData);
         
      }).catch((error) => {
        console.log('Error getting targets. Error: ', error);
      })
    }).catch((error) => {
      console.log('Error getting Locations. Error: ', error);
    }).finally(() => {
      setIsLoading(false);
    })
  }, [])

  useEffect(() => {
    setSaveButtonDisabled(location.length < 1);
  }, [location]);

  const onAddLocation = () => {
    setIsSaving(true);
    axios.post("/api/location/add-item", {name: location}).then((response) => {
      const newArray = locationsRetrieved;
      newArray.push({name: location});

      setLocationsRetrieved(newArray);
      setLocation("");
    }).catch((error) => {
      console.log('Error adding location. Error: ', error);
    }).finally(() => {
      setIsSaving(false);
    })
  }
  const handleChange = (e) => {
    setLocation(e.target.value)
  }

  const onCloseAddLocationModal = () => {
    setShowAddNewLocation(false);
    setLocation("");
  }

  return (
    <div className='admin-page-container'>
      <h1>Admin / Director Page</h1>
      {
        isLoading ? <div className='spinner-container-page'><Spinner classes="page" /></div> :
        <div className='admin-top-container'>
        <div className='admin-current-locations-container'>
            <h3>Current Locations: ({locationsRetrieved.length})</h3>
            <ul>
              {
                locationsRetrieved.map((location, index) => {
                  return <ol key={index}>{location.name}</ol>
                })
              }
            </ul>
            <button onClick={() => setShowAddNewLocation(true)}>Add Location</button>
            {
              showAddNewLocation ? 
              <div className='blackout-overlay'>
                 <div className='admin-modal'>
                  <h3>Add Location</h3>
                  <input type='text' value={location} onChange={handleChange}/>
                  <div className='admin-modal-buttons'>
                    <button className='green' onClick={onAddLocation} disabled={saveButtonDisabled}>
                      {isSaving ? <div className='spinner-button'><Spinner classes="button"/></div> : "Save"}
                    </button>
                    <button onClick={onCloseAddLocationModal}>Close</button>
                  </div>
                </div> 
              </div>
            : null
            }
        </div>
        <div className='admin-members-container'>
          <UsersTable availableLocations={locationsRetrieved}/>
        </div>
      </div>
      }
      
      <h3 id="targets-h3">Awards and Tender Targets</h3>

      <div className='admin-targets-container'>
        <div className='admin-targets-flex'>
          <div className='admin-targets-flex-left'>
            <TargetsTable tableTitle="Contract Awards Targets" data={targetAndLocationData} targetData={targetAndLocationData.awardsData} targetCategory={TARGET_CATEGORIES.CONTRACT_AWARDS}/>
          </div>
          <div className='admin-targets-flex-right'>
            <TargetsTable tableTitle="Submitted Tenders Targets" data={targetAndLocationData} targetData={targetAndLocationData.tendersData} targetCategory={TARGET_CATEGORIES.TENDERS_SUBMITTED}/>
          </div>
        </div>
      </div>

      {/* Add some whitespace at the bottom of the page */}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default Admin;

// Questions:
  // How will the targets be set
  // where does the special Projects values come from
  // Same for M&E?
  // Who can set them

  // Special projects and mande will have to be treated as locations to be able to add the values to them
  // might also need to add a flag to the schema to differentiate between actual locations and special / MandE types


  // Need the ability to add / remove locations? - DONE
  // Definietly will need the ability to add a location - DONE
  // will probably be better to have a database model to handle these things - DONE
  // Currently the locations const is static so if more places are added someone will have to manually add locations in multiple files and then rebuild the app etc... - DONE


  // 1 - Get the current locations - DONE
  // 2 - Add new location form - DONE
  // 3 - how will adding new members be handled? - DONE
  // 4 - What about what locations a user has access to?? - DONE

  // /location/add-item - DONE
  // /location/get-locations - DONE


  // User roles via AD groups

    // Will have a group in AD called CA01, CA02, CA03 01 is high level 03 is read only
    // Will load the members into state? Or just make a newtwork request each time? i think inot state so the data can be used across each page easily
    // Where will the mebers data be needed? 
      // 1 - The admin page
      // 2 - when a user logs in 
      // 3 - When viewing awards diaries

  // Users in state:
    // When the app loads get all the members from the LDAP api's - DONE
    // Filter / build the members in the db. Check the length of mebers returned from LDAP API's against the result from the db. if different either add or remove only the differnt user? - DONE
    // Once rebuilt load the app - ????
    // Set the memebers data into state to be used across the app - DONE
    // Then in the admin page the table will be populated by the memeber array in the store - DONE
    // Will also need a way to determine who is the logged in user -> serparte Authentication feature and state object "auth"               TODO
    // updating the values in the admin page will update the values in the database -> wont effect the LDAP groups - DONE

  // Locations for the members in the users table
    // If all display "All" or display the location count - DONE
    // When cell clicked display a dropdown - DONE
    // Needs to be editable - DONE
    
  // Ability for Admins / and certain users to be able to add / edit the yearly totals for the summary page etc.
    //  - Be able to set the Annual target for each branch / location
    //  - Be able to set the Annual target for each branch / location for the tenders submitted
    // locations? 




  // Will need to amend the awardsDiary comp to display either awwards data or submitted tenders data, same layout just differenet data and calcualtions, because od the calculations might be easier to copy and amend the awardDiaryTable comp

    