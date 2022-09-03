import { Typography } from '@mui/material'
import React from 'react'

const HeaderText = (props) => {
  return (
    <>
       <Typography sx={{margin:'30px'}} color='primary' variant='h4'>{props.children}</Typography>
    </>
  )
}

export default HeaderText