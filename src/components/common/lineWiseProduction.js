import { blue, red } from '@mui/material/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';
import { supabase } from '../../core/supabaseClient';
import { getFormattedDate } from '../../utils/formattedDate';
import { FlexColCenterBig } from './customBox';
import ProgressBar from './customLinearProgressBar';
import { H3, H6, Sub1 } from './customTexts';
import { SizedBoxBig } from './sizedBox';



const LineWiseProduction = ({line, date}) => {
    const [productionData, setProductionData] = useState([["Hour", "Production", "Target"]]);
    const [achievement, setAchievement] = useState(0);


  const loadData = async () => {
    const hourlyProd = await supabase.rpc("hourly_prod", {l: line});
    const tempData = [["Hour", "Target", "Production"]]
    hourlyProd.data.forEach(value => {
      tempData.push([value.hour, value.target, value.production])
    })

    setProductionData(tempData);
    console.log(hourlyProd.data);
  }

  useEffect(() => {
    loadData();
    // store.dispatch(getMachineDb());
  },[])

    // useEffect(() => {
    //     getData();
    //   }, [line])


    // const getData = async () => {
    //     const result =  axios.get(`https://firsttrial-cff1d-default-rtdb.firebaseio.com/hourlyProductionData_v_200/${getFormattedDate(date)}/${line}.json`);
    //     const data = (await result).data;
    //     const tempData = [["Hour", "Target", "Production", { role: 'annotation' }]]

    //     let tempProd = 0;
    //     let tempTarget = 0;
    //     for (let key = 8; key <= 18; key++) {

    //         const tempDate = new Date();
    //         tempDate.setHours(key);
    //         tempDate.setMinutes(0);
    //         const currentHour = date.getHours();
            
            
    //         if(data)
    //         {
    //             if(data[key])
    //             {
    //                 tempData.push([tempDate, data[8]['target'], data[key]['production'], data[key]['production'].toString()]);
    //                 tempProd = tempProd + data[key]['production'];
    //                 tempTarget = tempTarget + data[key]['target'];
    //             }
    //             else{

    //                 tempData.push([tempDate, data[8]?data[8]['target']:0, 0,  ''])
    //             }
    //         }

            

            
    //     }

    //     setProductionData(tempData);
    //     setAchievement(Number(((tempTarget!==0?(tempProd/tempTarget):0)*100).toFixed(2)));
    //     // console.log(`Line ${line}: `);
    //     // console.log((await result).data);
    //   }


      const options = {
        title: `Line ${line}`,
        colors: [blue[400]],
        titleTextStyle: {
          fontSize: 20
        },
        annotations: {
            textStyle: {
              fontSize: 10,
            }
        },
        hAxis: {
          title: "Hour",
          format: 'hh a',
          gridlines: {
            count: 11,      
            },
          textStyle : {
            fontSize: 10
        },
        
        },
        vAxis: {
          title: "Production",
        },
        series: {
            0: {
              type: 'line',
              color: red[300]
            }
          },
        
      };


  return (
    <>
        <div style={{width:'45%', border:'3px solid rgba(0,0,0,0.1)', margin: '10px', padding:'5px'}}>
            {/* <H6>Line {line}</H6> */}
        {productionData[1]?<Chart
                    chartType="ColumnChart"
                    data={productionData}
                    width='100%'
                    height="400px"
                    options={options}
                />:<><SizedBoxBig /><Sub1>No data</Sub1></>}
          <ProgressBar bgcolor={blue[400]} caption="Achievement: " completed={productionData[1]?(achievement):0} />
        </div>
        
    </>
  )
}

export default LineWiseProduction