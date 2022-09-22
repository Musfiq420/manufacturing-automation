import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const typeWiseData = [
    {
        name: 'Single Needle',
        quantity: 1817,
        types: [
            {
                name: 'Single Needle Lock Stitch',
                quantity: 1617
            },
            {
                name: 'Single Needle Lock Stitch Long Arm',
                quantity: 18
            },
            {
                name: 'Single Needle Lock Stitch (Needle Feed)',
                quantity: 59
            },
            {
                name: 'Single Needle Edge Cutter',
                quantity: 65,
            },
            {
                name: 'Single Needle Chain Stitch',
                quantity: 58,
            },
        ]
        
    },
    
    {
        name: 'Double Needle',
        quantity: 39,
        types: [
            {
                name: 'Double Needle Chain Stitch',
                quantity: 3,
                types: null
            },
            {
                name: 'Double Needle Lock Stitch',
                quantity: 36,
                types: null
            },
        ]
    },
    {
        name: 'Flat lock',
        quantity: 796,
        types: [
            {
                name: 'Interlock Cylinder Bed',
                quantity: 241
            },
            {
                name: 'Interlock Cylinder Bed Edge Cutter',
                quantity: 115 
            },
            {
                name: 'Interlock Flat Bed',
                quantity: 181 
            },
            {
                name: 'Flat Lock Small Cylinder Bed',
                quantity: 180
            },
            {
                name: 'Flat Lock Small Cylinder Bed Edge Cutter',
                quantity: 44
            },
            {
                name: 'Flat Lock Small Cylinder Puller',
                quantity: 5
            },
            {
                name: 'Flat Lock Cylinder Bed Puller',
                quantity: 10
            },
            {
                name: 'Flat Lock Cylinder Bed Puller With Edge Trimmer',
                quantity: 10
            },
            {
                name: 'Feed Of The Arm Cylinder Bed VT',
                quantity: 10
            },

        ]
        
    },
    {
        name: 'Over lock',
        quantity: 1069,
        types: [
            {
                name: 'Over Lock 4 Thread',
                quantity: 961
            },
            {
                name: 'Over Lock 4 Thread Cylinder Bed Neck Rib Joining',
                quantity: 25 
            },
            {
                name: 'Over Lock 3 Thread Elastic Joining',
                quantity: 30 
            },
            {
                name: 'Over Lock 3 Thread Hemming',
                quantity: 35
            },
            {
                name: 'Over Lock 3 Thread Cylinder Bed',
                quantity: 1
            },
            {
                name: 'Over Lock 6 Thread',
                quantity: 12
            },
            {
                name: 'Over Lock 5 Thread',
                quantity: 3
            }
        ]
        
    },
    {
        name: 'Button',
        quantity: 171,
        types: [
            {
                name: 'Button Hole',
                quantity: 53,
                types: null
            },
            {
                name: 'Button Attach',
                quantity: 55,
                types: null
            },
            {
                name: 'Snap Button',
                quantity: 55,
                types: null
            },
            {
                name: 'Button Wrapping & Knotting',
                quantity: 9,
                types: null
            },
            {
                name: 'Eyelet Hole',
                quantity: 1,
                types: null
            },
        ]
    },
    {
        name: 'Bar Tack',
        quantity: 75,
        types: null
    },
    {
        name: 'Zig Zag',
        quantity: 20,
        types: null
    },
    {
        name: 'Feed Of The Arm',
        quantity: 48,
        types: null
    },
    {
        name: 'Kansai Special',
        quantity: 53,
        types: null
    },
    {
        name: 'Automatic Cycle Sewing Machine',
        quantity: 13,
        types: null
    },
    {
        name: 'Post Bed',
        quantity: 16,
        types: [
            {
                name: 'Post Bed Single Needle',
                quantity: 8
            },
            {
                name: 'Post Bed Double Needle',
                quantity: 4
            },
            {
                name: 'Post Bed Single Needle (Needle Feed)',
                quantity: 4
            },
        ]
    },
    {
        name: 'Automatic Back Moon (Pocket Setter)',
        quantity: 6,
        types: null
    },
    {
        name: 'Automatic Label Attaching',
        quantity: 10,
        types: null
    },
    {
        name: 'Cap',
        quantity: 24,
        types: [
            {
                name: 'Hydraulic Press Dai Cutting',
                quantity: 2,
            },
            {
                name: 'Plastic Staple Attacher',
                quantity: 5,
            },
            {
                name: 'Automatic Sweat Band Making',
                quantity: 2,
            },
            {
                name: 'Automatic Cap Ironing',
                quantity: 2,
            },
            {
                name: 'Automatic Front Panel Pressing',
                quantity: 2,
            },
            {
                name: 'Peak Curving',
                quantity: 2,
            },
            {
                name: 'Cap Peak Cooling',
                quantity: 2,
            },
            {
                name: 'Button Covering',
                quantity: 2,
            },
            {
                name: 'Top Button Fixing',
                quantity: 2,
            },
            {
                name: 'Automatic Bayes Cutting',
                quantity: 1,
            },
            {
                name: 'Automatic Visor Sewing',
                quantity: 2,
            },
        ]
    },
    {
        name: 'Others',
        quantity: 173,
        types: [
            {
                name: 'Rib Cutter',
                quantity: 30,
            },
            {
                name: 'Pickoting',
                quantity: 8,
            },
            {
                name: 'Blanket Sel Stich',
                quantity: 2,
            },
            {
                name: 'Back Tape',
                quantity: 3,
            },
            {
                name: 'Chain Shell Stitch',
                quantity: 2,
            },
            {
                name: 'Thread Trimmer',
                quantity: 60,
            },
            {
                name: 'Shuttle Stitch',
                quantity: 2,
            },
            {
                name: 'Smoke',
                quantity: 3,
            },
            {
                name: 'Pin Tacking',
                quantity: 2,
            },
            {
                name: 'Hand Stitch',
                quantity: 2,
            },
            {
                name: 'Pearl Setting',
                quantity: 2,
            },
            {
                name: 'Hot Fix Setting',
                quantity: 4,
            },
            {
                name: 'Thread Rewinding',
                quantity: 9,
            },
            {
                name: 'Label Cutter',
                quantity: 3,
            },
            {
                name: 'Bonding',
                quantity: 3,
            },
        ]
    },
    


]

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
        //dispatch(mcAct.addTypeWiseMachine(typeWise))
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
        typeWise: typeWiseData,
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