import React from 'react';
import { Container, Paper } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import CustomCards from '../common/customCards';


const MachineSummary = () => {

    const mcType = useSelector((state) => state.machinedb.typeWise);

  return (
    <div>
        <h3>Machine Summary</h3>
        {mcType?<CustomCards data={mcType} />:<p>no M/C</p>}
    </div>
  )
}

export default MachineSummary