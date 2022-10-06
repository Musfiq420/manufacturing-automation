import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from '@mui/system';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Chart from 'react-google-charts';
import { blue, red } from '@mui/material/colors';
import { H4, Sub1 } from '../common/customTexts';
import fireApp from '../../utils/firebaseObj';
import { getDatabase, ref, onValue, off } from "firebase/database";
import { SizedBoxBig } from '../common/sizedBox';

const blockWiseData = [
    [1,2,3,4,5,6],
    [7,8,9,10,11,12,13,14,15],
    [16,17,18,19,20,21],
    [22,23,24,25,26,27,28,29,30],
    [31,32,33,34,35,36],
    [37,38,39,40,41,42,43,44,45],
    [46,47,48,49],
    [50,51,52,53,54,55],
    [56,57,58,59,60,61,62],
    [63,64,65,66,67,68,69],
    [70,71,72,73,74,75,76],
    [77,78,79,80,81],
    [82,83,84,85,86],
    [87,88,89,90,91],
    [92,93,94,95,96],
    [97,98,99,100,101,102,103,104,105],
    [106,107,108,109,110,111,112,113,114]
]



  
const LineWiseHourlyProduction = () => {
    const [block, setBlock] = React.useState(1);
    const [line, setLine] = React.useState(7);
    const date = new Date();
    const dateMDY = `${date.getDate()>9?(date.getDate()):('0'+date.getDate())}-${date.getMonth()>8?(date.getMonth() + 1):('0'+(date.getMonth() + 1))}-${date.getFullYear()}`;
    const [productionData, setProductionData] = React.useState([["Hour", "Production", "Target"]]);
    const db = getDatabase(fireApp);
    const dataRef = ref(db, `/hourlyProductionData_v_100/${dateMDY}/line_${line}`);

    const handleChangeBlock = (event) => {
      setBlock(event.target.value);
      console.log(blockWiseData[event.target.value][0])
      handleChangeLine(event,blockWiseData[event.target.value][0])
    };

    
    const handleChangeLine = (event, newAlignment) => {
        off(dataRef)
        if(newAlignment)
        setLine(newAlignment);
    };
  
    const options = {
        title: ``,
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
          format: 'hh:mm a',
          gridlines: {
            count: 11,      
            },
          textStyle : {
            fontSize: 10 // or the number you want
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

      useEffect(() => {
        
      }, [])
      

      
      useEffect(() => {
        console.log('hour: '+date.getHours());
            
            onValue(dataRef, (snapshot) => {
                const tempData = [["Hour", "Target", "Production", { role: 'annotation' }]]
                if(snapshot.val())
                {   
                    for (let i = 8; i <= 18; i++) {
                        const twelveHourFormat =  i>12?i-12:i;
                        const dateTemp = new Date();
                        const currentHour = dateTemp.getHours();
                        dateTemp.setHours(i);
                        dateTemp.setMinutes(0);
                        if(snapshot.val()[`hour_${twelveHourFormat}`])
                        {
                            tempData.push([dateTemp,snapshot.val()['hour_8']['Target'], snapshot.val()[`hour_${twelveHourFormat}`]['Production'], snapshot.val()[`hour_${twelveHourFormat}`]['Production'].toString()]);
                        }
                        else {
                            if(currentHour>dateTemp.getHours())
                                tempData.push([dateTemp, snapshot.val()['hour_8']['Target'], 0,  'no entry'])
                            else 
                                tempData.push([dateTemp, snapshot.val()['hour_8']['Target'], 0,  ''])
                        }
                        
                    }
                }
                else {
                    setProductionData([["Hour", "Production", "Target"]]);
                }
                

                console.log('line: '+line);
                console.log('db link: '+dataRef)
                console.log(snapshot.val());
                console.log('tempData: '+tempData)
                
            setProductionData(tempData);
            })
            
      }, [line])
      

  return (
    <>
        <H4>Linewise Hourly Production</H4>
        <br/>
        <Container sx={{display:'flex'}}>
            <Container sx={{display:'flex', width:'auto'}}>
                <FormControl>
                <Select
                    id="demo-simple-select"
                    value={block}
                    label=""
                    onChange={handleChangeBlock}
                >
                    {
                        blockWiseData.map((element, index) => {
                            return (<MenuItem value={index} >Block({element[0]}-{element[element.length-1]})</MenuItem>)
                        })
                    }
                </Select>
                </FormControl>
            </Container>
            <Container sx={{display:'flex', justifyContent:'start'}}>
                <ToggleButtonGroup
                    color="primary"
                    value={line}
                    exclusive
                    onChange={handleChangeLine}
                    aria-label="Platform"
                    >
                    {
                        blockWiseData[block].map((e) => {
                            return (<ToggleButton value={e}>Line {e}</ToggleButton>)
                        })
                    }
         </ToggleButtonGroup>
            </Container>
        </Container>
        <Container sx={{display:'flex', justifyContent:'center'}}>
            {productionData[1]?<Chart
                    chartType="ColumnChart"
                    data={productionData}
                    width='100%'
                    height="400px"
                    options={options}
                />:<><SizedBoxBig /><Sub1>No data</Sub1></>}
        </Container>
       
    </>
    
//     <Box sx={{ minWidth: 120 }}>
    
//   </Box>
  )
}

export default LineWiseHourlyProduction