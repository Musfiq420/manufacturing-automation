import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/login';
import MachineDatabase from './pages/machinedb';
import Sidebar from './components/layout/sidebar';
import Performance from './pages/performance';
import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import SewingPerformance from './pages/sewingPerformance';


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
        <Grid item md={loggedIn?10:12} sm={loggedIn?10:12}>
            <Routes>
              <Route path="/" element={loggedIn?<Navigate replace to="/performance" />:<Navigate replace to="/login" />} />
              <Route path="/login" element= {loggedIn?<Navigate replace to="/performance" />:<Login />} />
              <Route path="/machinedb" element={loggedIn?<MachineDatabase />:<Navigate replace to="/login" />} />
              <Route path="/performance" element={loggedIn?<Performance />:<Navigate replace to="/login" />} />
              <Route path="/sewingPerformance" element={loggedIn?<SewingPerformance />:<Navigate replace to="/login" />} />
            </Routes>
        </Grid>
        
      </Grid>
      
    
  );
}

export default App;