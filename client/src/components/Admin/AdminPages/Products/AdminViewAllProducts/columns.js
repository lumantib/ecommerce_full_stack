export const columns = [
    // { field: '_id', headerName: 'ID', minWidth: 250 },
    { field: 'Image', headerName: 'Image', minWidth: 150 },
    { field: 'name', headerName: 'Status', minWidth: 50 },
    { field: 'price', headerName: 'Price', minWidth: 150 },
    { field: 'isVerified', headerName: 'Verified', minWidth: 150 },
    { field: 'buyer', headerName: 'Buyer', minWidth: 150, valueFormatter: (params) => params?.value?.username },
    { field: 'seller', headerName: 'Seller', minWidth: 150, valueFormatter: (params) => params?.value?.username },
    { field: 'description', headerName: 'Description', minWidth: 150, flex: 1 }
];
