import React from 'react'

const AwardsSummarySpecialsTotalsRow = ({data}) => {
  return (
    <td>£{data.ukCoreTotal.toLocaleString()}</td>
  )
}

export default AwardsSummarySpecialsTotalsRow