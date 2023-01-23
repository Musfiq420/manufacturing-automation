import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SizedBoxMedium, SizedBoxSmall, SizedBoxBig } from "./sizedBox";

const LoginForm = ({handleSubmit}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  return (
    <>
    <SizedBoxSmall />
    <Typography fontSize={12} fontStyle='italic' sx={{opacity:'70%'}}>use <span style={{opacity:'100%'}}>user@gmail.com</span> as email and <span style={{opacity:'100%'}}>password</span> as password</Typography>
    <SizedBoxSmall />
  <TextField
    sx={{margin:'5px'}}
    label="Email"
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
        <SizedBoxSmall />
  <TextField
    sx={{margin:'5px'}}
    label="Password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
        <SizedBoxSmall />
          <Button variant='contained' onClick={() => handleSubmit(username, password)}>Sign In</Button>
          <SizedBoxSmall />
        {/* <SizedBoxMedium /> */}
    </>
  )
  }

  export default LoginForm;