import React from 'react'
import DateRange from '../../DateRange'

const Dates = ({ dates, value, onChange }) => {
  return (
    <DateRange
      items={dates}
      selectedItems={value}
      onChange={onChange('dates')}
    />
  )
}

export default Dates
