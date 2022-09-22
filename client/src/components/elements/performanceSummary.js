//weekly, monthly, 3 months, 6 months
import { Button, Container, IconButton, Input, InputAdornment, Menu, MenuItem, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PerformanceCard, PerformanceCards } from '../common/performanceCards';
import { useDispatch } from 'react-redux';
import { getProductionByDate, getProductionByDateRange, getProductionByMonth } from '../../store/productionDbSlice';
import { DatePicker, DesktopDatePicker, LocalizationProvider, MonthPicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DropDownList from '../common/dropDownList';
import { Box } from '@mui/system';
import { blue, grey } from '@mui/material/colors';
import CustomToggleGroup from '../common/customToggleGroup';
import { CustomProgressBar } from '../common/customProgressBar';
import { styled } from '@mui/material/styles';
import Linechart from '../common/lineChart';
import { Chart } from "react-google-charts";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import MiniChart from 'react-mini-chart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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
    const [month, setMonth] = useState(dayjs('2022-08-18T21:11:54'));
    const [chartSelection, setChartSelection] = useState('select a month');

    const dailyPerformance = useSelector((state) => state.productiondb.dailyData);
    const monthlyPerformance = useSelector((state) => state.productiondb.monthlyData);
    const dispatch = useDispatch();

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickMonth = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMonth = () => {
      setAnchorEl(null);
    };


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
      // dispatch(getProductionByMonth({month: (newValue.month() + 1).toString().length > 1 ? (newValue.month() + 1).toString() : '0' + (newValue.month() + 1).toString()}))
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
            const dateee = element['date'].substring(6, 10) + '-' + element["date"].substring(0, 2) + '-' +element["date"].substring(3, 5);
            console.log(dateee);
            const d = new Date(dateee)
            //  const d = (element["date"].substring(3, 5) + ',' + monthNames[parseInt(element["date"].substring(0, 2))-1]).substring(0,6);
            const e = parseFloat(((parseInt(element['earn_minute'])/parseInt(element['available_minute']))));
            dataArray.push([d, e, `date of month: ${d.toLocaleDateString()}\nefficiency: ${(e*100).toFixed(2)}%`])
            
          }
        });
      }
      

      return dataArray;
    }

    const handleChartSelection = (event, newSelection) => {
      if(newSelection!==null)
      {
        setChartSelection(newSelection);
        if(newSelection==="select a month")
        {
          dispatch(getProductionByMonth({month: (month.month() + 1).toString().length > 1 ? (month.month() + 1).toString() : '0' + (month.month() + 1).toString()}))
        }
      }
      
    };


    useEffect(() => {
      dispatch(getProductionByDate({date: getFormattedDate(date)}))
      dispatch(getProductionByMonth({month: (date.month() + 1).toString().length > 1 ? (date.month() + 1).toString() : '0' + (date.month() + 1).toString()}))
      
    }, [])
   
    const onDateRangeClick = (mode) => {
     const sub = mode==="last 7 days"?7:mode==="last 30 days"?30:mode==="last 3 months"?90:mode==="last 6 months"?180:0;
      // console.log('from: '+getFormattedDate(date.subtract(1,'days'))+' to: '+getFormattedDate(date.subtract(7,'days')));
      dispatch(getProductionByDateRange({startDate: getFormattedDate(date.clone().subtract(sub, 'day')), endDate: getFormattedDate(date.clone().subtract(1, 'day'))}))
    }

  const options = {
    title: chartSelection==="select a month"?
      `Efficiency trend for ${monthNames[month.month()]}, ${month.year()}`:
      `Efficiency trend for ${chartSelection}`
      ,
    titleTextStyle: {
      fontSize: 20
    },
    hAxis: {
      title: "Date",
      format: 'dd MMM',
      gridlines: {
        count: chartSelection==="select a month"?30:chartSelection==="last 7 days"?7:chartSelection==="last 30 days"?30:chartSelection==="last 3 months"?3:chartSelection==="last 6 months"?6:30,
      },
      textStyle : {
        fontSize: 10 // or the number you want
    }
      
    },
    vAxis: {
      title: "Efficiency",
      format: 'percent'
    },
    trendlines: {
      0: {
        type: 'polynomial',
        color: blue[300],
        enableInteractivity: false,
        opacity: 0.6,
      }
    },
    
  };

  return (
    <Container sx={{ justifyContent:'start'}}>
      <Container sx={{display:'flex', justifyContent:'center'}}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent:'center',
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
      </Container>
      <br />
      <br />
      <br />
      <br />
      <Container disableGutters sx={{display: 'flex', flexDirection:'column', justifyContent:'center', width:'200px'}}>
          <Typography sx={{padding:0,margin:0}} fontSize={25} fontWeight='bold' alignSelf='center'>Daily Report</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                  label="Date"
                  inputFormat="DD MMMM, YYYY"
                  value={date}
                  onChange={handleChange}
                  renderInput={({ inputRef, inputProps, InputProps }) => (<Button variant="outlined" sx={{color:'black', margin:'10px 0px 0px 0px'}} ref={inputRef} >{inputProps.value} {InputProps.endAdornment}</Button>)}
                //   renderInput={({ inputRef, inputProps, InputProps }) => (
                //       <Container disableGutters sx={{display:'flex',  flexDirection:'column', padding:0, margin:0, width:'200px'}}>
                //         <Typography sx={{padding:0,margin:0}} fontSize={25} fontWeight='bold' alignSelf='center'>Daily Report</Typography>
                //         <Container disableGutters sx={{display:'flex',justifyContent:'center', padding:0, margin:0}}>
                //           <Typography alignSelf='center' fontSize={16} sx={{marginTop:'10px', marginRight:'0px',opacity:'70%'}}>{inputProps.value}</Typography>
                //           <Box  ref={inputRef} sx={{"& .MuiIconButton-root":{padding:1, alignSelf:'center', top:'20px', right:'10px',opacity:'70%'}}} >
                //           {InputProps?.endAdornment}
                //           </Box>
                //         </Container>
                        
                //       </Container> 
                // )}
                />
            </LocalizationProvider>
      </Container>
      <br/>
      {dailyPerformance?dailyPerformance[getDeptIndex(dept)]?<Container disableGutters sx={{display: 'flex', flexDirection:'row', justifyContent:'center'}} >
        <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"0 5px", minWidth:'120px'}}>
          <Typography fontSize={30} sx={{ margin:'5px 0px 0px 0px', textAlign:'center'}}>{dailyPerformance[getDeptIndex(dept)]['man_power']}</Typography>
          <Typography color={grey[400]} fontSize={16} sx={{ margin:'10px 0px 5px 0px', textAlign:'center'}}>Man Power</Typography>
        </Paper>
        <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"0 5px", minWidth:'120px'}}>
          <Typography fontSize={30} sx={{ margin:'5px 0px 0px 0px', textAlign:'center'}}>{dailyPerformance[getDeptIndex(dept)]['target']}</Typography>
          <Typography color={grey[400]} fontSize={16} sx={{ margin:'10px 0px 5px 0px', textAlign:'center'}}>Target</Typography>
        </Paper>
        <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"0 5px", minWidth:'120px'}}>
          <Typography fontSize={30} sx={{ margin:'5px 0px 0px 0px', textAlign:'center'}} >{dailyPerformance[getDeptIndex(dept)]['production']}</Typography>
          <Typography color={grey[400]} fontSize={16} sx={{ margin:'10px 0px 5px 0px', textAlign:'center'}}>Production</Typography>
        </Paper>
        <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"0 5px", minWidth:'170px'}}>
          <Typography color={blue[500]} margin={'5px 0px 0px 0px'} fontSize={30}>{(parseInt(dailyPerformance[getDeptIndex(dept)]['production'])/parseInt(dailyPerformance[getDeptIndex(dept)]['target'])*100).toFixed(2)}<span style={{fontSize:'22px', color:blue[200]}}>%</span></Typography>
          <Typography color={grey[400]} fontSize={16} sx={{ margin:'5px 10px 10px 10px', textAlign:'center'}}>Achievement</Typography>
        </Paper>
        <Paper elevation={0} sx={{border:1, backgroundColor: blue[500] ,borderColor: grey[300], display:'flex',  margin:"0 5px",  minWidth:'170px'}}>
          <Container sx={{margin:'5px 10px 10px 10px', display:'flex', flexDirection:'column', justifyContent:'center',}}>
            <Typography color='white' margin={'5px 0px 0px 0px'} fontWeight='bold' fontSize={30}>{(parseInt(dailyPerformance[getDeptIndex(dept)]['earn_minute'])/parseInt(dailyPerformance[getDeptIndex(dept)]['available_minute'])*100).toFixed(2)}<span style={{fontSize:'22px', color:blue[100]}}>%</span></Typography>
            <Typography color={grey[200]} fontSize={16} sx={{ margin:'5px 10px 0px 10px', textAlign:'center'}}>Efficiency</Typography>
          </Container>
          {/* <Container disableGutters sx={{display:'flex', flexDirection:'column', justifyContent:'center',}}>
            <TrendingUpIcon sx={{padding:'10px', color:'white'}} />
          </Container> */}
          
        </Paper>
      </Container>:<Typography>No data to show</Typography>:<Typography>No data to show</Typography>}
     {/* {monthlyPerformance?<Linechart data={getMonthlyDatabyDept(monthlyPerformance, dept)} suffix='%'/>:null} */}
    <br/>
    <br/>
    <br/>
    <br/>
    <ToggleButtonGroup
      value={chartSelection}
      exclusive
      onChange={handleChartSelection}
      aria-label="text alignment"
      sx={{display:'flex', justifyContent:'center'}}
    >
      <ToggleButton value="select a month" >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
              views={['year', 'month']}
              // label="Year and Month"
              minDate={dayjs('2021-01-01')}
              maxDate={dayjs()}
              value={month}
              onChange={(newValue) => {
                setMonth(newValue);
                dispatch(getProductionByMonth({month: (newValue.month() + 1).toString().length > 1 ? (newValue.month() + 1).toString() : '0' + (newValue.month() + 1).toString()}))
              }}
              renderInput={(params) => <Input sx={{maxWidth:'160px'}} disableUnderline={true} {...params} endAdornment={params.InputProps.endAdornment}></Input>}
            />
          </LocalizationProvider>
      </ToggleButton>
      <ToggleButton value="last 7 days" onClick={() => onDateRangeClick("last 7 days")} >
        <Typography fontSize={12} >Last 7 days</Typography>
      </ToggleButton>
      <ToggleButton value="last 30 days"  onClick={() => onDateRangeClick("last 30 days")}>
        <Typography fontSize={12} >Last 30 days</Typography>
      </ToggleButton>
      <ToggleButton value="last 3 months" onClick={() => onDateRangeClick("last 3 months")}>
        <Typography fontSize={12} >Last 3 Months</Typography>
      </ToggleButton>
      <ToggleButton value="last 6 months" onClick={() => onDateRangeClick("last 6 months")}>
        <Typography fontSize={12} >Last 6 Months</Typography>
      </ToggleButton>
      
    </ToggleButtonGroup>
    
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