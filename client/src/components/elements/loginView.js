import { Button, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { checkUsernamePasswordTemp } from '../../store/account-Slice';
import store from '../../store/str';
import {Body, Caption, H3, H5, H6, Sub1} from '../common/customTexts';
import LoginForm from '../common/loginForm';

const LoginView = () => {
    const [admin, setAdmin] = useState(true);
   const handleSubmit = (username, password) => {
    store.dispatch(checkUsernamePasswordTemp({username: username, password: password, admin: admin}))
   }

  return (
    <div>
        {admin?<H3>Admin</H3>:<H3>Viewer</H3>}
        <LoginForm handleSubmit={handleSubmit} />
        <>{admin?<Sub1>Only a viewer?</Sub1>:<Sub1>Admin user?</Sub1>}</>
        <Button onClick={() => setAdmin(!admin)}>{admin?"Log in as a Viewer":"Log in as an Admin"}</Button>
           
    </div>
  )
}

export default LoginView;