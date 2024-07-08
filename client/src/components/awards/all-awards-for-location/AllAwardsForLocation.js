import React from 'react';
import './allAwardsForLocation.css'
import AwardsItem from './AwardsItem';

const AllAwardsForLocation = ({data}) => {

  console.log('data = ', data);
  return (
    <div className='all-awards-container'>
        {
          data.map((award) => {
            return <AwardsItem awardItem={award}/>
          })
        }

    </div>
  )
}

export default AllAwardsForLocation