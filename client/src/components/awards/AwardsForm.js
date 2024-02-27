import React from 'react'
import './awards.css';
import SelectMenu from '../selectMenu/SelectMenu';

// TODO - refactor so that the table rows an be edited and deleted

const AwardsForm = () => {
    return (
        <div className='awards-page-container'>
            <div className='awards-select-menu-container'>
                <SelectMenu placeholder="Dec-23" />
            </div>
            <div className='awards-page-table-container'>
                <div className='awards-page-title-and-button'>
                    <h3>Basingstoke Dec-23</h3>

                    <button>
                        Add Row
                    </button>

                </div>
                <table id="awards-table">
                    <thead>

                        <tr>
                            <th>Contract No.</th>
                            <th>Project</th>
                            <th>Programme</th>
                            <th>Contractor</th>
                            <th>Region</th>
                            <th>Core</th>
                            <th colSpan="2" style={{ textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>83211</td>
                            <td>Twickenham</td>
                            <td>38 Weeks</td>
                            <td>FK Group</td>
                            <td>BAS</td>
                            <td>£22,999</td>
                            <td className='table-actions-cell'>
                                <button className='table-actions-cell edit'>Edit</button>
                            </td>
                            <td className='table-actions-cell'>
                                <button className='table-actions-cell delete'>Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>83921</td>
                            <td>Botanical Gardens</td>
                            <td>21 Weeks</td>
                            <td>Careys</td>
                            <td>BAS</td>
                            <td>£232,999</td>
                            <td className='table-actions-cell'>
                                <button className='table-actions-cell edit'>Edit</button>
                            </td>
                            <td className='table-actions-cell'>
                                <button className='table-actions-cell delete'>Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>53921</td>
                            <td>Duddeston Compound</td>
                            <td>54 Weeks</td>
                            <td>Lendlease</td>
                            <td>BAS</td>
                            <td>£19,999</td>
                            <td className='table-actions-cell'>
                                <button className='table-actions-cell edit'>Edit</button>
                            </td>
                            <td className='table-actions-cell'>
                                <button className='table-actions-cell delete'>Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>06321</td>
                            <td>Pennywell Phase 4</td>
                            <td>43 Weeks</td>
                            <td>FK Group</td>
                            <td>BAS</td>
                            <td>£87,500</td>
                            <td className='table-actions-cell'>
                                <button className='table-actions-cell edit'>Edit</button>
                            </td>
                            <td className='table-actions-cell'>
                                <button className='table-actions-cell delete'>Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>06421</td>
                            <td>Project Thrive</td>
                            <td>76 Weeks</td>
                            <td>Lendlease</td>
                            <td>BAS</td>
                            <td>£22,999</td>
                            <td className='table-actions-cell'>
                                <button className='table-actions-cell edit'>Edit</button>
                            </td>
                            <td className='table-actions-cell'>
                                <button className='table-actions-cell delete'>Delete</button>
                            </td>
                        </tr>
                        <tr className='last-row'>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='last-cell'>Total: £100,000</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default AwardsForm