import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { Box, Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React from 'react'
import { Sub2 } from './customTexts'

export const CustomDatePickUi = ({AdapterDayjs, date, handleChange}) => {
  return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Date"
                inputFormat="DD MMMM, YYYY"
                value={date}
                onChange={handleChange}
                components={{
                OpenPickerIcon: () => <KeyboardArrowDown  />
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (<Button sx={{boxShadow: 0,  width:'fit-content', alignSelf:'center' ,color:'black', margin:'0px', boxShadow: 0}} ref={inputRef} ><Sub2>{inputProps.value}</Sub2> {InputProps.endAdornment}</Button>)}
            />
        </LocalizationProvider>
    
  )
}


export const CustomMonthPickUi = ({AdapterDayjs, month, handleChange}) => {
  return (
    <Box sx={{"&.Mui-selected .MuiIconButton-root":{color:blue[600]}}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
              views={['year', 'month']}
              minDate={dayjs('2022-01-01')}
              maxDate={dayjs()}
              value={month}
              components={{
                OpenPickerIcon: () => <KeyboardArrowDown />
              }}
              onChange={handleChange}
              renderInput={({ inputRef, inputProps, InputProps }) => (<Box sx={{display:'flex', alignItems:'center', color:'primary', margin:'0px 0px 0px 0px'}} ref={inputRef} >{inputProps.value} {InputProps.endAdornment}</Box>)}

            />
          </LocalizationProvider>
      </Box>
  )
}

