import { Container, Divider } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import LineWiseHourlyProduction from '../components/elements/lineWiseHourlyProduction'
import LastUpdate from '../core/lastUpdate'

const HourlyProduction = () => {
  return (
    <Container>
        <h2>Real Time Production</h2>
        <Divider/>
        <LastUpdate />
        <br/>
        <LineWiseHourlyProduction />
    </Container>
  )
}

export default HourlyProduction