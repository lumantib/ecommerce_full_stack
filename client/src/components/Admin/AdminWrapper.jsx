import React from 'react'
import SideNavbar from './SideNavbar'
import AppBar from './AppBar'
import About from './About'
import { Box } from '@mui/material'
const AdminWrapper = (props) => {
  return (
    <>
      <AppBar />
      {/* <Box height={30} /> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <SideNavbar>
          {props.children}
        </SideNavbar>

      </Box>

    </>
  )
}

export default AdminWrapper
