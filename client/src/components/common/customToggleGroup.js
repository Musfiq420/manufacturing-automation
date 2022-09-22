import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'

const CustomToggleGroup = ({value, handleChange, data}) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="text alignment"
    >
      {data.map((e) => {
        return (<ToggleButton value={e} aria-label="left aligned">
         {e}
        </ToggleButton>)
      })}
      
    </ToggleButtonGroup>
  )
}

export default CustomToggleGroup