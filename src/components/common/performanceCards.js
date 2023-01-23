import { Paper, Container ,Typography, Divider } from "@mui/material"
import { blue, grey } from "@mui/material/colors"



// export const PerformanceCards = ({data}) => {

//   function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }
  

//   return(
//     <>
//     <Container sx={{display:'flex', flexDirection:'column',justifyContent:'start', flexWrap:'wrap'}}>
//       {data.map((e) => {
//           return <PerformanceCard data={e}/>
//         })}
//       </Container>
//     </>
//   )


// }



export const PerformanceCard = ({data}) => {

   

    return (
      
          
          <Paper elevation={0} sx={{border:1, borderColor: grey[300], display:'flex', flexDirection:'row', justifyContent:'space-between', margin:"2px", minWidth:'250px'}}>
            <div>
            <div style={{margin:'5px 0px 0px 10px'}}>
              <Typography  sx={{textAlign:'start'}} fontSize={12} fontWeight='bold'>{data['department']}</Typography>
              <Divider color={blue[400]}/>
            </div>
              <Typography fontSize={20} sx={{ margin:'10px 0px 0px 10px', textAlign:'start'}}>{data['man_power']}</Typography>
              <Typography color={grey[400]} fontSize={10} sx={{ margin:'0px 0px 0px 10px', textAlign:'start'}}>Man Power</Typography>
              <Typography  fontSize={20} sx={{ margin:'15px 0px 0px 10px', textAlign:'start'}}>{data['production']} <span style={{color:grey[400],fontSize:12}}>/{data['target']}</span></Typography>
              <Typography color={grey[400]} fontSize={10} sx={{ margin:'0px 0px 0px 10px', textAlign:'start'}}>Production/Target</Typography>
            </div>
            <div style={{margin:'5px'}}>
            <br/>
              <Typography color={blue[500]} margin={'5px 0px 0px 0px'} fontSize={23}>{(parseInt(data['production'])/parseInt(data['target'])*100).toFixed(2)}<span style={{fontSize:'16px', color:blue[200]}}>%</span></Typography>

              <Typography color={grey[400]} margin={'0px 5px 0px 0px'} fontSize={10}>Achievement</Typography>
              
              <Typography color={blue[500]} margin={'12px 0px 0px 0px'} fontSize={23}>{(parseInt(data['earn_minute'])/parseInt(data['available_minute'])*100).toFixed(2)}<span style={{fontSize:'16px', color:blue[200]}}>%</span></Typography>           

              <Typography color={grey[400]} margin={'0px 5px 0px 0px'} fontSize={10}>Efficiency</Typography>
            </div>
        </Paper>
    )
  }