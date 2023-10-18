export const columns = [
    // { field: '_id', headerName: 'ID', minWidth: 250 },
    { field: 'photo', headerName: 'IMG', width: 30, renderCell: (params) => params.value ? <img src={`http://localhost:5000/photo/${params.value}`} className="rounded-full w-8 h-8" /> : <></>, },
    { field: 'name', headerName: 'Name', minWidth: 150 },
    { field: 'price', headerName: 'Price', minWidth: 150 },
    { field: 'isVerified', headerName: 'Verified', minWidth: 150 },
    { field: 'description', headerName: 'Description', minWidth: 150, flex: 1 }
];
