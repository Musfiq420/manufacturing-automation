import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { CustomDatePickUi } from '../common/customDatePickUi';
import { H4 } from '../common/customTexts';
import { BoxBig, BoxMedium, FlexColCenterBig } from '../common/customBox';
import BasicTable from '../common/customTable';
import { useDispatch } from 'react-redux';
import { mcAct } from '../../store/machineDbSlice';
import { supabase } from '../../core/supabaseClient';

const DeptWiseMachineBreakdown = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs());

  const handleDateChange = async (newValue) => {
    const day = dayjs(newValue);
    const lostTime = await supabase.rpc("todays_lost_time", {d: day.format('YYYY-MM-DD')});
    dispatch(mcAct.addLostTime(lostTime.data))
    console.log(day.format('YYYY-MM-DD'));
    setDate(newValue);
  };

  return (
    <FlexColCenterBig>
      <H4>Line Wise Machine Breakdown</H4>
      <CustomDatePickUi 
        AdapterDayjs={AdapterDayjs}
        date={date}
        handleChange={handleDateChange}
        />
      <BoxBig>
        <BasicTable />
      </BoxBig>
    </FlexColCenterBig>
  )
}

export default DeptWiseMachineBreakdown
