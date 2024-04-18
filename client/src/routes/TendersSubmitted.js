import React, { useEffect } from 'react'
import TendersSubmittedTable from '../components/tendersSubmitted/TendersSubmittedTable';
import Spinner from '../components/spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getTenders } from '../redux/features/tenders/tenderThunk';


const TendersSubmitted = () => {

  // TODO get the tenders data, load into state and only get if not in state

  const dispatch = useDispatch();
  const tenders = useSelector(state => state.tender);

  useEffect(() => {
    if(!tenders.data || !tenders.data.length) {
      console.log('effect called getting data.....');
      dispatch(getTenders())
    }
  }, [])

  if(!tenders.loading) {
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


// What happens when a new lcoation is added?

// Display defaults and real data togheter

// for each location
  // for each month
    // get the data if any, is there any data for this locaiton / month? if yes
      // disply the day
    // if no
      // display the default 0
// This was when a new location is added the table wont break but just have a row of empty cells
