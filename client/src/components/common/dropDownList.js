import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const DropDownList = ({title, value, handleChange, data}) => {
  return (
    <>
      <FormControl variant="filled" sx={{  display:'flex', alignSelf:'start' }}>
        {/* <InputLabel sx={{color:grey[300],}} id="demo-simple-select-outlined-label">{title}</InputLabel> */}
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Age"
          sx={{backgroundColor:'white',fontSize:'20px', padding:'5px', border:1, borderColor: grey[200], borderRadius:'5px'}}
          disableUnderline
          
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