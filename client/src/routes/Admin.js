import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './admin.css';
import Spinner from '../components/spinner/Spinner';

const Admin = () => {

  const [location, setLocation] = useState("");
  const [locationsRetrieved, setLocationsRetrieved] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    // Get locations:
    axios.get("/api/location/get-locations").then((response) => {
      setLocationsRetrieved(response.data);
    }).catch((error) => {
      console.log('Error getting Locations. Error: ', error);
    }).finally(() => {
      setIsLoading(false);
    })
  }, [])


  const onAddLocation = () => {
    axios.post("/api/location/add-item", {name: "M&E"}).then((response) => {
      console.log('Response from add llcoation = ', response);
    }).catch((error) => {
      console.log('Error adding location. Error: ', error);
    })
  }

  return (
    <div className='admin-page-container'>
      {
        isLoading ? <div className='spinner-container-page'><Spinner classes="page" /></div> :
        <div className='admin-top-container'>
        <div className='admin-current-locations-container'>
          <button onClick={onAddLocation}>Add location</button>
          <h3>Current Locations:</h3>
          <ul>
            {
              locationsRetrieved.map((location, index) => {
                return <ol key={index}>{location.name}</ol>
              })
            }
          </ul>
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