import { Container, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import LastUpdate from '../core/lastUpdate'
import { getMachineDb } from '../store/machineDbSlice'
import store from '../store/str'
import BarchartMachine from '../components/elements/barchartMachine'
import LineWiseMachineSummary from '../components/elements/lineWiseMachineSummary'
import MachineSummary from '../components/elements/machineSummary'
import UtilTypeWiseMachineSummary from '../components/elements/utilTypeWiseMachineSummary'

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
      <BarchartMachine />
      <br/>
      <LineWiseMachineSummary />
      <br />
      <UtilTypeWiseMachineSummary />
      <br />
    </Container>
  )
}

export default MachineDatabase;