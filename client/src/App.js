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


function App() {
  const loggedIn = useSelector((state) => state.account.loggedIn);

  return (
    <div className='App'>
      <ToastContainer />
      {loggedIn?<Sidebar />:null}
      <div style={loggedIn?{marginLeft: '200px'}:{}}>
        <Routes>
          <Route path="/" element={loggedIn?<Navigate replace to="/machinedb" />:<Navigate replace to="/login" />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/machinedb" element={loggedIn?<MachineDatabase />:<Navigate replace to="/login" />} />
          <Route path="/performance" element={loggedIn?<Performance />:<Navigate replace to="/login" />} />
          <Route path="/hourlyproduction" element={loggedIn?<HourlyProduction />:<Navigate replace to="/login" />} />
          <Route path="/admin" element={loggedIn?<AdminPanel />:<Navigate replace to="/login" />} />
        </Routes>
        </div>
    </div>
  );
}

export default App;