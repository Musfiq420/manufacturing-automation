import React, { useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import CustomCards from '../common/customCards';
import EnhancedTable from '../common/dataTable';


const MachineSummary = () => {

  const mcType = useSelector((state) => state.machinedb.typeWise);

  useEffect(() => {
    console.log(mcType)
  }, [])
  


  return (
    <div>
        <h3>Machine Summary</h3>
        <EnhancedTable />
    </div>
  )
}

export default MachineSummary