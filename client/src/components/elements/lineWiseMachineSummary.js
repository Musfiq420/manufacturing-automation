import { Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomCards from '../common/customCards';
import { H4 } from '../common/customTexts';
import DropDownList from '../common/dropDownList';

const LineWiseMachineSummary = () => {
  const [line, setLine] = useState('');

  const handleChange = (event) => {
    setLine(event.target.value);
  };
  const machinedb = useSelector((state) => state.machinedb.lineWise);

  useEffect(() => {
    console.log(machinedb)
  }, [])
  

  return (
    <div>
      <H4>Line Wise Machines</H4>
      <Container sx={{display:'flex', justifyContent:'start', flexWrap:'wrap'}}>
      {machinedb?<DropDownList title="Line no" handleChange={handleChange} value={line} data={Object.keys(machinedb)} />:null}
     
      </Container>
      {machinedb&&line?<CustomCards data={machinedb[line]} />:<Container sx={{display:'flex', justifyContent:'start'}} ><p>Select line first</p></Container>}
    </div>
  )
}

export default LineWiseMachineSummary