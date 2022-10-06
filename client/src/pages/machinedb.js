import { Container, Divider, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import LastUpdate from '../core/lastUpdate'
import { getMachineDb } from '../store/machineDbSlice'
import store from '../store/str'
import LineWiseMachineSummary from '../components/elements/lineWiseMachineSummary'
import UtilTypeWiseMachineSummary from '../components/elements/utilTypeWiseMachineSummary'
import { H3 } from '../components/common/customTexts'
import TypeWiseMachinePercentage from '../components/elements/typeWiseMachinePercentage'
import TypeWiseMachineSummary from '../components/elements/typeWiseMachineSummary'
import { Box } from '@mui/system'
import { BoxBig } from '../components/common/customBox'

const MachineDatabase = () => {
  
  useEffect(() => {
    store.dispatch(getMachineDb());
  },[])
  
  return (
    <Grid container alignItems='center' rowSpacing={10} >
        <Grid item md={12}>
          <BoxBig>
            <H3>Machine Dashboard</H3>
          </BoxBig>
          <Divider/> 
        </Grid>
        <Grid item md={12}>
          <TypeWiseMachineSummary />
        </Grid>
        <Grid item md={12}>
            <TypeWiseMachinePercentage />
        </Grid>
        <Grid item md={12}>
          <LineWiseMachineSummary />
        </Grid>
        <Grid item md={12}>
          <UtilTypeWiseMachineSummary />
        </Grid>
        
    </Grid>
  )
}

export default MachineDatabase;