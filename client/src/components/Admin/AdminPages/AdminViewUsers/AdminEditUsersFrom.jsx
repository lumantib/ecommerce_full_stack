
import SendIcon from '@mui/icons-material/Send';
import { MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import publicRequest from '../../../../requests/requestMethos';
import ConfirmationButtonsContainer from '../../../UI/MUI/Modals/ConfirmationButtons/ConfirmationButtonsContainer';


const AdminEditUsersFrom = (props) => {
    // react hook form setup
    const { register, handleSubmit, watch, reset, formState: { errors }, unregister } = useForm({
        defaultValues: {
            ...props?.selectedData
        }
    });
    console.log("props?.selectedData", props?.selectedData?.products)
    // submit data
    const onSubmit = data => {
        console.log("submit data", data)
        props.setIsLoading(true)
        props?.selectedData ?
            publicRequest.patch(`/users/${props?.selectedData._id}`, data)
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
            :
            publicRequest.post('/type', data)
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
                    fullWidth
                    size='small'
                    label="Username"
                    inputProps={register('username', { required: 'Category Required' })}
                    error={errors.username}
                    helperText={errors.username?.message}
                />

                <TextField
                    fullWidth
                    size='small'
                    label="Email"
                    inputProps={register('email', { required: 'Category Required' })}
                    error={errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    select
                    fullWidth
                    defaultValue=""
                    size='small'
                    label="Admin"
                    inputProps={register('isAdmin')}
                    error={errors.isAdmin}
                    helperText={errors.isAdmin?.message}
                >
                    <MenuItem value={false} selected>False</MenuItem>
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
        </form >
    )
}

export default AdminEditUsersFrom