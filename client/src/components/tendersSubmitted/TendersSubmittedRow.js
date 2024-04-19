import React, { useState } from 'react';
import TendersSubmittedCell from './TendersSubmittedCell';
import { useSelector } from 'react-redux';
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from '../../utils/financialTotals';

const TendersSubmittedRow = ({ data }) => {

    console.log('data = ', data);
    
    const targets = useSelector(state => state.awards.tendersSubmittedTargets);

    const cumalitiveTotals = () => {
        const sum = data.items.reduce((total, target) => parseInt(total) + parseInt(target.value), 0);
        return sum;
    }

    const extractedTendersTargets = () => {
        const foundTarget = targets.find(target => target.location === data.location);

        if(foundTarget){
            return foundTarget.targetValue;
        }
        return "0";
    }

    const targetPercentageAcheived = generateTargetAcheivedPercentage(extractedTendersTargets() * 12, cumalitiveTotals());
    // const targetPercentageAcheivedColour = parseFloat(targetPercentageAcheived) >= 100 ? COLOURS.GREEN : COLOURS.RED;

    return (
        <tr>
            <td>{data.location}</td>
            {
                data.items.map((item, i) => {
                    return (
                       <TendersSubmittedCell key={i} item={{...item, location: data.location, _id: data._id}}/>
                    )
                })
            }
            {/* Cumalitive Column */}
            <td>£{cumalitiveTotals().toLocaleString()}</td>

            {/* Monthly Target Column */}
            <td>£{extractedTendersTargets()}</td>

            {/* Yearly Target Column */}
            <td>£{(extractedTendersTargets() * 12).toLocaleString()}</td>

            {/* Target to Data Column*/}
            <td>£{generateTargetAmountToDate((extractedTendersTargets()  * 12), cumalitiveTotals()).toLocaleString()}</td>

            {/* Target Acheived Column */}
            <td>{targetPercentageAcheived}%</td>
        </tr>
    )
}

export default TendersSubmittedRow;