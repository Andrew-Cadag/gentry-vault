import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function WatchForm({
  // All existing props...
  brand, setBrand,
  model, setModel,
  referenceNumber, setReferenceNumber,
  quantity, setQuantity,
  price, setPrice,
  condition, setCondition,
  status, setStatus,
  imageUrl, setImageUrl,
  handleFormSubmit,
  editingWatchId,
  onCancelEdit,
  // New props for validation
  errors,
  isFormValid
}) {
  return (
    <Form noValidate onSubmit={handleFormSubmit}>
      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Brand</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="e.g., Rolex" 
              value={brand} 
              onChange={(e) => setBrand(e.target.value)} 
              isInvalid={!!errors.brand} // Show red border if there's an error
              required 
            />
            {/* Display error message if it exists */}
            <Form.Control.Feedback type="invalid">{errors.brand}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Model</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="e.g., Submariner" 
              value={model} 
              onChange={(e) => setModel(e.target.value)} 
              isInvalid={!!errors.model}
              required 
            />
            <Form.Control.Feedback type="invalid">{errors.model}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Reference Number</Form.Label>
            <Form.Control 
              type="text" 
              value={referenceNumber} 
              onChange={(e) => setReferenceNumber(e.target.value)} 
              isInvalid={!!errors.referenceNumber}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.referenceNumber}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              isInvalid={!!errors.quantity}
              required 
              min="0" 
            />
            <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Price (PHP)</Form.Label>
            <Form.Control 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              isInvalid={!!errors.price}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
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
        <Col md={6}>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control 
              type="url" 
              placeholder="https://example.com/image.jpg" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)}
              isInvalid={!!errors.imageUrl}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.imageUrl}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} className="d-flex justify-content-end gap-2 mt-4">
          {editingWatchId && (
            <Button variant="secondary" type="button" onClick={onCancelEdit}>
              Cancel
            </Button>
          )}
          <Button variant="primary" type="submit" disabled={!isFormValid}>
            {editingWatchId ? 'Update Watch' : 'Add to Inventory'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default WatchForm;
