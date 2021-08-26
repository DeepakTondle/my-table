import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

const ModalPopup = (props) => {
  return (
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to remove?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={props.remove}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalPopup;