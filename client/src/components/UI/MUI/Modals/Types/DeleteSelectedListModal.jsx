import ConfirmationButtonsContainer from "@/components/UI/MUI/Modals/ConfirmationButtons/ConfirmationButtonsContainer"
import ModalContainer from "@/components/UI/MUI/Modals/ModalContainer"

const DeleteSelectedListModal = (props) => {

  const ConfirmButtonsComponent = () => {
    return (
      <ConfirmationButtonsContainer>Delete</ConfirmationButtonsContainer>
    )
  }

  return (
    <ModalContainer title={props.title} handleClose={props.handleClose} confirmButtonsComponent={<ConfirmButtonsComponent />}>

    </ModalContainer>
  )
}

export default DeleteSelectedListModal