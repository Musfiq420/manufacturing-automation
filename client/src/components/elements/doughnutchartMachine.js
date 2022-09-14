import React from 'react'
import { useSelector } from 'react-redux';
import Doughnutchart from '../common/doughnutchart';


const DoughnutchartMachine = () => {

    const mcType = useSelector((state) => state.machinedb.typeWise);

    function getBarChartData (obj) {
        const dataPoints = [];
        
        mcType.map((e) => {

            if(getParcentage(e.quantity, 4294)>1)
            {
                dataPoints.push({y: getParcentage(e.quantity, 4294), label: e.name})
            }
        })

        return dataPoints;
    }

    function getParcentage (e, total) {
        var par = parseFloat(((e/total)*100).toFixed(2));
        return par;
    }




  return (
    <Doughnutchart data={getBarChartData(mcType)} suffix='%' />
  )
}

export default DoughnutchartMachine;



// dataPoints: [
            //     { y:  getParcentage(1601, 3200), label: "Single Needle" },
            //     { y:  getParcentage(6, 3200), label: "Double Needle" },
            //     { y:  getParcentage(11, 3200), label: "Single Needle Edge Cutter" },
            //     { y:  getParcentage(3, 3200), label: "Single Needle Chain Stitch" },
            //     { y:  getParcentage(670, 3200), label: "Overlock" },
            //     { y:  getParcentage(471, 3200), label: "Flat Lock" },
            //     { y:  getParcentage(29, 3200), label: "Button Attach" },
            //     { y:  getParcentage(32, 3200), label: "Button Hole" },
            //     { y:  getParcentage(69, 3200), label: "Bartack" },
            //     { y:  getParcentage(0, 3200), label: "Feed of the Arm" },
            //     { y:  getParcentage(227, 3200), label: "Iron" },
            //     { y:  getParcentage(29, 3200), label: "Binding Cutter" },
            //     { y:  getParcentage(22, 3200), label: "Eyelet" },
            //     { y:  getParcentage(11, 3200), label: "Kansai" },
            //     { y:  getParcentage(0, 3200), label: "Zigzag" },
            //     { y:  getParcentage(12, 3200), label: "Thread Trim" },
            //     { y:  getParcentage(5, 3200), label: "Etc" },
            // ]