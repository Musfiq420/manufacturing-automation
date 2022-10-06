import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Body, ContainerBig, ContainerMedium, ContainerSmall, H3, H4, H5, Header, Header1, Header2, Header3, Sub1 } from '../components/common/customTexts'
import Trophy from '../components/common/trophy'

const AdminPanel = () => {
  return (
    <>
    <div>AdminPanel</div>
    <Container sx={{display:'flex'}}>
      <Trophy />
    </Container>
    
    </>
    
  )
}

export default AdminPanel