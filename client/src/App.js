import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/login';
import AdminPanel from './pages/admin';
import MachineDatabase from './pages/machinedb';
import Sidebar from './components/layout/sidebar';
import HourlyProduction from './pages/hourlyProduction';
import Performance from './pages/performance';
import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';


function App() {
  const loggedIn = useSelector((state) => state.account.loggedIn);

  return (
    
      <Grid container direction='row' md={12}>
        <ToastContainer />
        
        {loggedIn?
        <Grid item md={2} sm={2}>
          <Sidebar />
        </Grid>
        :null}
        <Grid item md={10} sm={10}>
            <Routes>
              <Route path="/" element={loggedIn?<Navigate replace to="/machinedb" />:<Navigate replace to="/login" />} />
              <Route path="/login" element= {<Login />} />
              <Route path="/machinedb" element={loggedIn?<MachineDatabase />:<Navigate replace to="/login" />} />
              <Route path="/performance" element={loggedIn?<Performance />:<Navigate replace to="/login" />} />
              <Route path="/hourlyproduction" element={loggedIn?<HourlyProduction />:<Navigate replace to="/login" />} />
              <Route path="/admin" element={loggedIn?<AdminPanel />:<Navigate replace to="/login" />} />
            </Routes>
        </Grid>
        
      </Grid>
      
    
  );
}

export default App;