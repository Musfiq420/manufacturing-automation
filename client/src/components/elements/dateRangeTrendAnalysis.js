import React, { useState } from 'react'
import Chart from 'react-google-charts'
import { useDispatch, useSelector } from 'react-redux'
import { getProductionByDateRange, getProductionByMonth } from '../../store/productionDbSlice'
import { FlexColCenterSmall, FlexRowCenterSmall } from '../common/customBox'
import { CustomMonthPickUi } from '../common/customDatePickUi'
import { H4, Sub2 } from '../common/customTexts'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CustomToggleGroupSmall } from '../common/customToggleGroup'
import dayjs from 'dayjs'
import { blue } from '@mui/material/colors'

export const DateRangeTrendAnalysis = ({dept}) => {
    const [chartSelection, setChartSelection] = useState('select a month');
    const [month, setMonth] = useState(dayjs('2022-08-18T21:11:54'));

    const monthlyPerformance = useSelector((state) => state.productiondb.monthlyData);
    const dispatch = useDispatch();

    const handleChartSelection = (event, newSelection) => {
        if(newSelection!==null)
        {
          setChartSelection(newSelection);
          if(newSelection==="select a month")
          {
            dispatch(getProductionByMonth({month: (month.month() + 1).toString().length > 1 ? (month.month() + 1).toString() : '0' + (month.month() + 1).toString()}))
          }
        }
        
      };

    const handleMonthSelection = (newValue) => {
        setMonth(newValue);
        dispatch(getProductionByMonth({month: (newValue.month() + 1).toString().length > 1 ? (newValue.month() + 1).toString() : '0' + (newValue.month() + 1).toString()}))
    }

    const onDateRangeClick = (mode) => {
        const sub = mode==="last 7 days"?7:mode==="last 30 days"?30:mode==="last 3 months"?90:mode==="last 6 months"?180:0;
          // console.log('from: '+getFormattedDate(date.subtract(1,'days'))+' to: '+getFormattedDate(date.subtract(7,'days')));
        const date = dayjs('2022-08-18T21:11:54');
          if(sub!==0)
          dispatch(getProductionByDateRange({startDate: getFormattedDate(date.clone().subtract(sub, 'day')), endDate: getFormattedDate(date.clone().subtract(1, 'day'))}))
    }

    const getMonthlyDatabyDept = (data, dept) => {
    const dataArray = [["Date", "Efficiency", {type:'string', role:'tooltip'}]]
    
        if(data){
            data.forEach(element => {
            if(element["department"] === dept) 
            {
                const dateee = element['date'].substring(6, 10) + '-' + element["date"].substring(0, 2) + '-' +element["date"].substring(3, 5);
                console.log(dateee);
                const d = new Date(dateee)

                const e = parseFloat(((parseInt(element['earn_minute'])/parseInt(element['available_minute']))));
                dataArray.push([d, e, `date of month: ${d.toLocaleDateString()}\nefficiency: ${(e*100).toFixed(2)}%`])
                
            }
            });
        }
    

    return dataArray;
    }

    function getFormattedDate(date) {
        var year = date.year();

        var month = (1 + date.month()).toString();
        month = month.length > 1 ? month : '0' + month;
        
        var day = date.date().toString();
        day = day.length > 1 ? day : '0' + day;
        console.log(month + '/' + day + '/' + year)
        return month + '/' + day + '/' + year;
    }

    const options = {
        // title: chartSelection==="select a month"?
        //   `Efficiency trend for ${monthNames[month.month()]}, ${month.year()}`:
        //   `Efficiency trend for ${chartSelection}`
        //   ,
        // titleTextStyle: {
        //   fontSize: 14,
        // },
        hAxis: {
          title: "Date",
          format: 'dd MMM',
          gridlines: {
            count: chartSelection==="select a month"?30:chartSelection==="last 7 days"?7:chartSelection==="last 30 days"?30:chartSelection==="last 3 months"?3:chartSelection==="last 6 months"?6:30,
          },
          textStyle : {
            fontSize: 10 // or the number you want
        }
          
        },
        vAxis: {
          title: "Efficiency",
          format: 'percent'
        },
        trendlines: {
          0: {
            type: 'polynomial',
            color: blue[300],
            enableInteractivity: false,
            opacity: 0.6,
          }
        },
        
    };

  return (
    <>
        <FlexColCenterSmall>
          <H4>Trend Analysis</H4>
          <Sub2>upto 6 months</Sub2>
        </FlexColCenterSmall>
        <FlexRowCenterSmall>
            <CustomToggleGroupSmall value={chartSelection} handleChange={handleChartSelection} handleElementClick={onDateRangeClick} data={[{value: "select a month",ui:<CustomMonthPickUi AdapterDayjs={AdapterDayjs} month={month} handleChange={handleMonthSelection} />, sx:{"&.Mui-selected .MuiIconButton-root":{color:blue[600]}}},{value: "last 7 days",ui:"last 7 days"}, {value: "last 30 days",ui:"last 30 days"}, {value: "last 3 months",ui:"last 3 months"}, {value: "last 6 months",ui:"last 6 months"}]} />
        </FlexRowCenterSmall>
      
      
        <Chart
            chartType="LineChart"
            data={getMonthlyDatabyDept(monthlyPerformance, dept)}
            width="100%"
            height="400px"
            options={options} 
        />
    </>
  )
}
