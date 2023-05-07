import { TextField } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button';

const ItemsAddForm = () => {
    return (
        <form className='flex flex-col gap-4 shadow-md p-4'>
            <TextField size="small" id="outlined-basic" label="Name" variant="outlined" />
            <TextField size="small" id="outlined-basic" label="Description" variant="outlined" />
            <TextField size="small" id="outlined-basic" label="Price" variant="outlined" />

            <Button variant="contained" onClick={() => {
                alert("Submited")
                window.location.pathname = "/seller";

            }}>Submit Item</Button>

        </form>
    )
}

export default ItemsAddForm