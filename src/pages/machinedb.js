import { Container, Divider, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { getMachineDb, mcAct } from '../store/machineDbSlice'
import store from '../store/str'
import UtilTypeWiseMachineSummary from '../components/elements/utilTypeWiseMachineSummary'
import { H3, H4, Sub1 } from '../components/common/customTexts'
import TypeWiseMachinePercentage from '../components/elements/typeWiseMachinePercentage'
import TypeWiseMachineSummary from '../components/elements/typeWiseMachineSummary'
import { BoxBig } from '../components/common/customBox'
import DeptWiseMachineBreakdown from '../components/elements/deptWiseMachineBreakdown'
import { supabase } from '../core/supabaseClient'
import { useDispatch } from 'react-redux'

const MachineDatabase = () => {
  const dispatch = useDispatch();

  const loadData = async () => {
    const typewise = await supabase.rpc("type_wise_machine");
    const lostTime = await supabase.rpc("todays_lost_time", {d: '2023-01-22'});
    const util = await supabase.rpc("type_wise_util");
    dispatch(mcAct.addTypeWiseMachine(typewise.data)); 
    dispatch(mcAct.addLostTime(lostTime.data));
    dispatch(mcAct.addUtilTypeWiseMachine(util.data));
  }
  
  useEffect(() => {
    loadData();
    // store.dispatch(getMachineDb());
  },[])
  
  return (
    <Grid container alignItems='center' rowSpacing={5} >
      <Grid item md={12}>
        <BoxBig>
          <H3>Machine Dashboard</H3>
        </BoxBig>
        <Divider/> 
      </Grid>
      <Grid item md={12}>
        <H4>Machine Summary</H4>
        <Sub1>Typewise Machine Breakdown</Sub1>
      </Grid>
      <Grid item md={6}>
        <TypeWiseMachineSummary />
      </Grid>
      <Grid item md={6}>
        <TypeWiseMachinePercentage />
      </Grid>
      <Grid item md={12}>
        <UtilTypeWiseMachineSummary />
      </Grid>
      <Grid item md={12}>
        <DeptWiseMachineBreakdown />
      </Grid>        
    </Grid>
  )
}

export default MachineDatabase;