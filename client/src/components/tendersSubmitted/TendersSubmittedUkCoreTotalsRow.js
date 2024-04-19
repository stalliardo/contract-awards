import React from 'react'
import { useSelector } from 'react-redux'
import { generateTargetAcheivedPercentage, generateTargetAmountToDate } from '../../utils/financialTotals';
import { COLOURS } from '../../utils/constants';

const TendersSubmittedUkCoreTotalsRow = () => {
    const tenders = useSelector(state => state.tender);
    const awardsData = useSelector(state => state.awards);
    
    const formattedTargets = awardsData.tendersSubmittedTargets.filter(target => target.location !== "Special Projects" && target.location !== "M&E");
    const monthlyTargetTotal = formattedTargets.reduce((prev, current) => parseInt(prev) + parseInt(current.targetValue), 0);
    const targetPercentageAcheived = generateTargetAcheivedPercentage(monthlyTargetTotal * 12, tenders.ukCumalitiveTotal);
    const targetPercentageAcheivedColour = parseFloat(targetPercentageAcheived) >= 100 ? COLOURS.GREEN : COLOURS.RED;

    return (
        <tr className='bold-cells'>
            <td>UK Core Total</td>
            {
                tenders.ukCoreTotals.uk.map((total, i) => {
                    return <td style={{color: total.ukCoreTotal >= monthlyTargetTotal ? COLOURS.GREEN : COLOURS.RED}} key={i}>£{(total.ukCoreTotal).toLocaleString()}</td>
                })
            }
            <td>£{(tenders.ukCumalitiveTotal).toLocaleString()}</td>
            <td>£{monthlyTargetTotal.toLocaleString()}</td>
            <td>£{(monthlyTargetTotal * 12).toLocaleString()}</td>
            <td>£{generateTargetAmountToDate((monthlyTargetTotal * 12), tenders.ukCumalitiveTotal).toLocaleString()}</td>
            <td style={{color: targetPercentageAcheivedColour}}>{targetPercentageAcheived}%</td>
        </tr>
    )
}

export default TendersSubmittedUkCoreTotalsRow;