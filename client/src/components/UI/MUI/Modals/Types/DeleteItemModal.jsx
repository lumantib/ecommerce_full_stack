import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmationButtonsContainer from "../ConfirmationButtons/ConfirmationButtonsContainer";

const DeleteItemModal = (props) => {
    console.log(props)
    const handleSubmit = () => {
        props.setIsLoading(true)
        console.log(props)
        setTimeout(() => {
            props.setIsLoading(false)
            props.setOpenSnackbar(true);
            props.handleClose()
        }, 2000);
    }
    return (
        <>
            <div className="p-4">Delete This Item?</div>

            <ConfirmationButtonsContainer>
                <Button color="error" className='text-gray-600' onClick={props.handleClose}>Cancel</Button>
                <Button
                    variant="contained"
                    startIcon={props.isLoading ? <CircularProgress color="inherit" className='submitButton' /> : <DeleteIcon />}
                    color='error'
                    className='bg-danger-600'
                    onClick={handleSubmit}
                >
                    Delete
                </Button>
            </ConfirmationButtonsContainer>
        </>

    )
}

export default DeleteItemModal