import React, { useEffect } from 'react'
import TendersSubmittedTable from '../components/tendersSubmitted/TendersSubmittedTable';
import Spinner from '../components/spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getTenders } from '../redux/features/tenders/tenderThunk';
import { fetchData } from '../redux/features/awards/awardsThunks';

const TendersSubmitted = () => {
  const dispatch = useDispatch();

  const originalLocations = useSelector((state) => state.location.data);
  const tenders = useSelector(state => state.tender);
  const awards = useSelector(state => state.awards);

  useEffect(() => {
    if(!tenders.data || !tenders.data.length) {
      dispatch(getTenders()).then(() => {
        if(!awards.targets.length) {
          dispatch(fetchData(originalLocations));
        }
      })
    }
  }, [])

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