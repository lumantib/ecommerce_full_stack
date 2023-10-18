import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export const columns = [
    // { headerClassName: 'super-app-theme--header',
{
    headerClassName: 'super-app-theme--header',
        field: 'username', headerName: 'Buyer', minWidth: 50
},
{
    headerClassName: 'super-app-theme--header',
        field: 'email', headerName: 'Contact Email', minWidth: 50
},
{
    headerClassName: 'super-app-theme--header',
        field: 'products', headerName: 'Items', width: 50, valueFormatter: (params) => params?.value?.length
},
{
    headerClassName: 'super-app-theme--header',
        field: 'totalPrice', headerName: 'Price', width: 50
},
{
    field: 'payement_completed', headerName: 'Payement Completed', minWidth: 50, flex: 1,
        renderCell: (params) => (
            params?.value ?
                <CheckCircleRoundedIcon />
                :
                <CancelRoundedIcon />)

}
];
