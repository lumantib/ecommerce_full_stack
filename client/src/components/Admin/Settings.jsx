import React from 'react'
import SideNavbar from './SideNavbar'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from './AppBar'
const Settings = () => {
  return (
    <>
    <AppBar/>
    <Box height={30}/>
    <div className='display:flex'>
    <SideNavbar/>
    </div>
    </>
  )
}

export default Settings
