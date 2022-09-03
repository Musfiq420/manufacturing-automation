import { Button, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { checkUsernamePasswordTemp } from '../../store/account-Slice';
import store from '../../store/str';
import HeaderText from '../common/headerText';
import LoginForm from '../common/loginForm';

const LoginView = () => {
    const [admin, setAdmin] = useState(true);
   const handleSubmit = (username, password) => {
    store.dispatch(checkUsernamePasswordTemp({username: username, password: password, admin: admin}))
   }

  return (
    <div>
        {admin?<HeaderText>Admin</HeaderText>:<HeaderText>Viewer</HeaderText>}
        <LoginForm handleSubmit={handleSubmit} />
        {admin?<Typography>Only a viewer?</Typography>:<Typography>Admin user?</Typography>}
        <Button onClick={() => setAdmin(!admin)}>{admin?"Log in as a Viewer":"Log in as an Admin"}</Button>
           
    </div>
  )
}

export default LoginView;