import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '../core/history';
import funcReactToast from '../core/useReactToast';

const alert = funcReactToast();

export const checkUsernamePasswordTemp = ({username, password, admin}) =>  {
  
  alert.warn();
  return async (dispatch, getState) => {
    const res = await fetch('http://172.26.41.3:8080/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      admin: admin
    })
  });
  const body = await res.json();
    if(body.success === 'yes')
    {
      dispatch(accAct.logIn(body.admin));
      history.push('/machinedb');
      alert.del();
      alert.success();
    }
    else {
      alert.del();
      alert.error();
    }
  }
  
}


const accountSlice = createSlice({
    name: "accInfo",
    initialState: {
        admin: 'no',
        loggedIn: false,
    },
    reducers: {
      logout(){
        return {
          admin: 'no',
          loggedIn: false,
        }
      },
      logIn(state, action){
        return {
          admin: action.payload,
          loggedIn: true,
        }
      }
    }
})

export const accAct = accountSlice.actions;

export default accountSlice;





// export const checkUsernamePassword = createAsyncThunk(
//   'accInfo/checkUsernamePassword',
//   async({username, password, admin}) => {
//       // const response = await fetch('https://machinedb.herokuapp.com/login', {
//         const response = await fetch('http://localhost:8080/login', {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             username: username,
//             password: password,
//             admin: admin
//           })
//         });
//       const body = response.json();
//       console.log(body);
//       return body;
//   }
// )