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
        <Container disableGutters sx={{display:'flex', justifyContent:'start', flexWrap:'wrap'}}>
        {data?data.map((e) => {
          return <CustomCard title={e.name} body={e.quantity} types={e.types}/>
        }):null}
      </Container>
    </>
  )
}


const CustomCard = ({title, body, types}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Card variant='outlined' sx={{display:'flex', flexDirection:'column',  justifyContent:'space-between', alignItems:'center', minWidth:'80px', borderColor:grey[200], backgroundColor:grey[100], margin:'5px'}} elevation={0}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <h5 style={{width:'100px', color:'gray',margin:'10px 0px 10px 0px'}}>{title}</h5>
          <h3 style={{margin:'5px 0px 10px 0px', }}>{body}</h3>
        </div>
       
          <>
          <IconButton disabled={types?undefined:'true'} onClick={handleClick} sx={{padding:0}}>
          <KeyboardArrowDownIcon sx={types?{color:blue[500]}:{color:blue[50]}} />
          </IconButton>
          
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        ><Typography fontWeight='bold' sx={{textAlign:'center', padding:'5px'}}>{title} machine types</Typography>
          {types?<Container disableGutters  sx={{display:'flex', flexDirection:'row', padding:'0px 5px', flexWrap:'wrap', maxWidth:'570px', justifyContent:'flex-start'}}>
            
            {types.map((e) => {
              return (<Card variant='outlined' sx={{margin:'5px',height:'100px', width:'100px',display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <h6 style={{color:'gray',margin:'5px'}}>{e.name}</h6>
                <h3 style={{margin:'5px 5px 10px 5px', }}>{e.quantity}</h3>
              </Card>)
            })} 
          </Container>:null}
        </Popover></>
            
            
      </Card>
    </>
  )
}


export default CustomCards