import React from 'react'
import AwardsTableRow from '../table/AwardsTableRow'
import { getCoreTotal } from '../../../utils/financialTotals';

const AwardsItem = ({awardItem}) => {
    const coreSum = getCoreTotal(awardItem.items);

    console.log('awards item passed in = ', awardItem);

    return (
        <div className='awards-table-container'>
            <h1>Month: {awardItem.month}</h1>
            <div className='awards-page-table-container'>
                {
                    awardItem.items.length ?
                        <table id="awards-table" className='awards-form-table'>
                            <thead>
                                <tr>
                                    <th className='contracts-column'>Contract No.</th>
                                    <th>Project</th>
                                    <th>Programme</th>
                                    <th>Contractor</th>
                                    <th>Region</th>
                                    <th>Core</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    awardItem.items && awardItem.items.length ?
                                        awardItem.items.map((data) => (
                                            <AwardsTableRow data={data} key={data._id} actionsRequired={false}/>
                                        ))
                                        : null
                                }
                               
                                <tr className='last-row'>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className='last-cell'>Total: £{coreSum.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                        : <div className='awards-table-no-data-container'>
                            Nothing found TODO
                        </div>
                }
            </div>

        </div>
    )
}

export default AwardsItem