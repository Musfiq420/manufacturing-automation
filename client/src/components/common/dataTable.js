import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useSelector } from 'react-redux';
import { Container } from '@mui/system';
import styled from '@emotion/styled';
import { blue, grey } from '@mui/material/colors';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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
    obj.push({name:element.name, quantity:element.quantity, types:element.types, expand:false})
  });
  return obj;
}

function EnhancedTableHead(props) {
  return (
    <TableHead sx={{backgroundColor:blue[400]}}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={0}
            sx={{color:'white', fontWeight:'bold'}}
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

const ExpandTable = ({row, index}) => {
  const [selected, setSelected] = React.useState(false);

  const handleExpand = () => {
    setSelected(!selected);
  }

  return (
    <>
      <TableRow
        tabIndex={-1}
        key={row.name}
      >
        <TableCell sx={{width:'30px', padding:0}}>
          <IconButton disabled={row.types?undefined:'true'} onClick={handleExpand}>
            <KeyboardArrowDown />
          </IconButton>
        </TableCell>
        
        <TableCell
          component="th"
          scope="row"
        >
           {row.name}
        </TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
      </TableRow>
     {
        ( selected?
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

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = useSelector((state) => state.machinedb.typeWise);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Container sx={{display:'flex', justifyContent:'center'}}>
    <Box sx={{ minWidth:'700px' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
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
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <ExpandTable row={row} index={index} />
                    // <>
                    // <TableRow                      
                    //   tabIndex={-1}
                    //   key={row.name}
                      
                    // >
                      
                    //   <TableCell sx={{width:'30px', padding:0}}>
                    //     <IconButton>
                    //       <KeyboardArrowDown  />
                    //     </IconButton>
                    //   </TableCell>
                     
                      
                    //   <TableCell
                    //     component="th"
                    //     id={labelId}
                    //     scope="row"
                    //   >
                    //    {(page * rowsPerPage) + index+1}. {row.name}
                    //   </TableCell>
                    //   <TableCell align="right">{row.quantity}</TableCell>
                    // </TableRow>
                    // {
                    //   (row.types?
                    //     row.expand?
                    //   <>{row.types.map((e) => {
                    //     return (
                    //       <TableRow>
                    //         <TableCell>

                    //         </TableCell>
                    //         <TableCell sx={{paddingLeft:'50px'}}>
                    //           {e.name}
                    //         </TableCell>
                    //         <TableCell>
                    //           {e.quantity}
                    //         </TableCell>
                    //       </TableRow>
                    //     )
                    //   })}</>: null:null)
                      
                    // }
                    // </>
                    
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: ( 53) * emptyRows,
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
    </Container>
    
  );
}
