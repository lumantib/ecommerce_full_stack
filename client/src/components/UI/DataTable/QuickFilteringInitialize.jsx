import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


export default function QuickFilteringInitialize(props) {
  // Tried dynamic import for these components, result: increased import size of @mui/x-data-grid 
  // const DataGrid = dynamic(() => import('@mui/x-data-grid').then((module) => module.DataGrid), { ssr: false });
  // const GridToolbar = dynamic(() => import('@mui/x-data-grid').then((module) => module.GridToolbar), { ssr: false });
  return (
    <Box sx={{ height: 400, width: 1 }}>

      <DataGrid
        className='rounded-lg bg-white shadow-md'
        rows={props?.data}
        getRowId={(row) => row?.id ? row.id : row._id}
        columns={props?.columns}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          props.setSelectedRows(props?.data?.filter(({ _id }) => newRowSelectionModel.includes(_id)));
        }}
        components={{ Toolbar: GridToolbar }}

        // filterModel={{
        //   items: props?.statusFilter ? props?.statusFilter : []
        // }}

        // initialState={{
        //   ...props?.data,
        //   filter: {
        //     filterModel: {
        //       items: [{ field: 'status', value: `${props?.statusFilter}` }],
        //     },
        //   },
        // }}

        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            // quickFilterProps: { debounceMs: 500 },
          },
        }}
        checkboxSelection={props.identifiers.multiple_deletable}
        disableRowSelectionOnClick
      />
    </Box>
  );
}