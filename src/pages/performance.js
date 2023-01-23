import { Container, Divider, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BoxBig } from '../components/common/customBox'
import { H3 } from '../components/common/customTexts'
import { CustomToggleGroupBig } from '../components/common/customToggleGroup'
import { FlexRowCenterBig } from '../components/common/customBox'
import DailyPerformanceReport from '../components/elements/dailyPerformanceReport'
import { supabase } from '../core/supabaseClient'
import { addProductionByDate, addProductionByMonth } from '../store/productionDbSlice'
import { useDispatch } from 'react-redux'
import MonthlyEfficiency from '../components/elements/monthlyEfficiency'

const Performance = () => {
  const [dept, setDept] = useState('Cutting');
  const dispatch = useDispatch()

  const loadData = async () => {
    const dailyProd = await supabase.rpc("todays_dept_performance", {d:'2022-08-18'});
    const monthlyProd = await supabase.rpc("month_dept_efficiency", {deptt:'Cutting'});
    dispatch(addProductionByDate(dailyProd.data[0]));
    dispatch(addProductionByMonth(monthlyProd.data))
    console.log(monthlyProd.data);
  }

  useEffect(() => {
    loadData();
    // store.dispatch(getMachineDb());
  },[])

  const handleSelectDept = async (event, newValue) => {
    if(newValue !== null)
    {
      const monthlyProd = await supabase.rpc("month_dept_efficiency", {deptt:newValue});
      dispatch(addProductionByMonth(monthlyProd.data))
      console.log(monthlyProd.data);
      setDept(newValue);
    }
      
  };


  return (
    <Grid container alignItems='center' rowSpacing={5} >
      <Grid item md={12}>
        <BoxBig>
          <H3>Performance Overview</H3>
        </BoxBig>
        <Divider/>
      </Grid>
      <Grid item md={12}>
      <FlexRowCenterBig>
        <CustomToggleGroupBig
          data={['Cutting', 'Sewing', 'Finishing']}
          value={dept}
          handleSelectDept={handleSelectDept}
          />
      </FlexRowCenterBig>
      </Grid>
      <Grid item md={12}>
        <DailyPerformanceReport dept={dept} />
      </Grid>
      <Grid item md={12}>
        <MonthlyEfficiency />
        {/* <DateRangeTrendAnalysis dept={dept} /> */}
      </Grid>
      
      
    </Grid>
  )
}

export default Performance