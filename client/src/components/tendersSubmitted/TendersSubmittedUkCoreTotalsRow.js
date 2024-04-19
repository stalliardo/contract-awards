import React from 'react'
import { useSelector } from 'react-redux'

const TendersSubmittedUkCoreTotalsRow = () => {
    const tenders = useSelector(state => state.tender);
    const awardsData = useSelector(state => state.awards);
    const monthlyTargetTotal = awardsData.tendersSubmittedTargets.reduce((prev, current) => parseInt(prev) + parseInt(current.targetValue), 0);

    return (
        // <td style={{color: data.ukCoreTotal >= ukTargetTotal ? COLOURS.GREEN : COLOURS.RED}}>
        <tr className='bold-cells'>
            <td>UK Core Total</td>
            {
                tenders.ukCoreTotals.uk.map((total, i) => {
                    return <td key={i}>£{(total.ukCoreTotal).toLocaleString()}</td>
                })
            }
         <td>£{(tenders.ukCumalitiveTotal).toLocaleString()}</td>
         <td>£{monthlyTargetTotal.toLocaleString()}</td>
        </tr>
      )
}

export default TendersSubmittedUkCoreTotalsRow