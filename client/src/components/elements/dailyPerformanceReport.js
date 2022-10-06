import React, { useState } from 'react'
import { FlexColCenterSmall, FlexRowCenterSmall } from '../common/customBox'
import { CustomDatePickUi } from '../common/customDatePickUi'
import { H4, Sub2 } from '../common/customTexts'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getProductionByDate } from '../../store/productionDbSlice';
import dayjs from 'dayjs';
import { CustomCardBlue, CustomCardWhite } from '../common/customCard';

const DailyPerformanceReport = ({dept}) => {

  const [date, setDate] = useState(dayjs('2022-08-18T21:11:54'));
  const dailyPerformance = useSelector((state) => state.productiondb.dailyData);
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    setDate(newValue);
    dispatch(getProductionByDate({date: getFormattedDate(newValue)}));
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

  const getDeptIndex = (str) => {
    switch(str){
      case 'Cutting':
        return 0;
      case 'Embroidery':
        return 1;
      case 'Printing':
        return 2;
      case 'Sewing':
        return 3;
      case 'Finishing':
        return 4;
            
      default: break;
    }
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
      {dailyPerformance?dailyPerformance[getDeptIndex(dept)]?
      <FlexRowCenterSmall>
        <CustomCardWhite data={dailyPerformance[getDeptIndex(dept)]['man_power']} caption="Man Power" />
        <CustomCardWhite data={dailyPerformance[getDeptIndex(dept)]['target']} caption="Target" />
        <CustomCardWhite data={dailyPerformance[getDeptIndex(dept)]['production']} caption="Production" />
        <CustomCardWhite data={`${(parseInt(dailyPerformance[getDeptIndex(dept)]["production"])/parseInt(dailyPerformance[getDeptIndex(dept)]['target'])*100).toFixed(2)}%`} caption="Man Power" />
        <CustomCardBlue data={`${(parseInt(dailyPerformance[getDeptIndex(dept)]['earn_minute'])/parseInt(dailyPerformance[getDeptIndex(dept)]['available_minute'])*100).toFixed(2)}%`} caption="Efficiency"/>
      </FlexRowCenterSmall>
        
      :<Sub2>No data to show</Sub2>:<Sub2>No data to show</Sub2>}
    </>
    
  )
}

export default DailyPerformanceReport