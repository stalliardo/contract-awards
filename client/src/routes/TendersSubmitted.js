import React, { useEffect } from 'react'
import TendersSubmittedTable from '../components/tendersSubmitted/TendersSubmittedTable';
import Spinner from '../components/spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getTenders } from '../redux/features/tenders/tenderThunk';
import { fetchData } from '../redux/features/awards/awardsThunks';


const TendersSubmitted = () => {

  // TODO get the tenders data, load into state and only get if not in state

  const dispatch = useDispatch();

  const originalLocations = useSelector((state) => state.location.data);
  const tenders = useSelector(state => state.tender);
  const awards = useSelector(state => state.awards);


  useEffect(() => {
    if(!tenders.data || !tenders.data.length) {
      console.log('effect called getting data.....');
      dispatch(getTenders()).then(() => {
        console.log('then called from tenders');
        // check if we need to get awards data also

        if(!awards.targets.length) {
          console.log('getting awards data');
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


// What happens when a new lcoation is added?

// Display defaults and real data togheter

// for each location
  // for each month
    // get the data if any, is there any data for this locaiton / month? if yes
      // disply the day
    // if no
      // display the default 0
// This was when a new location is added the table wont break but just have a row of empty cells
