// import SimpleSnackbar from '@/components/UI/Snackbar/SimpleSnackbar'
import React, { useEffect, useState } from 'react';
import AdminOrderRespondFrom from './AdminOrderRespondFrom';
import { columns } from './columns';
import identifiers from './identifiers';
import DataListAdmin from '../../../../UI/DataTable/DataListAdmin';
import RowMenuComponent from '../../../../UI/DataTable/RowMenuComponents/RowMenuComponent';
import publicRequest from '../../../../../requests/requestMethos';
import ModalContainer from '../../../../UI/MUI/Modals/ModalContainer';
import MuiModal from '../../../../UI/MUI/Modals/MuiModal';
import SimpleSnackbar from '../../../../UI/Snackbar/SimpleSnackbar';

const AdminViewOrderListPage = () => {
    useEffect(() => {
        fetchData()
    }, []);

    // Response Message
    const [responseMessage, setResponseMessage] = useState("123");

    // Api Calls
    const [data, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const fetchData = () => {
        publicRequest.get('/orders')
            .then(res => {
                console.log(res?.data)
                res?.data?.orders?.forEach(order => {
                    delete order.buyer._id
                    Object.assign(order, order.buyer)
                });
                console.log(res.data)
                setTotalData(res?.data)
                setData(res?.data?.orders)
            })
            .catch(err => console.log(err))
    }

    // state for filter
    const [statusFilter, setStatusFilter] = useState([]);

    // Selected Item
    const [selectedRowItemId, setSelectedRowItemId] = useState();

    const [selectedRows, setSelectedRows] = React.useState([]);

    // Snack Bar Handling
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Modal Config
    const [open, setOpen] = React.useState(false);
    const [modalMode, setModalMode] = React.useState("")
    const handleOpen = (mode) => {
        setOpen(true)
        setModalMode(mode)
    }

    // close and set selected row id to null
    const handleClose = () => setOpen(false);

    const optionButton = {
        field: "actions",
        headerName: "",
        headerAlign: 'center',
        sortable: false,
        width: 40,
        renderCell: ({ row }) =>
            <RowMenuComponent
                identifiers={identifiers}
                handleOpen={handleOpen}
                row={row}
                setSelectedRowItemId={setSelectedRowItemId}
            />
    }

    // Default props for forms
    const modalProps = {
        handleClose: handleClose,
        isLoading: isLoading,
        setOpenSnackbar: setOpenSnackbar,
        setIsLoading: setIsLoading,
        fetchData: fetchData,
        setResponseMessage: setResponseMessage
    }

    return (
        <>
            <MuiModal handleOpen={handleOpen} handleClose={handleClose} open={open} setOpen={setOpen} >
                {
                    modalMode === identifiers.add.modal_mode && (
                        <ModalContainer title={identifiers.add.title} handleClose={handleClose} identifiers={identifiers} modalMode={modalMode}>
                            <AdminOrderRespondFrom
                                {...modalProps}
                            />
                        </ModalContainer>
                    )
                }
                {
                    modalMode === identifiers.edit.modal_mode && (
                        <ModalContainer title={identifiers.edit.title} handleClose={handleClose} identifiers={identifiers} modalMode={modalMode}>
                            <AdminOrderRespondFrom
                                {...modalProps}
                                selectedData={data.find((data => data._id == selectedRowItemId))}
                            />
                        </ModalContainer>
                    )
                }

            </MuiModal>


            <DataListAdmin
                identifiers={identifiers}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                handleOpen={handleOpen}
                data={data}
                columns={[...columns, optionButton]}
                statusFilter={statusFilter}
            />
            <SimpleSnackbar message={responseMessage} open={openSnackbar} setOpen={setOpenSnackbar} />
            <div>
                <p className='py-2 my-2'>Remaining Price: Rs. {totalData.totalPayementRemainingPrice}</p>
                <p className='py-2 my-2'>Recieved Price: Rs. {totalData.totalPayementCompletedPrice}</p>
                <p className='py-2 my-2'>Total Price: Rs. {totalData.totalPrice}</p>
            </div>
        </>
    )
}

export default AdminViewOrderListPage