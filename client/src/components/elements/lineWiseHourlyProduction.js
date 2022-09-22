import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from '@mui/system';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Chart from 'react-google-charts';
import { blue } from '@mui/material/colors';

const blockWiseData = [
    [1,2,3,4,5,6],
    [7,8,9,10,11,12,13,14,15]
]

const lineWiseHourlyProduction = {
    1: [["Hour", "Production", "Target"], [1, 60, 65], [2, 68, 65], [3, 65, 65], [4, 60, 65], [5, 65, 65], [6, 40, 65], [7, 75, 65], [8, 75, 65]],
    2: [["Hour", "Production", "Target"], [1, 100, 95], [2, 61, 95], [3, 53, 95], [4, 50, 95], [5, 55, 95], [6, 39, 95], [7, 201, 95], [8, 111, 95]],
    3: [["Hour", "Production", "Target"], [1, 31, 70], [2, 43, 70], [3, 42, 70], [4, 50, 70], [5, 27, 70], [6, 23, 70], [7, 27, 70], [8, 49, 70]],
    4: [["Hour", "Production", "Target"], [1, 14, 62], [2, 18, 62], [3, 19, 62], [4, 15, 62], [5, 0, 62], [6, 62, 62], [7, 14, 62], [8, 15, 62]],
    5: [["Hour", "Production", "Target"], [1, 55, 140], [2, 98, 140], [3, 91, 140], [4, 165, 140], [5, 115, 140], [6, 149, 140], [7, 158, 140], [8, 84, 140]],
    6: [["Hour", "Production", "Target"], [1, 0, 42], [2, 0, 42], [3, 0, 42], [4, 0, 42], [5, 0, 42], [6, 15, 42], [7, 17, 42], [8, 31, 42]],
    7: [["Hour", "Production", "Target"], [1, 0, 42], [2, 0, 42], [3, 0, 42], [4, 0, 42], [5, 0, 42], [6, 15, 42], [7, 17, 42], [8, 31, 42]],
    8: [["Hour", "Production", "Target"], [1, 60, 65], [2, 68, 65], [3, 65, 65], [4, 60, 65], [5, 65, 65], [6, 40, 65], [7, 75, 65], [8, 75, 65]],
    9: [["Hour", "Production", "Target"], [1, 100, 95], [2, 61, 95], [3, 53, 95], [4, 50, 95], [5, 55, 95], [6, 39, 95], [7, 201, 95], [8, 111, 95]],
    10: [["Hour", "Production", "Target"], [1, 31, 70], [2, 43, 70], [3, 42, 70], [4, 50, 70], [5, 27, 70], [6, 23, 70], [7, 27, 70], [8, 49, 70]],
    11: [["Hour", "Production", "Target"], [1, 60, 65], [2, 68, 65], [3, 65, 65], [4, 60, 65], [5, 65, 65], [6, 40, 65], [7, 75, 65], [8, 75, 65]],
    12: [["Hour", "Production", "Target"], [1, 100, 95], [2, 61, 95], [3, 53, 95], [4, 50, 95], [5, 55, 95], [6, 39, 95], [7, 201, 95], [8, 111, 95]],
    13: [["Hour", "Production", "Target"], [1, 31, 70], [2, 43, 70], [3, 42, 70], [4, 50, 70], [5, 27, 70], [6, 23, 70], [7, 27, 70], [8, 49, 70]],
    14: [["Hour", "Production", "Target"], [1, 14, 62], [2, 18, 62], [3, 19, 62], [4, 15, 62], [5, 0, 62], [6, 62, 62], [7, 14, 62], [8, 15, 62]],
    15: [["Hour", "Production", "Target"], [1, 55, 140], [2, 98, 140], [3, 91, 140], [4, 165, 140], [5, 115, 140], [6, 149, 140], [7, 158, 140], [8, 84, 140]],
    
}


  
const LineWiseHourlyProduction = () => {
    const [block, setBlock] = React.useState(0);
    const [line, setLine] = React.useState(1);


    const handleChangeBlock = (event) => {
      setBlock(event.target.value);
      console.log(blockWiseData[event.target.value][0])
      handleChangeLine(event,blockWiseData[event.target.value][0])
    };

    
    const handleChangeLine = (event, newAlignment) => {
        if(newAlignment)
        setLine(newAlignment);
    };
  
    const options = {
        title: `Hourly Production for Line ${line}`,
        titleTextStyle: {
          fontSize: 20
        },
        hAxis: {
          title: "Hour",
          format: '# hour',
          gridlines: {
            count: 10,      },
          textStyle : {
            fontSize: 10 // or the number you want
        }
          
        },
        vAxis: {
          title: "Production",
        },
        series: {
            1: {
              type: 'line'
            }
          },
        
      };

  return (
    <>
        <Typography fontSize={20} fontWeight='bold'>Linewise Hourly Production</Typography>
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
                    {/* <ToggleButton value="web">Web</ToggleButton>
                    <ToggleButton value="android">Android</ToggleButton>
                    <ToggleButton value="ios">iOS</ToggleButton> */}
                </ToggleButtonGroup>
            </Container>
        </Container>
        <Chart
                chartType="ColumnChart"
                data={lineWiseHourlyProduction[line]}
                width="100%"
                height="400px"
                options={options}
            />
    </>
    
//     <Box sx={{ minWidth: 120 }}>
    
//   </Box>
  )
}

export default LineWiseHourlyProduction