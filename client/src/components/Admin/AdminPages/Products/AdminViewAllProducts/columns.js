export const columns = [
    // { field: '_id', headerName: 'ID', minWidth: 250 },
    { field: 'photo', headerName: 'Image', width: 30, renderCell: (params) => params.value ? <img src={`http://localhost:5000/photo/${params.value}`} className="rounded-full w-8 h-8" /> : <></>, },
    { field: 'name', headerName: 'Status', minWidth: 50 },
    { field: 'price', headerName: 'Price', minWidth: 150 },
    { field: 'isVerified', headerName: 'Verified', minWidth: 150 },
    { field: 'buyer', headerName: 'Buyer', minWidth: 150, valueFormatter: (params) => params?.value?.username },
    { field: 'seller', headerName: 'Seller', minWidth: 150, valueFormatter: (params) => params?.value?.username },
    { field: 'description', headerName: 'Description', minWidth: 150, flex: 1 }
];
