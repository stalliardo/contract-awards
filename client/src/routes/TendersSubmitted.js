import React, { useEffect } from 'react'
import TendersSubmittedTable from '../components/tendersSubmitted/TendersSubmittedTable';
import Spinner from '../components/spinner/Spinner';


const TendersSubmitted = () => {

  // TODO get the tenders data, load into state and only get if not in state
  const dummyData = true;

  // useEffect(() => {

  // }, [])

  if(dummyData) {
    return (
      <div className='awards-page-container'>
        <TendersSubmittedTable />
      </div>
    )
  } else {
    return <div style={{marginTop: "150px"}} className='spinner-container'><Spinner text="Generating tenders table..." classes="page"/></div>
  }
}

export default TendersSubmitted;