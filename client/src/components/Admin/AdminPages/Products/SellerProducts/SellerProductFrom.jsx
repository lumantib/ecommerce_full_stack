
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
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

const SellerProductFrom = (props) => {
    React.useEffect(() => {
        fetchTypes()
    }, []);

    // Api Calls
    const [types, setTypes] = React.useState([]);
    const fetchTypes = () => {
        publicRequest.get('/type')
            .then(res => {
                console.log(res.data.filter(type => type.type == "Category"))
                setTypes(res?.data)
            })
            .catch(err => console.log(err))
    }

    // react hook form setup
    const { register, handleSubmit, watch, reset, formState: { errors }, unregister, control } = useForm({
        defaultValues: {
            ...props?.selectedData
        }
    });

    // submit data
    const onSubmit = data => {
        console.log("submit data", data)
        props.setIsLoading(true)
        publicRequest.post('/products', data)
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
            <div className='flex flex-col gap-4 p-4 h-60 overflow-auto'>
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
                    Send Request
                </Button>
            </ConfirmationButtonsContainer>
        </form>
    )
}

export default SellerProductFrom