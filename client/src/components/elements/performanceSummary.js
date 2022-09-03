import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import { PerformanceCards } from '../common/performanceCards';
import ReactDatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { getProductionByDate } from '../../store/productionDbSlice';
import { forwardRef } from 'react';
import { blue } from '@mui/material/colors';

const PerformanceSummary = () => {

    const [date, setDate] = useState(new Date('8/16/2022'))
    const dailyPerformance = useSelector((state) => state.productiondb.dailyData);
    const dispatch = useDispatch();

    function getFormattedDate(date) {
      var year = date.getFullYear();
    
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
    
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      
      return month + '/' + day + '/' + year;
    }


    function handleChangeDate(date) {
      setDate(date);
      dispatch(getProductionByDate({date: getFormattedDate(date)}))
      console.log('daily performance: '+dailyPerformance[0]['department'])
    }

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <Button style={{backgroundColor: blue[500], color:'#ffffff'}} onClick={onClick} ref={ref}>
        {value}
      </Button>
    ));


  return (
    <div>
        <ReactDatePicker title='Date:' dateFormat={'MM/dd/yyyy'} selected={date} onChange={(date) => handleChangeDate(date)} customInput={<ExampleCustomInput />} />
        <br />
        <br />
        <PerformanceCards data={dailyPerformance} />
    </div>
  )
}

export default PerformanceSummary