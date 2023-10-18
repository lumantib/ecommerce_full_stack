import { Avatar, List, ListItem, ListItemText, Popover } from '@mui/material';
import React, { useState } from 'react';
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
            <Avatar sx={{ width: 32, height: 32, cursor: "pointer" }} onClick={handleClick}>{localStorage.getItem('username')?.[0]}</Avatar>
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
                    <ListItem button component={Link} to="/dashboard/products/sell">
                        <ListItemText primary="Sell Products" sx={{ color: '#333' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/login" onClick={() => localStorage.clear()}>
                        <ListItemText primary="Logout" sx={{ color: '#333' }} />
                    </ListItem>
                </List>
            </Popover>
        </div>
    );
};

export default LogoutPopover;
