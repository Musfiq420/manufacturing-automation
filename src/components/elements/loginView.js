import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { accAct, checkUsernamePasswordTemp } from '../../store/account-Slice';
import store from '../../store/str';
import { FlexColCenterBig } from '../common/customBox';
import {Body, Caption, H3, H4, H5, H6, Sub1} from '../common/customTexts';
import LoginForm from '../common/loginForm';
import { useDispatch } from 'react-redux';
import funcReactToast from '../../core/useReactToast';
import { supabase } from '../../core/supabaseClient';
import { SizedBoxMedium, SizedBoxSmall } from '../common/sizedBox';
import pic from '../../assets/logo512.png';

const LoginView = () => {
    const [admin, setAdmin] = useState(true);

    const dispatch = useDispatch();
    const alert = funcReactToast();

    
    

   const handleSubmit = async (username, password) => {
    // store.dispatch(checkUsernamePasswordTemp({username: username, password: password, admin: admin}))
    
    // const {data, error} = await supabase.auth.signUp({
    //     email: username,
    //     password,
    //     options: {
    //       data: {
    //         admin: true
    //       }
    //     }
    //   })
    //   if(error){
    //     // setRMsg(error.message)
    //     console.log(username, password);
    //     console.log('error: '+error);
    //   }else{
    //     // setRMsg('User created successfully')
    //     // setUser(data.user)
    //     console.log('data: '+ JSON.stringify(data.user.user_metadata));
    //   }
    
    alert.warn();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    })
    if(error){
      console.log('error: '+error);
      alert.del();
      alert.error()
    }else{
      dispatch(accAct.logIn('yes'));
      alert.del();
      alert.success();
      // console.log('data: '+ JSON.stringify(data.user.user_metadata));
    }
    
    
    

    // const { error } = await supabase.auth.signOut()
    // if(error){
    //   console.log('error: '+error);
    // }
   }

  return (
    <FlexColCenterBig sx={{alignItems:'center'}}>
      <SizedBoxSmall />
      <img src={pic} height={80} />
      <SizedBoxSmall />
      <H4>Manufacturing</H4>
        <H4>Automation</H4>
        <SizedBoxSmall />
        <Typography fontSize={12} textAlign='center'>Developed by: <br/>Md. Musfiqur Rahman<br/><span style={{fontSize:10, opacity:'70%'}} >Executive-II, IE & Workstudy, Square Fashions Ltd</span></Typography>
        {/* {admin?<H3>Admin</H3>:<H3>Viewer</H3>} */}
        <LoginForm handleSubmit={handleSubmit} />
        {/* <>{admin?<Sub1>Only a viewer?</Sub1>:<Sub1>Admin user?</Sub1>}</> */}
        {/* <Button onClick={() => setAdmin(!admin)}>{admin?"Log in as a Viewer":"Log in as an Admin"}</Button> */}
        <a href="https://www.flaticon.com/free-icons/industry" title="industry icons">Industry icons created by Freepik - Flaticon</a>

    </FlexColCenterBig>
  )
}

export default LoginView;