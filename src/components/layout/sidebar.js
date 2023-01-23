import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import { accAct } from '../../store/account-Slice';
import { Box, Drawer, Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/system';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../core/supabaseClient';
import { H4, H5, H6 } from '../common/customTexts';
import { SizedBoxSmall } from '../common/sizedBox';
import { BoxSmall, FlexRowCenterSmall } from '../common/customBox';
import pic from '../../assets/logo512.png';


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
    

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if(error){
      console.log('error: '+error);
    }
    else {
      dispatch(accAct.logout());
    }
    
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
        <FlexRowCenterSmall>
        <BoxSmall>
          <img src={pic} height={30}/>
        </BoxSmall>
        <BoxSmall>
          <H4 color='gray' fontWeight='normal'>Dashboard</H4>
        </BoxSmall>
        
        
        </FlexRowCenterSmall>
        
        <List>
            <ListItemButton sx={stl} selected={window.location.pathname==="/performance"} onClick={() => linkTO('performance')} >
                <ListItemText primary="Performance Overview" /> 
            </ListItemButton>
            <ListItemButton sx={stl} selected={window.location.pathname==="/sewingPerformance"} onClick={() => linkTO('sewingPerformance')} >
                <ListItemText primary="Sewing Performance" /> 
            </ListItemButton>
            <ListItemButton sx={stl} selected={window.location.pathname==="/machinedb"} onClick={() => linkTO('machinedb')} >
                <ListItemText primary="Machine Database" /> 
            </ListItemButton>
            {/* {admin==="yes"? <ListItemButton sx={stl} selected={window.location.pathname==="/admin"} onClick={() => linkTO('admin')} >
                <ListItemText primary="Admin Panel" />
            </ListItemButton>:null} */}
            <ListItemButton sx={stl} onClick={handleLogout}>
                <ListItemText primary="Log out" />
            </ListItemButton>
        </List>
       </Drawer>
  )
}

export default Sidebar;