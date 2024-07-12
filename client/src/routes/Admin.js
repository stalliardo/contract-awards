import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './admin.css';
import Spinner from '../components/spinner/Spinner';
import UsersTable from '../components/admin/UsersTable';
import TargetsTable from '../components/admin/TargetsTable';
import { ROLES, TARGET_CATEGORIES } from '../utils/constants';
import { useSelector } from 'react-redux';
import { removeSlashFromyearString } from '../utils/stringUtils';

const Admin = () => {
  const [location, setLocation] = useState("");
  const [locationsRetrieved, setLocationsRetrieved] = useState([]);
  const [targetDataRetrieved, setTargetDataRetrieved] = useState([]);
  const [targetAndLocationData, setTargetAndLocationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddNewLocation, setShowAddNewLocation] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  const navigate = useNavigate();

  const authenticatedUser = useSelector(state => state.users.authenticatedUser);
  const selectedFinancialYear = useSelector(state => state.users.selectedFinancialYear);
  const originalLocations = useSelector(state => state.location.data);

  const buildData = (locations, targets) => {
    const formattedTargetData = [];

    locations.forEach((location) => {
      const targetDataToAdd = targets.filter(target => target.location === location.name);
      let data = { locationData: { ...location } };
      if (targetDataToAdd.length) {
        targetDataToAdd.forEach((dataItem) => {
          if (dataItem.category === TARGET_CATEGORIES.CONTRACT_AWARDS) {
            data.awardsData = dataItem
          }
          if (dataItem.category === TARGET_CATEGORIES.TENDERS_SUBMITTED) {
            data.tendersData = dataItem
          }
        })
        formattedTargetData.push(data);
      } else {
        formattedTargetData.push(data);
      }
    })

    setTargetAndLocationData(formattedTargetData);
  }

  useEffect(() => {
    if(authenticatedUser.role !== ROLES.CA01) {
      navigate("/");
    }

    setIsLoading(true);
    if (authenticatedUser.role === ROLES.CA01 || authenticatedUser.role === ROLES.CA02) {
      setLocationsRetrieved(originalLocations);
      axios.get(`/api/targets/?year=${removeSlashFromyearString(selectedFinancialYear)}`).then((res) => {
        setTargetDataRetrieved(res.data);
        buildData(originalLocations, res.data);
      }).catch((error) => {
        console.log('Error getting targets. Error: ', error);
      }).finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 750);
      })
    } else {
      navigate("/");
    }
  }, [selectedFinancialYear])

  useEffect(() => {
    setSaveButtonDisabled(location.length < 1);
  }, [location]);

  const onAddLocation = () => {
    setIsSaving(true);

    axios.post("/api/location/add-item", { name: location }).then((response) => {
      const newArray = [...locationsRetrieved];
      newArray.push({ name: location });

      setLocationsRetrieved(newArray);

      if (authenticatedUser.role === ROLES.CA01) {
        axios.put(`/api/users/${authenticatedUser._id}/locations`).then(() => {
          onCloseAddLocationModal();
          buildData(newArray, targetDataRetrieved);
        })
      }

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
      <h3 id="admin-page-top-h3">Available Locations and Assigned Users</h3>
      {
        isLoading ? <div className='spinner-container-page'><Spinner classes="page" /></div> :
          <>
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
                {/* Disabled Add Loction button as if missued could cause havoc in the database */}
                {/* {authenticatedUser.role === ROLES.CA01 ?
                  <button onClick={() => setShowAddNewLocation(true)}>Add Location</button>
                  : null
                } */}
                {
                  showAddNewLocation ?
                    <div className='blackout-overlay'>
                      <div className='admin-modal'>
                        <h3>Add Location</h3>
                        <p>If the location doesn't display right away in either the awards or tenders table, you may need to refresh the page.</p>
                        <input type='text' value={location} onChange={handleChange} />
                        <div className='admin-modal-buttons'>
                          <button className='green' onClick={onAddLocation} disabled={saveButtonDisabled}>
                            {isSaving ? <div className='spinner-button'><Spinner classes="button" /></div> : "Save"}
                          </button>
                          <button onClick={onCloseAddLocationModal}>Close</button>
                        </div>
                      </div>
                    </div>
                    : null
                }
              </div>
              <div className='admin-members-container'>
                <UsersTable availableLocations={locationsRetrieved} />
              </div>
            </div>

            {
              authenticatedUser.role === ROLES.CA01 ?
                <div>
                  <h3 id="targets-h3">Awards and Tender Targets</h3>
                  <div className='admin-targets-container'>
                    <div className='admin-targets-flex'>
                      <div className='admin-targets-flex-left'>
                        <TargetsTable tableTitle="Contract Awards Targets" data={targetAndLocationData} targetData={targetAndLocationData.awardsData} targetCategory={TARGET_CATEGORIES.CONTRACT_AWARDS} />
                      </div>
                      <div className='admin-targets-flex-right'>
                        <TargetsTable tableTitle="Submitted Tenders Targets" data={targetAndLocationData} targetData={targetAndLocationData.tendersData} targetCategory={TARGET_CATEGORIES.TENDERS_SUBMITTED} />
                      </div>
                    </div>
                  </div>
                </div>
                : null
            }

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
      }
    </div>
  )
}

export default Admin;