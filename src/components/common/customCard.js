import { Container, Paper, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React from 'react'

export const CustomCardWhite = ({data, caption}) => {
  return (
    <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'column', justifyContent:'center', margin:"0 5px", minWidth:'120px'}}>
        <Typography fontSize={30} sx={{ margin:'5px 0px 0px 0px', textAlign:'center'}}>{data}</Typography>
        <Typography color={grey[400]} fontSize={16} sx={{ margin:'10px 0px 5px 0px', textAlign:'center'}}>{caption}</Typography>
    </Paper>
  )
}

export const CustomCardBlue = ({data, caption}) => {
  return (
    <Paper elevation={0} sx={{border:1, backgroundColor: blue[500] ,borderColor: grey[300], display:'flex',  margin:"0 5px",  minWidth:'170px'}}>
      <Container sx={{margin:'5px 10px 10px 10px', display:'flex', flexDirection:'column', justifyContent:'center',}}>
        <Typography color='white' margin={'5px 0px 0px 0px'} fontWeight='bold' fontSize={30}>{data}</Typography>
        <Typography color={grey[200]} fontSize={16} sx={{ margin:'5px 10px 0px 10px', textAlign:'center'}}>{caption}</Typography>
      </Container>
    </Paper>
  )
}

