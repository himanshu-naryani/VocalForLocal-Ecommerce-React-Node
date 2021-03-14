import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function DeleteModal(props) {
  const { yesclick, ...vals } = props
  return (
    <Modal
      {...vals}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>
          Are you sure you want to permanently remove this product from your selling list?
          </h6>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ padding: "2% 7% 2% 7%", backgroundColor: "red" }} onClick={props.onHide}>No</Button>
        <Button style={{ padding: "2% 7% 2% 7%", backgroundColor: "green" }} onClick={props.yesclick}>Yes</Button>

      </Modal.Footer>
    </Modal>
  );
}
