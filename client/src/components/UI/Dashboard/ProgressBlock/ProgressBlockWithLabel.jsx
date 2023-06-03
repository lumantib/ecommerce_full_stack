import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';

const ProgressBlockWithLabel = (props) => {
    return (
        <div
            className='p-4 flex justify-center items-center gap-4 flex-1'
            style={{ width: "12.8rem", minWidth: "12.8rem" }}
            onClick={() => props.setStatusFilter([
                {
                    field: "status",
                    operator: "equals",
                    value: `${props?.search_label}`
                }
            ])}
        >
            <Box sx={{ m: 1, position: "relative" }}>
                <Fab
                    aria-label="save"
                    sx={{ bgcolor: props?.color }}
                    color
                >
                    {props.icon}
                </Fab>
                <CircularProgress
                    size={68}
                    variant="determinate"
                    value={props.value}
                    sx={{
                        // color: green[500],
                        color: props?.color,
                        position: "absolute",
                        top: -6,
                        left: -6,
                        zIndex: 1
                    }}
                />
            </Box>
            <div className='flex flex-col' style={{ color: props?.color.color }}>
                <span>
                    <span
                        className={`font-bold`}
                    >
                        {props.count} {props.count_label}
                    </span>

                </span>
                <span>{props.label}</span>
            </div>
        </div >
    )
}

export default ProgressBlockWithLabel