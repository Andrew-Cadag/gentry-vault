import React from 'react';

import { Form, Button, Card, Row, Col } from 'react-bootstrap';

function WatchForm({
  
  brand, setBrand,
  model, setModel,
  referenceNumber, setReferenceNumber,
  price, setPrice,
  condition, setCondition,
  status, setStatus,
  imageUrl, setImageUrl,
  handleFormSubmit,
  editingWatchId,
  onCancelEdit
}) {
  return (
    
    <Card className="mb-4">
      <Card.Body>
        <h3 className="mb-3">
          {editingWatchId ? 'Edit Watch' : 'Add New Inventory'}
        </h3>
        {}
        <Form onSubmit={handleFormSubmit}>
          {}
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" placeholder="e.g., Rolex" value={brand} onChange={(e) => setBrand(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Model</Form.Label>
                <Form.Control type="text" placeholder="e.g., Submariner" value={model} onChange={(e) => setModel(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Reference Number</Form.Label>
                <Form.Control type="text" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Price (PHP)</Form.Label>
                <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Condition</Form.Label>
                <Form.Select value={condition} onChange={(e) => setCondition(e.target.value)}>
                  <option value="Brand New">Brand New</option>
                  <option value="Mint">Mint</option>
                  <option value="Used">Used</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="url" placeholder="https://example.com/image.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                {editingWatchId ? 'Update Watch' : 'Add to Inventory'}
              </Button>
              {editingWatchId && (
                <Button variant="secondary" type="button" onClick={onCancelEdit}>
                  Cancel Edit
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default WatchForm;
