import { Container, Divider } from '@mui/material'
import React from 'react'
import { BoxBig } from '../components/common/customBox'
import { H3 } from '../components/common/customTexts'
import { SizedBoxMedium } from '../components/common/sizedBox'
import PerformanceSummary from '../components/elements/performanceSummary'
import LastUpdate from '../core/lastUpdate'

const Performance = () => {
  return (
    <Container>
      <BoxBig>
        <H3>Performance Overview</H3>
      </BoxBig>
      <Divider/>
      <PerformanceSummary />
    </Container>
  )
}

export default Performance