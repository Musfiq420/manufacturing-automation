import { Container, Paper } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'

const CustomCards = ({data}) => {
  return (
    <>
        <Container sx={{display:'flex', justifyContent:'start', flexWrap:'wrap'}}>
        {Object.keys(data).map((e) => {
          return <CustomCard title={e} body={data[e]}/>
        })}
      </Container>
    </>
  )
}


const CustomCard = ({title, body}) => {
  return (
    <>
        <Paper sx={{height:'100px',width:'110px', backgroundColor:blue[50], margin:2}} elevation={0}>
          <div style={{height:'100px',display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <h5 style={{color:'gray',margin:'10px 5px 5px 5px'}}>{title}</h5>
              <h3 style={{margin:'5px 5px 15px 5px', justifyContent:'flex-end'}}>{body}</h3>
          </div>
      </Paper>
    </>
  )
}


export default CustomCards