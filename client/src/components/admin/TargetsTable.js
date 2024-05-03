import React from 'react'
import TargetsTableRow from './TargetsTableRow';
import { TARGET_CATEGORIES } from '../../utils/constants';

const TargetsTable = ({ locations, tableTitle, targetData, data, targetCategory }) => {

    return (
        <div className='awards-table-container'>
            <div className='awards-page-table-container'>
                <div className='awards-page-title-and-button admin'>
                    <h3>{tableTitle}</h3>
                </div>
                {
                    data.length ?
                        <table id="awards-table" className='awards-form-table'>
                            <thead>
                                <tr>
                                    <th>Location</th>
                                    <th>Target (Monthly)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.length ?
                                        data.map((item, index) => (
                                            <TargetsTableRow location={item.locationData} key={index} target={targetCategory === TARGET_CATEGORIES.CONTRACT_AWARDS ? item.awardsData : item.tendersData} targetCategory={targetCategory}/>
                                        ))
                                        : null
                                }

                            </tbody>
                        </table>
                        : <div className='awards-table-no-data-container'>
                            <h3>No locations Found</h3>

                        </div>
                }
            </div>
        </div>
    )
}

export default TargetsTable