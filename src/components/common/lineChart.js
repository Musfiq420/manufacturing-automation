import { blue } from '@mui/material/colors';
import React from 'react'
import CanvasJSReact from '../../assets/canvasjs-3.6.6/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Linechart = ({data, suffix=''}) => {

    const options = {
        colorSet: "muiColor",
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Efficiency Comparison for August",
            fontSize: 20,
        },
        axisX: {
            title: "Date",
            interval: 1,
            labelFontSize: 10,
            titleFontSize: 15,
            
        },
        axisY: {
            title: "Efficiency",
            labelFormatter: addSymbols,
            labelFontSize: 10,
            titleFontSize: 15,
        },
        data: [{
            type: "line",
            indexLabel: "{y}"+suffix,
            indexLabelFontSize: 10,
            dataPoints: data
            // [
            //     { x: 1, y: 64 },
            //     { x: 2, y: 61 },
            //     { x: 3, y: 64 },
            //     { x: 4, y: 62 },
            //     { x: 5, y: 64 },
            //     { x: 6, y: 60 },
            //     { x: 7, y: 58 },
            //     { x: 8, y: 59 },
            //     { x: 9, y: 53 },
            //     { x: 10, y: 54 },
            //     { x: 11, y: 61 },
            //     { x: 12, y: 60 },
            //     { x: 13, y: 55 },
            //     { x: 14, y: 60 },
            //     { x: 15, y: 56 },
            //     { x: 16, y: 60 },
            //     { x: 17, y: 59.5 },
            //     { x: 18, y: 63 },
            //     { x: 19, y: 58 },
            //     { x: 20, y: 54 },
            //     { x: 21, y: 59 },
            //     { x: 22, y: 64 },
            //     { x: 23, y: 59 }
            // ]
        }]
    }

    function addSymbols (e) {
		var suffixes =suffix;
		var parcentage = e.value;
		return CanvasJS.formatNumber(parcentage + suffixes);
	}

    CanvasJS.addColorSet("muiColor", [
        blue[500]
    ])

    

  return (
    <div style={{margin: '50px'}}>
        <CanvasJSChart options = {options} />
    </div>
  )
}

export default Linechart;