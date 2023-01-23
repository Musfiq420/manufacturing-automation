import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '../core/history';


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
        history.push('/machinedb');
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