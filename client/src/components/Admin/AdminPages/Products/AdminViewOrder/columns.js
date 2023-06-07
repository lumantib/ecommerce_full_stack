export const columns = [
    // { field: '_id', headerName: 'ID', minWidth: 250 },
    { field: 'username', headerName: 'Buyer', minWidth: 50 },
    { field: 'email', headerName: 'Contact Email', minWidth: 50 },
    { field: 'products', headerName: 'Items', width: 50, valueFormatter: (params) => params?.value?.length },
    { field: 'totalPrice', headerName: 'Price', width: 50 },
    { field: 'payement_completed', headerName: 'Payement Completed', minWidth: 50, flex: 1 }
];
