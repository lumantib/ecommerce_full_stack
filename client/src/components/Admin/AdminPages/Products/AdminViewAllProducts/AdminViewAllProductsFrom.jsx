
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import publicRequest from '../../../../../requests/requestMethos';
import MenuItem from '@mui/material/MenuItem';
import ConfirmationButtonsContainer from '../../../../UI/MUI/Modals/ConfirmationButtons/ConfirmationButtonsContainer';


const AdminViewAllProductsFrom = (props) => {
    // react hook form setup
    const { register, handleSubmit, watch, reset, formState: { errors }, unregister } = useForm({
        defaultValues: {
            product_id: props?.selectedData?._id
        }
    });
    console.log("props.setResponseMessage", props.setResponseMessage)
    // submit data
    const onSubmit = data => {
        console.log("submit data", data)
        props.setIsLoading(true)
        publicRequest.patch('/products/verify', data)
            .then(res => {
                console.log(res)
                props.setResponseMessage("Data has been added")
                props.fetchData()
                props.handleClose()
            })
            .catch(err => {
                props.setIsLoading(false)
                props.setOpenSnackbar(true);
                props.setResponseMessage("err?.response?.data?.message")
            })
            .finally(() => {
                props.setIsLoading(false)
                props.setOpenSnackbar(true);
            });
    }

    return (
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4 p-4'>
                <TextField
                    select
                    fullWidth
                    defaultValue=""
                    size='small'
                    label="Verified"
                    inputProps={register('isVerified', { required: 'Type Required', })}
                    error={errors.isVerified}
                    helperText={errors.isVerified?.message}
                >
                    <MenuItem value={false}>False</MenuItem>
                    <MenuItem value={true}>True</MenuItem>
                </TextField>
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

export default AdminViewAllProductsFrom