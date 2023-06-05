
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import publicRequest from '../../../../../requests/requestMethos';
import MenuItem from '@mui/material/MenuItem';
import ConfirmationButtonsContainer from '../../../../UI/MUI/Modals/ConfirmationButtons/ConfirmationButtonsContainer';


const AdminDeleteSeasonsFrom = (props) => {
    // react hook form setup
    const { register, handleSubmit, watch, reset, formState: { errors }, unregister } = useForm({
        defaultValues: {
            type: "Seasons",
            name: props?.selectedData?.name
        }
    });
    console.log("props?.selectedData", props?.selectedData?.products)
    // submit data
    const onSubmit = data => {
        console.log("submit data", data)
        props.setIsLoading(true)
        publicRequest.delete(`/type/${props?.selectedData._id}`, data)
            .then(res => {
                console.log(res)
                props.setResponseMessage("Data has been deleted")
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
            })
    }

    return (
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4 p-4'>
                <TextField
                    fullWidth
                    defaultValue=""
                    size='small'
                    label="Category"
                    inputProps={register('name', { required: 'Category Required' })}
                    error={errors.name}
                    helperText={errors.name?.message}
                    disabled={true}
                >
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
        </form >
    )
}

export default AdminDeleteSeasonsFrom