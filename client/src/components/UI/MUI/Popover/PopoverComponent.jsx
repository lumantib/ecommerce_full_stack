import Popover from '@mui/material/Popover';

const PopoverComponent = (props) => {
    
    return (
        <Popover
            id={props.id}
            open={props.open}
            anchorEl={props.anchorEl}
            onClose={props.handlePopOverClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
                boxShadow: "0000"
            }}
        >
            <div className='flex flex-col justify-start w-full p-1'>
                {props.children}
            </div>
        </Popover>
    )
}
export default PopoverComponent