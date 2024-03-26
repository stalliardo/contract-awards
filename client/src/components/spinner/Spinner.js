import React from 'react'
import './spinner.css';

const Spinner = ({ classes, styles, text }) => {
   return (
      <div className='spinner-outer-container'>
         <div className={`loader ${classes} ${text ? "with-text" : ""}`} style={styles}></div>
         <h2>{text}</h2>
      </div>
   )
}

export default Spinner;