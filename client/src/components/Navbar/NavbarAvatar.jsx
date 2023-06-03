import React, { useState } from 'react';
import { Button, Popover, Typography, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const LogoutPopover = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Perform logout logic here
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'logout-popover' : undefined;

    return (
        <div>
            <Avatar sx={{ width: 32, height: 32, cursor: "pointer" }} onClick={handleClick}>U</Avatar>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        minWidth: '200px',
                        borderRadius: '8px',
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                <List component="nav">
                    <ListItem button component={Link} to="/seller/products">
                        <ListItemText primary="Products" sx={{ color: '#333' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/settings">
                        <ListItemText primary="Settings" sx={{ color: '#333' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/login">
                        <ListItemText primary="Logout" sx={{ color: '#333' }} />
                    </ListItem>
                </List>
            </Popover>
        </div>
    );
};

export default LogoutPopover;
