import { Container, Divider } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { H3 } from '../components/common/customTexts'
import LineWiseHourlyProduction from '../components/elements/lineWiseHourlyProduction'
import LastUpdate from '../core/lastUpdate'

const HourlyProduction = () => {
  return (
    <Container>
        <H3>Real Time Production</H3>
        <Divider/>
        <br/>
        <LineWiseHourlyProduction />
    </Container>
  )
}

export default HourlyProduction