
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import publicRequest from '../../../../../requests/requestMethos';
import MenuItem from '@mui/material/MenuItem';
import ConfirmationButtonsContainer from '../../../../UI/MUI/Modals/ConfirmationButtons/ConfirmationButtonsContainer';
import bluejeans from "./bluejeans.jpg"

const AdminOrderRespondFrom = (props) => {
    // react hook form setup
    const { register, handleSubmit, watch, reset, formState: { errors }, unregister } = useForm({
        defaultValues: {
            product_id: props?.selectedData?._id
        }
    });
    console.log("props?.selectedData", props?.selectedData?.products)
    // submit data
    const onSubmit = data => {
        console.log("submit data", data)
        props.setIsLoading(true)
        publicRequest.patch(`/orders/${props?.selectedData?._id}`, data)
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
                <div className="flex flex-col divide-y divide-gray-200 gap-2">
                    {
                        props?.selectedData?.products?.map(product => {
                            return (
                                <div key={product.id} className={`flex items-center`}>
                                    <div className="w-16 h-16 flex-shrink-0">
                                        <img src={`http://localhost:5000/photo/${product.photo}`} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                        <p className="text-gray-500">${product.price}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <TextField
                    select
                    fullWidth
                    defaultValue=""
                    size='small'
                    label="Payement Completion"
                    inputProps={register('payement_completed', { required: 'Type Required', })}
                    error={errors.payement_completed}
                    helperText={errors.payement_completed?.message}
                >
                    <MenuItem value="false" selected>False</MenuItem>
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

export default AdminOrderRespondFrom