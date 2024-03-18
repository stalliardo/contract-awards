import React from 'react'
import './spinner.css';

const Spinner = ({classes, styles}) => {
   return <div className={`loader ${classes}`} style={styles}></div>
}

export default Spinner;