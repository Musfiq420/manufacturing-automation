import React, { useEffect } from 'react';
import { Container } from '@mui/system';
import Chart from 'react-google-charts';
import { blue, red } from '@mui/material/colors';
import { H4, Sub1 } from '../common/customTexts';
import { SizedBoxBig } from '../common/sizedBox';
import { FlexColCenterBig, FlexColCenterSmall, FlexRowCenterBig, FlexRowCenterSmall } from '../common/customBox';
import { BasicToggleGroup } from '../common/customToggleGroup';
import { supabase } from '../../core/supabaseClient';
import { useDispatch } from 'react-redux';

const lineData = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
]



  
const LineWiseHourlyProduction = () => {
    const [line, setLine] = React.useState(7);
    const [productionData, setProductionData] = React.useState([["Hour", "Production", "Target"]]);
    const [achievement, setAchievement] = React.useState(0);

    const dispatch = useDispatch();

    const loadData = async (l) => {
        const hourlyProd = await supabase.rpc("hourly_prod", {l: l});
        const tempData = [["Hour", "Target", "Production"]]
        hourlyProd.data.forEach(value => {
          tempData.push([value.hour+':00', value.target, value.production])
        })
    
        setProductionData(tempData);
        console.log(hourlyProd.data);
      }
    
      useEffect(() => {
        loadData(line);
        // store.dispatch(getMachineDb());
      },[])

    const handleChangeLine = async (event, newAlignment) => {
        if(newAlignment)
        {
            await loadData(newAlignment);
            setLine(newAlignment);
        }
        
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
          // format: 'hh:mm a',
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
        <H4>Realtime Hourly Production</H4>
        <br/>
        <Container sx={{display:'flex'}}>
            <Container sx={{display:'flex', width:'auto'}}>
                <BasicToggleGroup value={line} onChange={handleChangeLine} data={lineData} label={lineData.map((e) => `${e}`)} />
                
            </Container>
            
        </Container>
        
        {/* <Container sx={{display:'flex', justifyContent:'center'}}> */}
        <FlexColCenterSmall>
        {productionData[1]?<Chart
                    chartType="ColumnChart"
                    data={productionData}
                    width='100%'
                    height="400px"
                    options={options}
                />:<><SizedBoxBig /><Sub1>No data</Sub1></>}
                            {/* <ProgressBar bgcolor={blue[400]} caption="Achievement: " completed={productionData[1]?(achievement):0} /> */}

        </FlexColCenterSmall>
           
        {/* </Container> */}
       
            
                {/* <LinearWithValueLabel progress={productionData[1]?achievement:0} /> */}
                {/* <FlexRowCenterSmall>Achievement</FlexRowCenterSmall> */}
        
       
    </>
    
//     <Box sx={{ minWidth: 120 }}>
    
//   </Box>
  )
}

export default LineWiseHourlyProduction