import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const header = {
    "line": "Line",
    "machine-name": "Machine Name",
    "machine-id": "Machine ID",
    "lost-time": "Lost Time"
}

// const rows = [
//   {
//     "line": 23,
//     "machine-name": "Single Needle",
//     "machine-id": 3849483,
//     "lost-time": "56 mins"
//   },
//   {
//     "line": 3,
//     "machine-name": "Double Needle",
//     "machine-id": 3453554,
//     "lost-time": "16 mins"
//   },
//   {
//     "line": 65,
//     "machine-name": "Overlock",
//     "machine-id": 3949487,
//     "lost-time": "47 mins"
//   },
//   {
//     "line": 23,
//     "machine-name": "Single Needle",
//     "machine-id": 3849483,
//     "lost-time": "56 mins"
//   },
//   {
//     "line": 3,
//     "machine-name": "Double Needle",
//     "machine-id": 3453554,
//     "lost-time": "16 mins"
//   },
//   {
//     "line": 65,
//     "machine-name": "Overlock",
//     "machine-id": 3949487,
//     "lost-time": "47 mins"
//   },
//   {
//     "line": 23,
//     "machine-name": "Single Needle",
//     "machine-id": 3849483,
//     "lost-time": "56 mins"
//   },
//   {
//     "line": 3,
//     "machine-name": "Double Needle",
//     "machine-id": 3453554,
//     "lost-time": "16 mins"
//   },
//   {
//     "line": 65,
//     "machine-name": "Overlock",
//     "machine-id": 3949487,
//     "lost-time": "47 mins"
//   },
//   {
//     "line": 23,
//     "machine-name": "Single Needle",
//     "machine-id": 3849483,
//     "lost-time": "56 mins"
//   },
//   {
//     "line": 3,
//     "machine-name": "Double Needle",
//     "machine-id": 3453554,
//     "lost-time": "16 mins"
//   },
//   {
//     "line": 65,
//     "machine-name": "Overlock",
//     "machine-id": 3949487,
//     "lost-time": "47 mins"
//   }
// ];

export default function BasicTable() {

  const rows = useSelector((state) => state.machinedb.lostTime);
  console.log(rows)
  if(!rows)
    return <h1>Loading</h1>

  return (
    <TableContainer sx={{maxHeight:300}}  component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {
                Object.entries(header).map(([key, value]) => (<TableCell sx={{backgroundColor:blue[400], color:'white', fontWeight:'bold'}} key={key} >{value}</TableCell>))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            {
                Object.entries(row).map(([key, value]) => (<TableCell key={key} >{value}</TableCell>))
            }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}