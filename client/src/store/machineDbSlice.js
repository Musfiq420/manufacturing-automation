import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getMachineDb = () => {
    return async (dispatch, getState) => {
        const res = await fetch('http://172.26.41.3:8080/machines');
        const body = await res.json();
        const lineWise = {}
        const typeWise = {}
        const runningTypeWise = {}
        const utilTypeWise = {}
        let count = 0;
        body.forEach(element => {

            if(element.status==="running")
            {
                if(!lineWise[element.line])createNestedObject(lineWise, [element.line]);
                lineWise[element.line][element.type] = lineWise[element.line][element.type]?(lineWise[element.line][element.type] + 1):1;
                runningTypeWise[element.type] = runningTypeWise[element.type]?(runningTypeWise[element.type] + 1):1;
            }
                        
            typeWise[element.type] = typeWise[element.type]?(typeWise[element.type] + 1):1;
            count++;
        });

        Object.keys(typeWise).forEach((element) => {
            const util = (runningTypeWise[element]/typeWise[element])*100;
            const checkRoundUtil = (util-Math.round(util))===0?Math.round(util):parseFloat(util).toFixed(2);
            utilTypeWise[element] = checkRoundUtil + '%';
        })

        typeWise['total'] = count;
        console.log(utilTypeWise)
        dispatch(mcAct.addLineWiseMachine(lineWise))
        dispatch(mcAct.addTypeWiseMachine(typeWise))
        dispatch(mcAct.addUtilTypeWiseMachine(utilTypeWise))

        
        
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
        lineWise: null,
        utilTypeWise: null,
    },
    reducers: {
        addTypeWiseMachine: (state, action) => {
                state.typeWise= action.payload
        },
        addLineWiseMachine: (state, action) => {
                state.lineWise= action.payload
        },
        addUtilTypeWiseMachine: (state, action) => {
            state.utilTypeWise= action.payload
    }
        
    }
})

export const mcAct = machineDbSlice.actions;
export default machineDbSlice;