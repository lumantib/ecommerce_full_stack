export const columns = [
    // { headerClassName: 'super-app-theme--header',
    // field: '_id', headerName: 'ID', minWidth: 250 },
    {
        headerClassName: 'super-app-theme--header',
        field: 'photo', headerName: 'IMG', width: 30, renderCell: (params) => params.value ? <img src={`http://localhost:5000/photo/${params.value}`} className="rounded-full w-8 h-8" /> : <></>,
    },
    {
        headerClassName: 'super-app-theme--header',
        field: 'name', headerName: 'Name', minWidth: 150
    },
    {
        headerClassName: 'super-app-theme--header',
        field: 'price', headerName: 'Price', minWidth: 150
    },
    {
        headerClassName: 'super-app-theme--header',
        field: 'isVerified', headerName: 'Verified', minWidth: 150
    },
    {
        headerClassName: 'super-app-theme--header',
        field: 'description', headerName: 'Description', minWidth: 150, flex: 1
    }
];
