// import SimpleSnackbar from '@/components/UI/Snackbar/SimpleSnackbar'
import React, { useEffect, useState } from 'react';
import publicRequest from '../../../../requests/requestMethos';
import AdminEditUsersFrom from './AdminEditUsersFrom';
import AdminUserDeleteFrom from './AdminUserDeleteFrom';
import { columns } from './columns';
import identifiers from './identifiers';
import MuiModal from '../../../UI/MUI/Modals/MuiModal';
import ModalContainer from '../../../UI/MUI/Modals/ModalContainer';
import DataListAdmin from '../../../UI/DataTable/DataListAdmin';
import RowMenuComponent from '../../../UI/DataTable/RowMenuComponents/RowMenuComponent';
import SimpleSnackbar from '../../../UI/Snackbar/SimpleSnackbar';

const AdminViewUsersListPage = () => {
    useEffect(() => {
        fetchData()
    }, []);

    // Response Message
    const [responseMessage, setResponseMessage] = useState("123");

    // Api Calls
    const [data, setData] = useState([]);
    const fetchData = () => {
        publicRequest.get('/users')
            .then(res => {
                console.log(res.data)
                setData(res?.data)
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
                            <AdminEditUsersFrom
                                {...modalProps}
                            />
                        </ModalContainer>
                    )
                }
                {
                    modalMode === identifiers.edit.modal_mode && (
                        <ModalContainer title={identifiers.edit.title} handleClose={handleClose} identifiers={identifiers} modalMode={modalMode}>
                            <AdminEditUsersFrom
                                {...modalProps}
                                selectedData={data.find((data => data._id == selectedRowItemId))}
                            />
                        </ModalContainer>
                    )
                }
                {
                    modalMode === identifiers.delete.modal_mode && (
                        <ModalContainer title={identifiers.delete.title} handleClose={handleClose} identifiers={identifiers} modalMode={modalMode}>
                            <AdminUserDeleteFrom
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

        </>
    )
}

export default AdminViewUsersListPage