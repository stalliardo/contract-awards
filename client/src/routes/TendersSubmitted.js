import React, { useEffect } from 'react'
import TendersSubmittedTable from '../components/tendersSubmitted/TendersSubmittedTable';
import Spinner from '../components/spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getTenders } from '../redux/features/tenders/tenderThunk';
import { fetchData } from '../redux/features/awards/awardsThunks';
import {useNavigate} from 'react-router-dom';

const TendersSubmitted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const originalLocations = useSelector((state) => state.location.data);
  const tenders = useSelector(state => state.tender);
  const awards = useSelector(state => state.awards);
  const authenticatedUser = useSelector(state => state.users.authenticatedUser);

  useEffect(() => {
    if(!tenders.data || !tenders.data.length) {
      if(authenticatedUser.locations){
        dispatch(getTenders(authenticatedUser)).then(() => {
          if(!awards.targets.length) {
            dispatch(fetchData({locationData: originalLocations, authenticatedUser}));
          }
        })
      } else {
        navigate("/");
      }
    }
  }, [tenders, awards])

  if(!tenders.loading && !awards.loading) {
    return (
      <div className='awards-page-container'>
        <TendersSubmittedTable data={tenders.data}/>
      </div>
    )
  } else {
    return <div style={{marginTop: "150px"}} className='spinner-container'><Spinner text="Generating tenders table..." classes="page"/></div>
  }
}

export default TendersSubmitted;