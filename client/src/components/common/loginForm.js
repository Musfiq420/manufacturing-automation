import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { SizedBoxMedium, SizedBoxSmall, SizedBoxBig } from "./sizedBox";

const LoginForm = ({handleSubmit}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  return (
    <>
    <SizedBoxMedium />
  <TextField
    sx={{margin:'5px'}}
    label="Username"
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
        <SizedBoxMedium />
          <Button variant='contained' onClick={() => handleSubmit(username, password)}>Sign In</Button>
        <SizedBoxMedium />
    </>
  )
  }

  export default LoginForm;