import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Newline from "./newline";

const LoginForm = ({handleSubmit}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  return (
    <>
        <TextField
    sx={{margin:'5px'}}
    label="Username"
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
        <Newline line={1}/>
        <TextField
    sx={{margin:'5px'}}
    label="Password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
        <Newline line={1}/>
        <Button sx={{margin:'20px'}} variant='contained' onClick={() => handleSubmit(username, password)}>Sign In</Button>
        <Newline line={3}/>
    </>
  )
  }

  export default LoginForm;
  //() => store.dispatch(checkUsernamePasswordTemp({username: username, password: password, admin: admin}))