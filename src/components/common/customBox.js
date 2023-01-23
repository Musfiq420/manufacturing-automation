import { Box } from '@mui/material';
import React from 'react';

export const BoxBig = (props) => (<Box sx={{padding:'25px'}} {...props}>{props.children}</Box>)
export const BoxMedium = (props) => (<Box sx={{padding:'15px'}} {...props}>{props.children}</Box>)
export const BoxSmall = (props) => (<Box sx={{padding:'5px'}} {...props}>{props.children}</Box>)

export const FlexRowCenterBig = (props) => (<Box display='flex' sx={{padding:'25px', justifyContent:'center', flexWrap:'nowrap'}}  {...props}>{props.children}</Box>)
export const FlexRowCenterMedium = (props) => (<Box display='flex' sx={{padding:'15px', justifyContent:'center',flexWrap:'nowrap'}}  {...props}>{props.children}</Box>)
export const FlexRowCenterSmall = (props) => (<Box display='flex' sx={{padding:'5px', justifyContent:'center',flexWrap:'nowrap'}} {...props}>{props.children}</Box>)

export const FlexColCenterBig = (props) => (<Box display='flex' flexDirection='column' sx={{padding:'25px', justifyContent:'center'}} {...props}>{props.children}</Box>)
export const FlexColCenterMedium = (props) => (<Box display='flex' flexDirection='column' sx={{padding:'15px', justifyContent:'center'}} {...props}>{props.children}</Box>)
export const FlexColCenterSmall = (props) => (<Box display='flex' flexDirection='column' sx={{ padding:'5px', justifyContent:'center'}} {...props}>{props.children}</Box>)