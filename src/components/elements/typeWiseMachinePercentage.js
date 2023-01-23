import { Box } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { BoxMedium } from '../common/customBox';
import { H4, H_Sub } from '../common/customTexts';
import Doughnutchart from '../common/doughnutchart';


const TypeWiseMachinePercentage = () => {

    const mcType = useSelector((state) => state.machinedb.typeWise);

    if(!mcType)
        return <h1>Loading</h1>

    function getBarChartData (obj) {
        const dataPoints = [];
        
        mcType.map((e) => {

            if(getParcentage(e.count, 200)>1 && e.type !== 'Others')
            {
                dataPoints.push({y: getParcentage(e.count, 200), label: e.type})
            }
        })

        return dataPoints;
    }

    function getParcentage (e, total) {
        var par = parseFloat(((e/total)*100).toFixed(2));
        return par;
    }




  return (
    <>
        {/* <BoxMedium>
            <H4>Machine Types</H4>
        </BoxMedium> */}
        <Doughnutchart data={getBarChartData(mcType)} suffix='%' />
    </>
    
  )
}

export default TypeWiseMachinePercentage;

