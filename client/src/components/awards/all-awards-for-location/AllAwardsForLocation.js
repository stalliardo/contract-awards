import React from 'react';
import './allAwardsForLocation.css'
import AwardsItem from './AwardsItem';

const AllAwardsForLocation = ({data}) => {
  return (
    <div className='all-awards-container'>
        {
          data.map((award, index) => {
            return <AwardsItem awardItem={award} key={index * 15}/>
          })
        }

    </div>
  )
}

export default AllAwardsForLocation