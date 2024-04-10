import React from 'react'

const AwardsSummaryUKCoreTotalsRow = ({data}) => {
  return (
    <td>£{data.ukCoreTotal.toLocaleString()}</td>
  )
}

export default AwardsSummaryUKCoreTotalsRow