import { Container, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React from 'react'
import { styled } from '@mui/material/styles';

export const BasicToggleGroup = ({value, onChange, data, label}) => {

  return (
    <Container sx={{display:'flex', justifyContent:'start'}}>
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={onChange}
        aria-label="Platform"
        >
        {
           !label? data.map((e) => {
                return (<ToggleButton value={e}>{e}</ToggleButton>)
            }):
            data.map((e, i) => {
              return (<ToggleButton value={e}>{label[i]}</ToggleButton>)
          })
        }
      </ToggleButtonGroup>
    </Container>
  )
}



export const CustomToggleGroupSmall = ({value, handleChange, data, handleElementClick}) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="text alignment"
      color="primary"
      
    >
      {data.map((e) => {
        return (<ToggleButton sx={e.sx?e.sx:null} value={e.value} aria-label="left aligned" onClick={() => handleElementClick(e.value)}>
         {e.ui}
        </ToggleButton>)
      })}
      
    </ToggleButtonGroup>
  )
}


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


export const CustomToggleGroupBig = ({data, value, handleSelectDept}) => {
return (
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
          value={value}
          exclusive
          onChange={handleSelectDept}
          aria-label="text alignment"
        >
          {data.map((e) => {
        return (<StyledToggleButton value={e} sx={{color:grey[300], fontSize:20}} aria-label="left aligned">
         {e}
        </StyledToggleButton>)
      })}
        </StyledToggleButtonGroup>
        </Paper>
)
}
