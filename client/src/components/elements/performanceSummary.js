//weekly, monthly, 3 months, 6 months
import { Button, Container, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PerformanceCard, PerformanceCards } from '../common/performanceCards';
import { useDispatch } from 'react-redux';
import { getProductionByDate, getProductionByMonth } from '../../store/productionDbSlice';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DropDownList from '../common/dropDownList';
import { Box } from '@mui/system';
import { blue, grey } from '@mui/material/colors';
import CustomToggleGroup from '../common/customToggleGroup';
import { CustomProgressBar } from '../common/customProgressBar';
import { styled } from '@mui/material/styles';
import Linechart from '../common/lineChart';
import { Chart } from "react-google-charts";

const StyledToggleButton = styled(ToggleButton)(({ }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: 'white',
    backgroundColor: blue[400],
    fontSize:25,
    fontWeight:'bold'
  }
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
 
const PerformanceSummary = () => {
    const [dept, setDept] = useState('Cutting');
    const [date, setDate] = useState(dayjs('2022-08-18T21:11:54'));
    const dailyPerformance = useSelector((state) => state.productiondb.dailyData);
    const monthlyPerformance = useSelector((state) => state.productiondb.monthlyData);
    const dispatch = useDispatch();

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];



    function getFormattedDate(date) {
      var year = date.year();

      var month = (1 + date.month()).toString();
      month = month.length > 1 ? month : '0' + month;
    
      var day = date.date().toString();
      day = day.length > 1 ? day : '0' + day;
      console.log(month + '/' + day + '/' + year)
      return month + '/' + day + '/' + year;
    }

    const handleSelectDept = (event, newValue) => {
      if(newValue!==null)
        setDept(newValue);
    };

    const getDeptIndex = (str) => {
      switch(str){
        case 'Cutting':
          return 0;
        case 'Embroidery':
          return 1;
        case 'Printing':
          return 2;
        case 'Sewing':
          return 3;
        case 'Finishing':
          return 4;
              
        default: break;
      }
    }

    const handleChange = (newValue) => {
      setDate(newValue);
      dispatch(getProductionByDate({date: getFormattedDate(newValue)}));
      dispatch(getProductionByMonth({month: (newValue.month() + 1).toString().length > 1 ? (newValue.month() + 1).toString() : '0' + (newValue.month() + 1).toString()}))
    };

    const getMonthlyDatabyDept = (data, dept) => {
      // const obj = []
      const dataArray = [["Date", "Efficiency", {type:'string', role:'tooltip'}]]
      
      if(data){
        data.forEach(element => {
          if(element["department"] === dept) 
          {
            // obj.push({
            //   x: parseInt(element["date"].substring(3, 5)),
            //   y: parseFloat(((parseInt(element['earn_minute'])/parseInt(element['available_minute']))*100).toFixed(2))
            // })
            const d = parseInt(element["date"].substring(3, 5));
            const e = parseFloat(((parseInt(element['earn_minute'])/parseInt(element['available_minute']))));
            dataArray.push([d, e, `date of month: ${d}\nefficiency: ${(e*100).toFixed(2)}%`])
            
          }
        });
      }
      

      return dataArray;
    }


    useEffect(() => {
      dispatch(getProductionByDate({date: getFormattedDate(date)}))
      dispatch(getProductionByMonth({month: (date.month() + 1).toString().length > 1 ? (date.month() + 1).toString() : '0' + (date.month() + 1).toString()}))
      
    }, [])
   

  const options = {
    title: `Efficiency trend for ${monthNames[date.month()]}`,
    titleTextStyle: {
      fontSize: 20
    },
    hAxis: {
      title: "Date",
      gridlines: {
        count: 31,
      },
      textStyle : {
        fontSize: 12 // or the number you want
    }
      
    },
    vAxis: {
      title: "Efficiency",
      format: 'percent'
    },
    trendlines: {
      0: {
        type: 'polynomial',
        color: blue[100],
        enableInteractivity: false,
        opacity: 0.6,
      }
    },
    
  };

  return (
    <Container sx={{ justifyContent:'start'}}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
          maxWidth:'fit-content'
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={dept}
          exclusive
          onChange={handleSelectDept}
          aria-label="text alignment"
        >
          {['Cutting', 'Embroidery', 'Printing', 'Sewing', 'Finishing'].map((e) => {
        return (<StyledToggleButton value={e} sx={{color:grey[300], fontSize:20}} aria-label="left aligned">
         {e}
        </StyledToggleButton>)
      })}
        </StyledToggleButtonGroup>
        </Paper>
      <br />
      <br />
      <Container disableGutters sx={{display: 'flex', justifyContent:'start'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                  label="Date"
                  inputFormat="DD MMMM, YYYY"
                  value={date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField variant='outlined' sx={{ backgroundColor: 'white'}} {...params} />}
                />
            </LocalizationProvider>
      </Container>
      <br/>
      {dailyPerformance?dailyPerformance[getDeptIndex(dept)]?<Container disableGutters sx={{display: 'flex', flexDirection:'row'}} >
        {/* <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"2px", minWidth:'150px'}}>
          <Typography fontSize={28} sx={{ margin:'15px 20px 5px 20px', textAlign:'center'}}>{dailyPerformance[getDeptIndex(dept)]['man_power']}</Typography>
          <Typography color={grey[400]} fontSize={18} sx={{ margin:'5px 10px 10px 10px', textAlign:'center'}}>Man Power</Typography>
        </Paper>
        <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"2px", minWidth:'170px'}}>
          <Typography fontSize={28} sx={{ margin:'15px 20px 5px 20px', textAlign:'center'}}>{dailyPerformance[getDeptIndex(dept)]['production']} <span style={{color:grey[400],fontSize:22}}>/{dailyPerformance[getDeptIndex(dept)]['target']}</span></Typography>
          <Typography color={grey[400]} fontSize={18} sx={{ margin:'5px 10px 10px 10px', textAlign:'center'}}>Production/Target</Typography>
        </Paper> */}
        <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"2px", minWidth:'120px'}}>
          <Typography fontSize={24} sx={{ margin:'5px 0px 0px 0px', textAlign:'center'}}>{dailyPerformance[getDeptIndex(dept)]['man_power']}</Typography>
          <Typography color={grey[400]} fontSize={16} sx={{ margin:'10px 0px 5px 0px', textAlign:'center'}}>Man Power</Typography>
        </Paper>
        <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"2px", minWidth:'120px'}}>
          <Typography fontSize={24} sx={{ margin:'5px 0px 0px 0px', textAlign:'center'}}>{dailyPerformance[getDeptIndex(dept)]['target']}</Typography>
          <Typography color={grey[400]} fontSize={16} sx={{ margin:'10px 0px 5px 0px', textAlign:'center'}}>Target</Typography>
        </Paper>
        <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"2px", minWidth:'120px'}}>
          <Typography fontSize={30} sx={{ margin:'5px 0px 0px 0px', textAlign:'center'}} >{dailyPerformance[getDeptIndex(dept)]['production']}</Typography>
          <Typography color={grey[400]} fontSize={16} sx={{ margin:'10px 0px 5px 0px', textAlign:'center'}}>Production</Typography>
        </Paper>
        <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"2px", minWidth:'170px'}}>
          <Typography color={blue[500]} margin={'5px 0px 0px 0px'} fontSize={40}>{(parseInt(dailyPerformance[getDeptIndex(dept)]['production'])/parseInt(dailyPerformance[getDeptIndex(dept)]['target'])*100).toFixed(2)}<span style={{fontSize:'22px', color:blue[200]}}>%</span></Typography>
          <Typography color={grey[400]} fontSize={18} sx={{ margin:'5px 10px 10px 10px', textAlign:'center'}}>Achievement</Typography>
        </Paper>
        <Paper elevation={0} sx={{border:1, backgroundColor: blue[500] ,borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"2px", minWidth:'200px'}}>
          <Typography color='white' margin={'5px 0px 0px 0px'} fontWeight='bold' fontSize={50}>{(parseInt(dailyPerformance[getDeptIndex(dept)]['earn_minute'])/parseInt(dailyPerformance[getDeptIndex(dept)]['available_minute'])*100).toFixed(2)}<span style={{fontSize:'22px', color:blue[100]}}>%</span></Typography>
          <Typography color={grey[200]} fontSize={18} sx={{ margin:'5px 10px 10px 10px', textAlign:'center'}}>Efficiency</Typography>
        </Paper>
      </Container>:<Typography>No data to show</Typography>:<Typography>No data to show</Typography>}
     {/* {monthlyPerformance?<Linechart data={getMonthlyDatabyDept(monthlyPerformance, dept)} suffix='%'/>:null} */}
    <br/>
    <br/>
    <Chart
      chartType="LineChart"
      data={getMonthlyDatabyDept(monthlyPerformance, dept)}
      width="100%"
      height="400px"
      options={options} 
    />
    </Container>
  )
}

export default PerformanceSummary