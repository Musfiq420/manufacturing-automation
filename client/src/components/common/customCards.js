import { Button, Card, Collapse, Container, IconButton, Paper, Popover, styled, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomCards = ({data}) => {
  return (
    <>
        <Container disableGutters sx={{display:'flex', justifyContent:'start', flexWrap:'wrap', marginLeft:'50px', marginTop:'20px'}}>
        {data?Object.keys(data).map((e) => {
          return <CustomCard title={e} body={data[e]}/>
        }):null}
      </Container>
    </>
  )
}


const CustomCard = ({title, body, types}) => {
  

  return (
    <>
      <Card variant='outlined' sx={{display:'flex', flexDirection:'row',  justifyContent:'space-between', alignItems:'center',  borderColor:grey[200], backgroundColor:grey[100], margin:'10px'}} elevation={0}>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <h5 style={{width:'100px', color:'gray',margin:'10px 0px 10px 0px'}}>{title}</h5>
          <h3 style={{margin:'5px 0px 10px 0px', }}>{body}</h3>
        </div>  
      </Card>
    </>
  )
}


export default CustomCards