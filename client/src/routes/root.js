import React, { useEffect, useState } from 'react'
import AwardsTable from '../components/awards/table/AwardsTable';
import { getTokenFromStorage } from '../utils/localStorageUtils';
import { verifyToken } from '../redux/features/auth/authThunk';
import { setIsAuthenticated, setLoading } from '../redux/features/auth/authSlice';
import { clearAuthenticatedUserData, setLoading as setUsersLoading } from '../redux/features/users/usersSlice';
import { fetchUsers } from '../redux/features/users/usersThunk';
// import Spinner from '../../components/spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import { setLocationsInSlice } from '../redux/features/locations/locationSlice';

const Root = () => {
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);

  const [hasLoaded, setHasLoaded] = useState(!auth.loading || !users.loading);

  useEffect(() => {
    console.log('%c\n1: App entry called ', "color:red");

    const token = getTokenFromStorage();
    if (token && !users.authenticatedUser._id) {
      console.log('top if called');
      dispatch(verifyToken(token)).unwrap().then(response => {
        const { status } = response;
        const { user } = response.data;

        if (status === 200) {
          dispatch(fetchUsers(user.username)).unwrap().then((res) => {
            const { locations:locationsLocal } = res;

            console.log('locationsLocal = ', locationsLocal);

            dispatch(setLocationsInSlice(locationsLocal));
            dispatch(setIsAuthenticated(true));
          })
        }
      }).catch(() => {
        dispatch(setIsAuthenticated(false));
        dispatch(clearAuthenticatedUserData());
        navigate("/auth");
      })
    } else if (token && users.authenticatedUser._id) {
      console.log('else 1 called');


      if (users.authenticatedUser.locations.length) {
        console.log('setting locations');
        const sortedLocations = [...users.authenticatedUser.locations].sort();
        setLocations(sortedLocations);
      } else {
        console.log('no locations');
      }
      dispatch(setLoading(false));
      dispatch(setUsersLoading(false));
      navigate("/");
    } else {
      console.log('bottom erkse calked');
      navigate("/auth");

    }

  }, [auth.isAuthenticated, users.authenticatedUser])

  if (hasLoaded && users.authenticatedUser._id) {
    console.log('has loaded called');
    return (
      <div className='root-page-awards-table'>
        {
          locations.length > 0 ? <AwardsTable locations={locations} />
            : <div className='root-page-no-locations-message'>
              <p>It seems you haven't been assigned to any locations yet. Only directors, regional directors and site admins can allocate locations. Please reach out to the appropriate person for further assistance.</p>
            </div>
        }
      </div>
    )
  } else {
    return <div className='spinner-container'><Spinner classes="page"/></div>
  }
}

export default Root;