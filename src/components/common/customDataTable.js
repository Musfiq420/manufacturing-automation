import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector } from 'react-redux';
import { Container } from '@mui/system';
import { blue } from '@mui/material/colors';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';



const headCells = [
  {
    id: 'icon',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Machine Name',
  },
  {
    id: 'qty',
    numeric: true,
    disablePadding: true,
    label: 'Quantity',
  },
  
];

const createData = (rows) => {
  const obj = []
  rows.forEach(element => {
    obj.push({type:element.type, count:element.count,  expand:false})
  });
  return obj;
}

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={0}
            sx={{backgroundColor:blue[400], color:'white', fontWeight:'bold', fontSize:18}}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Machine Summary
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const ExpandTable = ({row, index, handleExpand}) => {
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    setSelected(false);
  
  }, [row])
  

  return (
    <>
      <TableRow
        tabIndex={-1}
        key={row.type}
      >
        <TableCell sx={{width:'30px', padding:0}}>
          <IconButton disabled={row.types?undefined:'true'} onClick={() => setSelected(!selected)}>
            {selected?<KeyboardArrowUp />:<KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        
        <TableCell
          component="th"
          scope="row"
          sx={{fontSize:16}}
        >
           {row.type}
        </TableCell>
        <TableCell align="right" sx={{fontSize:16}}>{row.count}</TableCell>
      </TableRow>
     {
        ( selected&&row.types?
        <>{row.types.map((e) => {
          return (
            <TableRow>
              <TableCell>

              </TableCell>
              <TableCell sx={{paddingLeft:'50px'}}>
                {e.name}
              </TableCell>
              <TableCell>
                {e.quantity}
              </TableCell>
            </TableRow>
          )
        })}</>: null)
        
      } 
      </>
    
  );

}

export default function CustomDataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = useSelector((state) => state.machinedb.typeWise);
  console.log("ROWS : ",  rows);

  if(!rows)
    return <h1>Loading</h1>

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{display:'flex', justifyContent:'center', margin:'20px' }}>
      <Paper sx={{ width: '700px', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer sx={{height:400}}>
          <Table
            stickyHeader
            aria-labelledby="tableTitle"
            size= 'medium'
          >
            <EnhancedTableHead />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {createData(rows)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    <ExpandTable row={row} index={index} />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
    </Box>
    
  );
}
