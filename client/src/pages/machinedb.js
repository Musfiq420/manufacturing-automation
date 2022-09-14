import { Container, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import LastUpdate from '../core/lastUpdate'
import { getMachineDb } from '../store/machineDbSlice'
import store from '../store/str'
import LineWiseMachineSummary from '../components/elements/lineWiseMachineSummary'
import MachineSummary from '../components/elements/machineSummary'
import UtilTypeWiseMachineSummary from '../components/elements/utilTypeWiseMachineSummary'
import DoughnutchartMachine from '../components/elements/doughnutchartMachine'

const MachineDatabase = () => {
  
  useEffect(() => {
    store.dispatch(getMachineDb());
  },[])
  
  return (
    <Container >
      <h2>Machine Dashboard</h2>
      <Divider/>
      <LastUpdate />
      <br/>
      <MachineSummary />
      <br />
      <br />
      <DoughnutchartMachine />
      <br/>
      <LineWiseMachineSummary />
      <br />
      <UtilTypeWiseMachineSummary />
      <br />
    </Container>
  )
}

export default MachineDatabase;