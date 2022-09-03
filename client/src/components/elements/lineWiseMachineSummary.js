import { Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomCards from '../common/customCards';
import DropDownList from '../common/dropDownList';

const LineWiseMachineSummary = () => {
  const [line, setLine] = useState('');

  const handleChange = (event) => {
    setLine(event.target.value);
  };
  const machinedb = useSelector((state) => state.machinedb.lineWise);

  return (
    <div>
      <h3>Line Wise Machines</h3>
      <Container sx={{display:'flex', justifyContent:'start', flexWrap:'wrap'}}>
      <DropDownList title="Line no" handleChange={handleChange} value={line} data={Object.keys(machinedb)} />
      {/* <FormControl variant="outlined" sx={{ m: 1, minWidth: 120, display:'flex', alignSelf:'start' }}>
        <InputLabel id="demo-simple-select-outlined-label">Line no.</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-standard"
          value={line}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {machinedb?Object.keys(machinedb).map((element) => {
           return (<MenuItem value={element}>{element}</MenuItem>)
          }):null}
        </Select>
      </FormControl> */}
      </Container>
      {machinedb[line]?<CustomCards data={machinedb[line]} />:<Container sx={{display:'flex', justifyContent:'start'}} ><p>Select line first</p></Container>}
    </div>
  )
}

export default LineWiseMachineSummary