import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './admin.css';
import Spinner from '../components/spinner/Spinner';

const Admin = () => {
  const [location, setLocation] = useState("");
  const [locationsRetrieved, setLocationsRetrieved] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddNewLocation, setShowAddNewLocation] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  useEffect(() => {
    axios.get("/api/location/get-locations").then((response) => {
      setLocationsRetrieved(response.data);
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

  return (
    <div className='admin-page-container'>
      <h1>Admin / Director Page</h1>
      {
        isLoading ? <div className='spinner-container-page'><Spinner classes="page" /></div> :
        <div className='admin-top-container'>
        <div className='admin-current-locations-container'>
            <h3>Current Locations:</h3>
            <ul>
              {
                locationsRetrieved.map((location, index) => {
                  return <ol key={index}>{location.name}</ol>
                })
              }
            </ul>

            <button onClick={() => setShowAddNewLocation(true)}>Add Location</button>
            {
              showAddNewLocation ? <div className='admin-add-location'>
              <input type='text' value={location} onChange={handleChange}/>
              <button className='green' onClick={onAddLocation} disabled={saveButtonDisabled}>
                {isSaving ? <div className='spinner-button'><Spinner classes="button"/></div> : "Save"}
              </button>
            </div> : null
            }
        </div>
        <div className='admin-members-container'>
          <h3>Members / Users:</h3>
        </div>
      </div>
      }
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


  // Need the ability to add / remove locations? 
  // Definietly will need the ability to add a location
  // will probably be better to have a database model to handle these things
  // Currently the locations const is static so if more places are added someone will have to manually add locations in multiple files and then rebuild the app etc...


  // 1 - Get the current locations
  // 2 - Add new location form

  // /location/add-item
  // /location/get-locations