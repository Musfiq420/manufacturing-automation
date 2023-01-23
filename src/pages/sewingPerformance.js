import { Divider, Grid } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React from 'react'
import { BoxBig } from '../components/common/customBox'
import { H3 } from '../components/common/customTexts'
import DeptWiseMachineBreakdown from '../components/elements/deptWiseMachineBreakdown'
import LineWiseHourlyProduction from '../components/elements/lineWiseHourlyProduction'

const SewingPerformance = () => {
  return (
    <Grid container alignItems='center' rowSpacing={5}  >
      <Grid item md={12} sx={{backgroundColor:'white'}}>
        <BoxBig>
          <H3>Sewing Performance Overview</H3>
        </BoxBig>
        <Divider/>
      </Grid>
      <Grid item md={12}>
        <LineWiseHourlyProduction />
        {/* <BlockWiseHourlyProduction /> */}
      </Grid>
      
    </Grid>
  )
}

export default SewingPerformance;