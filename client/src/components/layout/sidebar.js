import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import { accAct } from '../../store/account-Slice';
import { Box, Drawer, Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/system';


const StyledPara = styled('div')(({clr})=> ({
  color:clr?'pink':'black'
}));



const stl = {
  '&.Mui-selected':{
    backgroundColor: blue[100]
  }, 
  '&:hover':{
    backgroundColor: blue[50]
  },
  '&.Mui-selected:hover':{
    backgroundColor: blue[100]
  }
}


const Sidebar = () => {
    const admin = useSelector((state) => state.account.admin);
    const dispatch = useDispatch();
    const [pathname, setPathname] = useState(window.location.pathname);
    const nav = useNavigate();
    

  const handleLogout = () => {
    dispatch(accAct.logout());
  }


    const linkTO = (dest) => {
        //setPathname(window.location.pathname);
        nav(dest);
      }
  return (
        // <ProSidebar width="200px"  > 
        //     <Menu iconShape="square">
        //     <MenuItem active={pathname === "/dashboard/home"} onClick={linkTO}>Home <Link to="home"/></MenuItem>
        //     {admin==="yes"?<MenuItem active={pathname === "/dashboard/admin"} onClick={linkTO}>Admin Panel <Link to="admin"/></MenuItem>:null}
        //     <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        //     </Menu>
        // </ProSidebar>
        
            <Drawer
        variant="persistent"
        anchor="left"
        open={true}
         PaperProps={{sx:{width:'16.666667%'}}}
         
      >
        <List>
            <ListItemButton sx={stl} selected={window.location.pathname==="/machinedb"} onClick={() => linkTO('machinedb')} >
                <ListItemText primary="Machine Database" /> 
            </ListItemButton>
            <ListItemButton sx={stl} selected={window.location.pathname==="/performance"} onClick={() => linkTO('performance')} >
                <ListItemText primary="Performance Overview" /> 
            </ListItemButton>
            <ListItemButton sx={stl} selected={window.location.pathname==="/hourlyproduction"} onClick={() => linkTO('hourlyproduction')} >
                <ListItemText primary="Real Time Production" /> 
            </ListItemButton>
            {admin==="yes"? <ListItemButton sx={stl} selected={window.location.pathname==="/admin"} onClick={() => linkTO('admin')} >
                <ListItemText primary="Admin Panel" />
            </ListItemButton>:null}
            <ListItemButton sx={stl} onClick={handleLogout}>
                <ListItemText primary="Log out" />
            </ListItemButton>
        </List>
       </Drawer>
  )
}

export default Sidebar;