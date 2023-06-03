// import QuickFilteringInitialize from '@/components/UI/DataTable/QuickFilteringInitialize';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import QuickFilteringInitialize from './QuickFilteringInitialize';

// const QuickFilteringInitialize = dynamic(() => import('@/components/UI/DataTable/QuickFilteringInitialize'), {
//     ssr: false, suspense: true, loading: () => <p>Loading...</p>,
// });

const DataListAdmin = (props) => {
    return (
        <div className="flex w-full flex-col gap-2">
            <div className="flex w-full justify-between items-center">
                <span>{props.identifiers.title}</span>
                {
                    props.selectedRows.length === 0
                        ?
                        props.identifiers.add
                            ?
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={() => props.handleOpen(props.identifiers.add.modal_mode)}
                            >
                                {props.identifiers.add.button_label}
                            </Button>
                            :
                            <></>
                        :
                        <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => props.handleOpen(props.identifiers.deleteSelected.modal_mode)}
                        >
                            Delete Selected
                        </Button>
                }
            </div>
            <QuickFilteringInitialize
                identifiers={props.identifiers}
                setSelectedRows={props.setSelectedRows}
                data={props.data}
                handleOpen={props.handleOpen}
                columns={props?.columns}
                statusFilter={props?.statusFilter}
            />
        </div>
    )
}

export default DataListAdmin