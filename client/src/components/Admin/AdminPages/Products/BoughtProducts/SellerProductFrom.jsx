
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import publicRequest from '../../../../../requests/requestMethos';
import ConfirmationButtonsContainer from '../../../../UI/MUI/Modals/ConfirmationButtons/ConfirmationButtonsContainer';


const SellerProductFrom = (props) => {
    // react hook form setup
    const { register, handleSubmit, watch, reset, formState: { errors }, unregister } = useForm({
        defaultValues: {
        }
    });

    // to unregister when status is done
    useEffect(() => {
        !(watch("status") === "done") && unregister('photo')
    }, [watch("status")]);

    
    const [photo, setPhoto] = useState(null);

    const validateImage = (file) => {
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const maxSizeInBytes = 1024 * 1024; // 1MB

        if (!allowedExtensions.includes(file.name.split('.').pop().toLowerCase())) {
            return 'Invalid file format. Only JPG, JPEG, and PNG files are allowed.';
        }

        if (file.size > maxSizeInBytes) {
            return 'File size exceeds the maximum limit of 1MB.';
        }

        return null; // File is valid
    };


    const handleChangePhoto = (newFile) => {
        if (newFile === null) {
            // File has been removed, clear the optional_photo
            setPhoto(null);
        } else {
            const validationError = validateImage(newFile);

            if (validationError) {
                // Handle the validation error (e.g., display a browser alert)
                window.alert(validationError);
            } else {
                // File is valid, set it as optional_photo
                setPhoto(newFile);
            }
        }
    };


    // submit data
    const onSubmit = data => {
        console.log("submit data", data)
        props.setIsLoading(true)
        publicRequest.patch('/change/status', data)
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