import React, { useEffect, useState } from 'react'
import TendersSubmittedTable from '../components/tendersSubmitted/TendersSubmittedTable';
import Spinner from '../components/spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getTenders } from '../redux/features/tenders/tenderThunk';
import { fetchData } from '../redux/features/awards/awardsThunks';
import {useNavigate} from 'react-router-dom';
import { removeSlashFromyearString } from '../utils/stringUtils';

const TendersSubmitted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const originalLocations = useSelector((state) => state.location.data);
  const tenders = useSelector(state => state.tender);
  const awards = useSelector(state => state.awards);
  const authenticatedUser = useSelector(state => state.users.authenticatedUser);
  const selectedFinancialYear = useSelector(state => state.users.selectedFinancialYear);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(!tenders.data || !tenders.data.length) {
      if(authenticatedUser.locations){
        dispatch(getTenders({authenticatedUser, selectedFinancialYear})).then(() => {
          if(!awards.targets.length) {
            console.log('fetch called');
            dispatch(fetchData({locationData: originalLocations, authenticatedUser, selectedFinancialYear: removeSlashFromyearString(selectedFinancialYear)}));
          }
        })
      } else {
        navigate("/");
      }
    }
    if(tenders.data.length > 0) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [tenders, awards])

  if(!tenders.loading && !awards.loading && !isLoading) {
    return (
        <TendersSubmittedTable data={tenders.data}/>
    )
  } else {
    return <div style={{marginTop: "150px"}} className='spinner-container'><Spinner text="Generating tenders table..." classes="page"/></div>
  }
}

export default TendersSubmitted;