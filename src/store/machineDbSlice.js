import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';




export const getMachineDb = () => {
    return async (dispatch, getState) => {
        
        // dispatch(mcAct.addTypeWiseMachine(typeWiseData))
        // dispatch(mcAct.addUtilTypeWiseMachine(utilTypeWise))
        
    }
}

var createNestedObject = function( base, names ) {
    for( var i = 0; i < names.length; i++ ) {
        base = base[ names[i] ] = base[ names[i] ] || {};
    }
};



const machineDbSlice = createSlice({
    name: "machineDb",
    initialState: {
        typeWise: null,
        utilTypeWise: null,
        lostTime: []
    },
    reducers: {
        addTypeWiseMachine: (state, action) => {
            
                state.typeWise= action.payload
        },
        addUtilTypeWiseMachine: (state, action) => {
            state.utilTypeWise= action.payload
        },
        addLostTime: (state, action) => {
        console.log("payload: ",action.payload);
        state.lostTime= action.payload
        }   
        
    }
})

export const mcAct = machineDbSlice.actions;
export default machineDbSlice;