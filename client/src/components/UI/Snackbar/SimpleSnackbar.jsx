import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

export default function SimpleSnackbar({ message, open, setOpen }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar
            open={open}
            anchorOrigin={{
                vertical: 'botton',
                horizontal: 'right',
            }}
            autoHideDuration={1000}
            onClose={handleClose}
            message={message}
            action={action}
        />
    );
}