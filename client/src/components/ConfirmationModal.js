import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmationModal({ show, onHide, onConfirm, watchName }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to permanently delete the following watch?</p>
        <p><strong>{watchName}</strong></p>
        <p className="text-danger">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer style={{borderTop: '1px solid var(--border-color)'}}>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
