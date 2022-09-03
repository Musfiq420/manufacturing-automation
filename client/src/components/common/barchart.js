import { blue } from '@mui/material/colors';
import React from 'react'
import CanvasJSReact from '../../assets/canvasjs-3.6.6/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Barchart = ({data, suffix=''}) => {

    const options = {
        colorSet: "muiColor",
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Types of Machines",
            fontSize: 20,
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
            type: "bar",
            indexLabel: "{y}"+suffix,
            indexLabelFontSize: 10,
            dataPoints: data
        }]
    }

    function addSymbols (e) {
		var suffixes =suffix;
		var parcentage = e.value;
		return CanvasJS.formatNumber(parcentage + suffixes);
	}

    CanvasJS.addColorSet("muiColor", [
        '#83c3f7'
    ])


  return (
    <div style={{margin: '50px'}}>
        <CanvasJSChart options = {options} />
    </div>
  )
}

export default Barchart;