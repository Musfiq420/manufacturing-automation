import { Button, Container, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PerformanceCard, PerformanceCards } from '../common/performanceCards';
import { useDispatch } from 'react-redux';
import { getProductionByDate } from '../../store/productionDbSlice';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DropDownList from '../common/dropDownList';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';


const PerformanceSummary = () => {

    const [dept, setDept] = useState('Cutting');
    const [date, setDate] = useState(dayjs('2022-08-18T21:11:54'))
    const [option, setOption] = useState('web')
    const dailyPerformance = useSelector((state) => state.productiondb.dailyData);
    const dispatch = useDispatch();
    



    function getFormattedDate(date) {
      var year = date.year();

      var month = (1 + date.month()).toString();
      month = month.length > 1 ? month : '0' + month;
    
      var day = date.date().toString();
      day = day.length > 1 ? day : '0' + day;
      console.log(month + '/' + day + '/' + year)
      return month + '/' + day + '/' + year;
    }

    const handleSelectDept = (event) => {
      
        setDept(event.target.value);
      
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
      dispatch(getProductionByDate({date: getFormattedDate(newValue)}))
    };

    const handleSelectDateOptions = (event, newOption) => {
      if (newOption !== null) {
        setOption(newOption);
      }
    };


    useEffect(() => {
      console.log(dailyPerformance)
    }, [dailyPerformance])
    

  return (
    <Container sx={{display:'flex', flexDirection:'column', justifyContent:'start', padding:'0px 0px', margin:'0px'}}>
      <DropDownList title="Department" handleChange={handleSelectDept} value={dept} data={['Cutting', 'Embroidery', 'Printing', 'Sewing', 'Finishing']} />
      <br />
      <Container sx={{display: 'flex', justifyContent:'space-between'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={handleChange}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Paper variant='contained' sx={{border:1, borderColor: grey[200], display: 'flex', alignItems: 'center', padding:'15px', borderRadius:'5px'}}>
                      <Typography sx={{fontSize:'10px'}} ref={inputRef} {...inputProps}>{date.format('DD MMMM, YYYY')}</Typography>
                      {InputProps?.endAdornment}
                    </Paper>
                  )}
                />
            </LocalizationProvider>
        <br/>
      </Container>
      <br/>
      <Container sx={{display: 'flex', flexDirection:'row'}} >
        <PerformanceCard data={dailyPerformance[getDeptIndex(dept)]} />
      </Container>
     
    </Container>
    
    
    
  )
}

export default PerformanceSummary