import { Box, CircularProgress, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';

const CustomProgressBars = ({data}) => {
  return (
    <>
        <Container sx={{display:'flex',  justifyContent:'start', flexWrap:'wrap'}}>
        {(data).map((e) => {
          return <CustomProgressBar title={e.type} body={e.util}/>
        })}
      </Container>
    </>
  )
}


export const CustomProgressBar = ({title, body}) => {
  return (
    <>
    <Container sx={{height:'120px',width:'150px', margin:'40px 0px'}}>
      <div style={{height:'120px',display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
        <Typography sx={{color:'gray',margin:'10px 0', fontSize:'14px', fontWeight:'bold'}}>{title}</Typography>
        <CircularProgressWithLabel size={80} variant="determinate" value={parseInt(body)} />
      </div>
    </Container>
    </>
  )
}


export function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary" sx={{fontStyle:'oblique'}}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default CustomProgressBars;