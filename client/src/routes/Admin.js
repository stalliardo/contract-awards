import React from 'react'
import './admin.css';

const Admin = () => {
  return (
    <div className='admin-page-container'>
      <div className='admin-top-container'>
        <div className='admin-current-locations-container'>
          <h3>Current Locations:</h3>
          <ul>
            <ol>Basingstoke</ol>
            <ol>Basingstoke</ol>
            <ol>Basingstoke</ol>
            <ol>Basingstoke</ol>
            <ol>Basingstoke</ol>
            <ol>Basingstoke</ol>
            <ol>Basingstoke</ol>
            <ol>Basingstoke</ol>
            <ol>Basingstoke</ol>
          </ul>
        </div>
      </div>
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