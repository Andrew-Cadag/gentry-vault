import React from 'react';

import { Card, Button, Row, Col, Badge } from 'react-bootstrap';

function WatchCard({ watch, onDelete, onEdit }) {

  
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Sold':
        return 'danger';
      case 'Reserved':
        return 'warning';
      case 'Available':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Col md={4} className="d-flex align-items-center justify-content-center p-2">
          {watch.image_url ? 
            <Card.Img src={watch.image_url} alt={`${watch.brand} ${watch.model}`} style={{ maxHeight: '200px', width: 'auto', objectFit: 'contain' }} /> :
            <div style={{width: '100%', height: '200px', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', color: '#6c757d'}}>No Image</div>
          }
        </Col>
        <Col md={8}>
          {}
          <Card.Body className="d-flex justify-content-between align-items-start">
            {}
            <div>
              <Card.Title as="h4">{watch.brand} {watch.model}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Ref: {watch.reference_number || 'N/A'}</Card.Subtitle>
              
              <Card.Text as="div" className="mt-3">
                <p><strong>Price:</strong> {watch.price ? Number(watch.price).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }) : 'N/A'}</p>
                <p><strong>Condition:</strong> {watch.condition}</p>
                <p className="d-flex align-items-center">
                  <strong>Status:</strong>
                  <Badge bg={getStatusVariant(watch.status)} className="ms-2">{watch.status}</Badge>
                </p>
              </Card.Text>
            </div>

            {}
            <div className="d-flex flex-column gap-2">
              <Button variant="primary" onClick={() => onEdit(watch)}>Edit</Button>
              <Button variant="outline-danger" onClick={() => onDelete(watch.id)}>Delete</Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default WatchCard;
