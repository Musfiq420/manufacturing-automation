import { createSlice } from "@reduxjs/toolkit"

// export const getProductionByDate = ({date}) => {
    
//     return async (dispatch, getState) => {
//         const res = await fetch('http://172.26.41.3:8080/getProductionByDate', {
//             method: 'POST',
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               date: date
//             })
//           });
//         const obj = []
//         const body = await res.json();
        
//         body.forEach(element => {
//             obj.push(element)
//         });

//         dispatch(addProductionByDate(obj))
        
//     }
// }

// export const getProductionByMonth = ({month}) => {
    
//     return async (dispatch, getState) => {
//         const res = await fetch('http://172.26.41.3:8080/getProductionByMonth', {
//             method: 'POST',
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               month: month
//             })
//           });
//         const body = await res.json();
        
//         console.log(body[0])
//         dispatch(addProductionByMonth(body))
        
//     }
// }


// export const getProductionByDateRange = ({startDate, endDate}) => {
    
//   return async (dispatch, getState) => {
//       const res = await fetch('http://172.26.41.3:8080/getProductionByDateRange', {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             "startDate": startDate, "endDate": endDate
//           })
//         });
//       const body = await res.json();
      
//       console.log(res)
//       dispatch(addProductionByMonth(body))
      
//   }
// }




const productionDbSlice = createSlice({
    name: 'productionDb',
    initialState: {
        dailyData: null,
        monthlyData: null,
    },
    reducers: {
        addProductionByDate : (state, action) => {
            state.dailyData = action.payload
            // console.log('daily data: '+state.dailyData)
        },
        addProductionByMonth : (state, action) => {
            state.monthlyData = action.payload
        }
    }
})

export default productionDbSlice;

export const {addProductionByDate, addProductionByMonth} = productionDbSlice.actions;