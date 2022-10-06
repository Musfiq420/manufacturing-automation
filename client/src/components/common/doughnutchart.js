import { Box } from '@mui/material';
import { blue, green, grey, indigo, lightBlue, lightGreen, orange, purple, red, yellow } from '@mui/material/colors';
import React from 'react'
import CanvasJSReact from '../../assets/canvasjs-3.6.6/canvasjs.react';
import { BoxMedium } from './customBox';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Doughnutchart = ({data, suffix=''}) => {

    const options = {
        colorSet: "muiColor",
        animationEnabled: true,
        theme: "light2",
        title:{
            text: ""
        },
        axisX: {
            title: "Machine Type",
            reversed: true,
            interval: 1,
            labelFontSize: 10,
            titleFontSize: 15,
            
        },
        axisY: {
            title: "Total Number of Machines",
            includeZero: true,
            labelFormatter: addSymbols,
            labelFontSize: 10,
            titleFontSize: 15,
        },
        data: [{
            type: "doughnut",
            indexLabel: "{label} {y}"+suffix,
            indexLabelFontSize: 15,
            dataPoints: data
        }]
    }

    function addSymbols (e) {
		var suffixes =suffix;
		var parcentage = e.value;
		return CanvasJS.formatNumber(parcentage + suffixes);
	}

    CanvasJS.addColorSet("muiColor", [
        lightGreen[300],
        red[300],
        grey[300],
        yellow[300],
        lightBlue[300],
        purple[300],
        indigo[300]
    ])

  return (
    <Box margin='20px'>
        <CanvasJSChart options = {options} />
    </Box>
  )
}

export default Doughnutchart;