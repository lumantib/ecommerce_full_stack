// import PopoverComponent from '@/components/UI/MUI/Popover/PopoverComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import PopoverComponent from '../../MUI/Popover/PopoverComponent';

const RowMenuComponent = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopOverClose = (e) => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;
  console.log("editDisabled", props?.editDisabled)
  return (
    <div>
      <IconButton aria-label="delete" aria-describedby={id} variant="contained" onClick={handlePopOverClick} >
        <MoreVertIcon />
      </IconButton>
      <PopoverComponent id={id} open={openPopover} anchorEl={anchorEl} handlePopOverClose={handlePopOverClose}>
        {
          props.identifiers.edit && (
            <Button
              size="small"
              aria-label="edit"
              disabled={props?.editDisabled}
              onClick={(e) => {
                handlePopOverClose(e)
                props.setSelectedRowItemId(props.row._id)
                props.handleOpen(props.identifiers.edit.modal_mode)
              }}
              className='text-sm flex justify-start gap-2 text-gray-700'
            >
              <EditIcon fontSize="small" />
              <span className='mr-1'>{props.identifiers.edit.button_label}</span>
            </Button>
          )
        }
        {
          props.identifiers.change_password && (
            <Button
              size="small"
              aria-label="change_password"
              onClick={(e) => {
                handlePopOverClose(e)
                props.setSelectedRowItemId(props.row._id)
                props.handleOpen(props.identifiers.change_password.modal_mode)
              }}
              className='text-sm flex justify-start gap-2 text-gray-700'
            >
              <EditIcon fontSize="small" />
              <span className='mr-1'>{props.identifiers.change_password.button_label}</span>
            </Button>
          )
        }
        {
          props.identifiers.delete && (
            <Button
              size="small"
              aria-label="delete"
              onClick={(e) => {
                handlePopOverClose(e)
                props.setSelectedRowItemId(props.row._id)
                props.handleOpen(props.identifiers.delete.modal_mode)
              }}
              className='text-sm flex justify-start gap-2'
              color='error'
            >
              <DeleteIcon fontSize="small" />
              <span className='mr-1'>{props.identifiers.delete.button_label}</span>
            </Button>

          )
        }

      </PopoverComponent></div>
  )
}

export default RowMenuComponent