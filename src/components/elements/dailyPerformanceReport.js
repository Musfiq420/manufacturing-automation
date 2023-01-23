import React, { useEffect, useState } from 'react'
import { FlexColCenterSmall, FlexRowCenterSmall } from '../common/customBox'
import { CustomDatePickUi } from '../common/customDatePickUi'
import { H4, Sub2 } from '../common/customTexts'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { CustomCardBlue, CustomCardWhite } from '../common/customCard';
import { addProductionByDate } from '../../store/productionDbSlice';
import { supabase } from '../../core/supabaseClient';

const DailyPerformanceReport = ({dept}) => {

  const [date, setDate] = useState(dayjs('2022-08-18T21:11:54'));
  const dailyPerformance = useSelector((state) => state.productiondb.dailyData);
  const dispatch = useDispatch();

  const getDeptIndex = (name) => {
    if(name==='Cutting')
      return 0;
    
      if(name==='Sewing')
      return 1;

      if(name==='Finishing')
      return 2;
    
  }

  useEffect(() => {
    const loadData = async () => {
      const dailyProd = await supabase.rpc("todays_dept_performance", {d:dayjs(date).format('YYYY-MM-DD')});
      // console.log(dept, dailyProd.data)
      dispatch(addProductionByDate(dailyProd.data[getDeptIndex(dept)]));
    }

   loadData()
  }, [dept])

  const handleChange = async (newValue) => {
    setDate(newValue);
    console.log(dayjs(newValue).format('YYYY-MM-DD'));
    const dailyProd = await supabase.rpc("todays_dept_performance", {d:dayjs(newValue).format('YYYY-MM-DD')});
    dispatch(addProductionByDate(dailyProd.data[getDeptIndex(dept)]));
    // dispatch(addProductionByDate())
  };

  function getFormattedDate(date) {
    var year = date.year();

    var month = (1 + date.month()).toString();
    month = month.length > 1 ? month : '0' + month;
    
    var day = date.date().toString();
    day = day.length > 1 ? day : '0' + day;
    console.log(month + '/' + day + '/' + year)
    return month + '/' + day + '/' + year;
  }



  return (
    <>
      <FlexColCenterSmall>
        <H4>Daily Report</H4>
        <CustomDatePickUi 
          AdapterDayjs={AdapterDayjs}
          date={date}
          handleChange={handleChange}
          />
      </FlexColCenterSmall>
      {dailyPerformance?
      <FlexRowCenterSmall>
        <CustomCardWhite data={dailyPerformance['man_power']} caption="Man Power" />
        <CustomCardWhite data={dailyPerformance['target']} caption="Target" />
        <CustomCardWhite data={dailyPerformance['production']} caption="Production" />
        <CustomCardWhite data={`${Number(dailyPerformance['achievement']).toFixed(2)}%`} caption="Achievement" />
        <CustomCardBlue data={`${Number(dailyPerformance['efficiency']).toFixed(2)}%`} caption="Efficiency"/>
      </FlexRowCenterSmall>
        
      :<Sub2>No data to show</Sub2>}
    </>
    
  )
}

export default DailyPerformanceReport