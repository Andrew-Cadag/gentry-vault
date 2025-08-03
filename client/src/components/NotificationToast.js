import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// A reusable component to display success or error notifications
function NotificationToast({ show, message, onClose, variant = 'success' }) {
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1055 }}>
      <Toast 
        onClose={onClose} 
        show={show} 
        delay={3000} 
        autohide
        bg={variant} // 'success' for green, 'danger' for red
      >
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default NotificationToast;
