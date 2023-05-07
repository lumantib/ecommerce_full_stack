import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import sellingItemListDummyData from './sellingItemListDummyData';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'product_name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
        field: "actions",
        headerName: "Actions",
        headerAlign: 'center',
        sortable: false,
        width: 100,
        renderCell: ({ row }) =>
            <span>Delete</span>
    }
];

export default function DataTable() {
    return (
        <div style={{ height: 400, width: '100%' }} >
            <Link to="add">
                <Button variant="contained" color="success">
                    + Add new item
                </Button>
            </Link>
            <DataGrid
                columns={columns}
                rows={sellingItemListDummyData}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}