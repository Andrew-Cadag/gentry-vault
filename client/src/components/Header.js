import React from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';

// The component now accepts searchTerm and setSearchTerm as props
function Header({ onShowAddModal, searchTerm, setSearchTerm }) {
  return (
    <Row className="align-items-center mb-4">
      {/* Column for the title and subtitle */}
      <Col>
        <h1 style={{ fontFamily: "'Playfair Display', serif", margin: 0, fontSize: '2.5rem' }}>Curator's Dashboard</h1>
        <p style={{ color: 'var(--secondary-text)', margin: 0 }}>Your luxury timepiece collection</p>
      </Col>

      {/* Column for the search bar and button */}
      <Col xs="auto">
        <div className="d-flex align-items-center" style={{ gap: '15px' }}>
          <InputGroup style={{ width: '300px' }}>
            <InputGroup.Text style={{ backgroundColor: 'var(--surface-dark)', border: '1px solid var(--border-color)' }}>
              {/* Search Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--secondary-text)" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search by brand, model..."
              aria-label="Search"
              value={searchTerm} // Connect the value to the state
              onChange={(e) => setSearchTerm(e.target.value)} // Update the state on change
            />
          </InputGroup>
          <Button variant="primary" onClick={onShowAddModal}>
            + Add Timepiece
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default Header;
