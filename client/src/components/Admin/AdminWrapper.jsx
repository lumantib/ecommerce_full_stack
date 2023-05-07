import React from 'react'
import SideNavbar from './SideNavbar'
import AppBar from './AppBar'
import About from './About'
import { Box } from '@mui/material'
const AdminWrapper = (props) => {
  return (
    <>
      <AppBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <SideNavbar>
          {props.children}
        </SideNavbar>

      </Box>

    </>
  )
}

export default AdminWrapper
