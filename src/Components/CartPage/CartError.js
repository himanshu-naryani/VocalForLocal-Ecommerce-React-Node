import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function ModalError(props) {
    return (
      <Modal
        show={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Out of Stock
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            One or more items in your cart are out of stock !!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {props.errorClickHandler} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

  
  export default ModalError