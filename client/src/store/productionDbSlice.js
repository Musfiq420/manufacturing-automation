import { createSlice } from "@reduxjs/toolkit"

export const getProductionByDate = ({date}) => {
    
    return async (dispatch, getState) => {
        const res = await fetch('http://172.26.41.3:8080/getProductionByDate', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              date: date
            })
          });
        const obj = []
        const body = await res.json();
        
        body.forEach(element => {
            obj.push(element)
        });

        dispatch(addProductionByDate(obj))
        
    }
}




const productionDbSlice = createSlice({
    name: 'productionDb',
    initialState: {
        dailyData: null
    },
    reducers: {
        addProductionByDate : (state, action) => {
            state.dailyData = action.payload
            console.log(state.dailyData)
        }
    }
})

export default productionDbSlice;

export const {addProductionByDate} = productionDbSlice.actions;