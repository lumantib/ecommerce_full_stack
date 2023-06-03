
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import publicRequest from '../../../../../requests/requestMethos';
import ConfirmationButtonsContainer from '../../../../UI/MUI/Modals/ConfirmationButtons/ConfirmationButtonsContainer';


const SellerProductFrom = (props) => {
    // react hook form setup
    const { register, handleSubmit, watch, reset, formState: { errors }, unregister } = useForm({
        defaultValues: {
        }
    });

    // submit data
    const onSubmit = data => {
        console.log("submit data", data)
        props.setIsLoading(true)
        publicRequest.post('/products', data)
            .then(res => {
                console.log(res)
                if (res.data.success) {
                    props.setIsLoading(false)
                    props.setOpenSnackbar(true);
                    props.handleClose()
                    props.fetchData()
                }
            })
            .catch(err => {
                props.setIsLoading(false)
                props.setOpenSnackbar(true);
                props.setResponseMessage(err?.response?.data?.message)
            })
    }

    return (
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4 p-4'>
                <TextField
                    label="Product Name"
                    id="outlined-size-small"
                    size="small"
                    fullWidth
                    {...register("name")}
                />
                <TextField
                    label="Price"
                    id="outlined-size-small"
                    size="small"
                    fullWidth
                    {...register("price")}
                />
                <TextField
                    label="Description"
                    id="outlined-size-small"
                    size="small"
                    fullWidth
                    {...register("description")}
                />
            </div>
            <ConfirmationButtonsContainer>
                <Button color="error" className='text-gray-600' onClick={props.handleClose}>Cancel</Button>
                <Button
                    endIcon={props.isLoading ? <CircularProgress color="inherit" className='submitButton' /> : <SendIcon />}
                    variant="contained"
                    color="primary"
                    className='w-full sm:w-auto bg-primary'
                    type="submit"
                >
                    Send Request
                </Button>
            </ConfirmationButtonsContainer>
        </form>
    )
}

export default SellerProductFrom