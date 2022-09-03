import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const DropDownList = ({title, value, handleChange, data}) => {
  return (
    <>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 120, display:'flex', alignSelf:'start' }}>
        <InputLabel id="demo-simple-select-outlined-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.map((element) => {
           return (<MenuItem value={element}>{element}</MenuItem>)
          })}
        </Select>
      </FormControl>
    </>
  )
}

export default DropDownList