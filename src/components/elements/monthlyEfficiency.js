import { blue } from '@mui/material/colors'
import React from 'react'
import Chart from 'react-google-charts'
import { useSelector } from 'react-redux'
import { FlexColCenterSmall } from '../common/customBox'
import { H4, Sub2 } from '../common/customTexts'

const MonthlyEfficiency = () => {
    const monthlyPerformance = useSelector((state) => state.productiondb.monthlyData);

    const getMonthByIndex = (index) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return months[index-1];
    }

    const getMonthlyDatabyDept = (data) => {
        const dataArray = [["Month", "Efficiency"]]
        
            if(data){
                data.forEach(element => {
                    dataArray.push([getMonthByIndex(element.month), (element.efficiency/100)]);
                });
            }
        

        return dataArray;
    }


    const options = {
        hAxis: {
          title: "Month",
          format: 'MM',
          gridlines: {
            count: 12,
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
    <div>
        <FlexColCenterSmall>
          <H4>Efficiency Analysis</H4>
          <Sub2>month wise</Sub2>
        </FlexColCenterSmall>
        <Chart
            chartType="LineChart"
            data={getMonthlyDatabyDept(monthlyPerformance)}
            width="100%"
            height="400px"
            options={options} 
        />
    </div>
  )
}

export default MonthlyEfficiency