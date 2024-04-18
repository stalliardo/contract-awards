import React, { useState } from 'react';
import { getMonthsInFinancialOrder } from '../../utils/DateUtils';

const monthsInFinancialOrder = getMonthsInFinancialOrder();


const TendersSubmittedRow = ({ items }) => {
    const onItemClicked = (item) => {
        // Bubble up and display the modal
        console.log('item = ', item);
    }

    return (
        // <tr>
        //     {
        //         items.map((item, index) => {
        //             return  <td key={index} onClick={() => onItemClicked(item)}>{item.value}</td>
        //         })
        //     }
        // </tr>
        <tr>
            <td></td>
            {
                monthsInFinancialOrder.map((month, i) => {
                    return <td key={i}>{month}</td>
                })
            }
        </tr>
    )
}

export default TendersSubmittedRow;


// data needs to generated higher up and passed down otherwise will need to loop the array evert=y time for every cell as appose to doing it oncee and genberating data
// So, if no data skip and do the above
// else,
    // loop locations
        // loop months

        const exampleDataResponse = [
            {
                location: "Avonmouth",
                items: [
                    { month: "January", value: 1000 },
                    { month: "February", value: 500 },
                    { month: "March", value: 300 }
                ]
            },
            {
                location: "Basingstoke",
                items: [
                    { month: "January", value: 1000 },
                    { month: "February", value: 500 },
                    { month: "March", value: 300 }
                ]
            },   
        ]

       

