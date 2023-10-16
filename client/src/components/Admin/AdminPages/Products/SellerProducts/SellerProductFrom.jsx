
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import * as React from 'react';
import { useForm, Controller } from "react-hook-form";
import publicRequest from '../../../../../requests/requestMethos';
import ConfirmationButtonsContainer from '../../../../UI/MUI/Modals/ConfirmationButtons/ConfirmationButtonsContainer';
import { MuiFileInput } from 'mui-file-input';
import { FileUploader } from "react-drag-drop-files";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import { useState } from 'react';
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';

const SellerProductFrom = (props) => {
    React.useEffect(() => {
        fetchTypes()
    }, []);

    // Api Calls
    const [types, setTypes] = React.useState([]);
    const fetchTypes = () => {
        publicRequest.get('/type')
            .then(res => {
                console.log(res.data.filter(type => type.type === "Category"))
                setTypes(res?.data)
            })
            .catch(err => console.log(err))
    }

    // react hook form setup
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            ...props?.selectedData
        }
    });



    // submit data
    const onSubmit = data => {
        console.log("submit data", data)

        const formData = new FormData();
        formData.append('photo', photo)
        formData.append('name', data.name)
        formData.append('price', data.price)
        formData.append('description', data.description)
        formData.append('categories', data.categories)
        formData.append('seasons', data.seasons)
        props.setIsLoading(true)
        props?.selectedData
            ? publicRequest.patch(`/products/seller/${props?.selectedData?._id}`, formData)
                .then(res => {
                    console.log(res)
                    props.setResponseMessage("Data has been updated")
                    props.fetchData()
                    props.handleClose()
                })
                .catch(err => {
                    props.setIsLoading(false)
                    props.setOpenSnackbar(true);
                    console.error('err?.response: ', err?.response);
                    props.setResponseMessage(err?.response?.data?.message)
                })
                .finally(() => {
                    props.setIsLoading(false)
                    props.setOpenSnackbar(true);
                })
            : publicRequest.post('/products', formData)
                .then(res => {
                    console.log(res)
                    props.setResponseMessage("Data has been added")
                    props.fetchData()
                    props.handleClose()
                })
                .catch(err => {
                    props.setIsLoading(false)
                    props.setOpenSnackbar(true);
                    console.error('err?.response: ', err?.response);
                    props.setResponseMessage(err?.response?.data?.errors)
                })
                .finally(() => {
                    props.setIsLoading(false)
                    props.setOpenSnackbar(true);
                })
    }


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


    return (
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4 p-4 h-60 overflow-auto'>
                <MuiFileInput
                    value={photo}
                    onChange={handleChangePhoto}
                    size="small"
                    placeholder={props?.selectedData?.photo ? "Update Image" : "Product Image"}
                    accept=".jpg, .jpeg, .png" // Specify allowed file extensions
                    maxSize={1024 * 1024} // 1MB (Specify maximum file size in bytes)
                />
                <TextField
                    label="Product Name"
                    id="outlined-size-small"
                    size="small"
                    fullWidth
                    {...register("name", { required: true })}
                    error={errors?.name}
                    helperText={errors.name?.type === 'required' && <>This field is required</>}
                />
                <TextField
                    label="Price"
                    id="outlined-size-small"
                    size="small"
                    type="number"
                    fullWidth
                    {...register("price", { required: true })}
                    error={errors?.price}
                    helperText={errors.price?.type === 'required' && <>This field is required</>}
                />
                <TextField
                    label="Description"
                    id="outlined-size-small"
                    size="small"
                    fullWidth
                    {...register("description", { required: true })}
                    error={errors?.description}
                    helperText={errors.description?.type === 'required' && <>This field is required</>}
                />

                <Controller
                    name="categories"
                    control={control}
                    type="text"
                    size="small"
                    defaultValue={[]}
                    render={({ field }) => (
                        <FormControl>
                            <InputLabel id="age" size="small">Categories</InputLabel>
                            <Select
                                size="small"
                                {...field}
                                labelId="Categories"
                                label="Categories"
                                multiple
                                defaultValue={[]}
                            >
                                {
                                    types?.filter(type => type.type == "Category")?.map(type => {
                                        return (
                                            <MenuItem key={type._id} value={type.name} defaultChecked={true}>
                                                {type.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="seasons"
                    control={control}
                    type="text"
                    size="small"
                    defaultValue={[]}
                    render={({ field }) => (
                        <FormControl>
                            <InputLabel id="Seasons" size="small">Seasons</InputLabel>
                            <Select
                                {...field}
                                size="small"
                                labelId="Seasons"
                                label="Seasons"
                                multiple
                                defaultValue={[]}
                            >
                                {
                                    types?.filter(type => type.type == "Season")?.map(type => {
                                        return (
                                            <MenuItem key={type._id} value={type.name}>
                                                {type.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    )}
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
                    Submit
                </Button>
            </ConfirmationButtonsContainer>
        </form>
    )
}

export default SellerProductFrom