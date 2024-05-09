import React, { useState } from 'react';
import TendersSubmittedCell from './TendersSubmittedCell';
import { useSelector } from 'react-redux';
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from '../../utils/financialTotals';
import { COLOURS } from '../../utils/constants';

const TendersSubmittedRow = ({ data }) => {
    const tenders = useSelector(state => state.tender);
    const targets = useSelector(state => state.awards.tendersSubmittedTargets);
    const cumalitiveTotal = tenders.cumalitiveTotals.find(total => total.location === data.location).sum;

    const extractedTendersTargets = () => {

        // console.log('targets for tender submitted = ', targets);
        const foundTarget = targets.find(target => target.location === data.location);

        if(foundTarget){
            return foundTarget.targetValue;
        }
        return "0";
    }

    const targetPercentageAcheived = generateTargetAcheivedPercentage(extractedTendersTargets() * 12, cumalitiveTotal);
    const targetPercentageAcheivedColour = parseFloat(targetPercentageAcheived) >= 100 ? COLOURS.GREEN : COLOURS.RED;

    return (
        <tr>
            <td>{data.location}</td>
            {
                data.items.map((item, i) => {
                    return (
                       <TendersSubmittedCell key={i} item={{...item, location: data.location, _id: data._id, montlyTarget: extractedTendersTargets()}}/>
                    )
                })
            }
            {/* Cumalitive Column */}
            <td>£{cumalitiveTotal.toLocaleString()}</td>

            {/* Monthly Target Column */}
            <td>£{extractedTendersTargets().toLocaleString()}</td>

            {/* Yearly Target Column */}
            <td>£{(extractedTendersTargets() * 12).toLocaleString()}</td>

            {/* Target to Data Column*/}
            <td>£{generateTargetAmountToDate((extractedTendersTargets()  * 12), cumalitiveTotal).toLocaleString()}</td>

            {/* Target Acheived Column */}
            <td style={{color: targetPercentageAcheivedColour}}>{targetPercentageAcheived}%</td>
        </tr>
    )
}

export default TendersSubmittedRow;