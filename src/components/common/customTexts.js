import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'

export const H3 = (props) => <Typography variant='h3' color='primary'  textAlign='center' {...props}>{props.children}</Typography>
export const H4 = (props) => <Typography variant='h4' color='primary'  textAlign='center' {...props}>{props.children}</Typography>
export const H5 = (props) => <Typography variant='h5' color='primary' textAlign='center'  {...props}>{props.children}</Typography>
export const H6 = (props) => <Typography variant='h6' color='primary' textAlign='center'  {...props}>{props.children}</Typography>
export const Sub1 = (props) => <Typography variant='subtitle1' textAlign='center' sx={{opacity:0.7}} {...props}>{props.children}</Typography>
export const Sub2 = (props) => <Typography variant='subtitle2' textAlign='center'  sx={{opacity:0.7}} {...props}>{props.children}</Typography>
export const Body = (props) => <Typography variant='body' textAlign='center'  {...props}>{props.children}</Typography>
export const Caption = (props) => <Typography variant='caption' textAlign='center'  {...props}>{props.children}</Typography>

