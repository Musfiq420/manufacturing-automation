import { Container, Divider } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import PerformanceSummary from '../components/elements/performanceSummary'
import LastUpdate from '../core/lastUpdate'

const Production = () => {
  return (
    <Container sx={{backgroundColor:grey[100]}}>
        <h2>Performance Overview</h2>
        <Divider/>
        <LastUpdate />
        <br/>
        <PerformanceSummary />
    </Container>
  )
}

export default Production