import React from 'react'
import { COLOURS } from '../../../utils/constants';

const AwardsSummaryUKCoreTotalsRow = ({ data, ukTargetTotal }) => {
  return (
    <td style={{color: data.ukCoreTotal >= ukTargetTotal ? COLOURS.GREEN : COLOURS.RED}}>
      £{data.ukCoreTotal.toLocaleString()}
    </td>
  )
}

export default AwardsSummaryUKCoreTotalsRow