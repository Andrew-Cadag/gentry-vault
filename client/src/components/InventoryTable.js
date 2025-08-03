import React, { useMemo } from 'react';
import { Table, Button, Badge, Form, Card } from 'react-bootstrap';

// Helper function for the status badge
const getStatusVariant = (status) => {
  switch (status) {
    case 'Sold': return { bg: 'danger', text: 'light' };
    case 'Reserved': return { bg: 'warning', text: 'dark' };
    case 'Available': return { bg: 'success', text: 'light' };
    default: return { bg: 'secondary', text: 'light' };
  }
};

// SVG Icons for actions
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm-2.206 2.206-8 8a.5.5 0 0 0-.146.354v2.5a.5.5 0 0 0 .5.5h2.5a.5.5 0 0 0 .354-.146l8-8L10.646 2.354zm.646 6.061L9.793 7.5 3.293 14H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>
);


function InventoryTable({ watches, allWatches, onDeleteWatch, onEditWatch, brandFilter, setBrandFilter, statusFilter, setStatusFilter }) {
  const availableBadgeStyle = {
    backgroundColor: '#28a745',
    color: 'white'
  };

  const headerStyle = {
    textTransform: 'uppercase',
    color: 'var(--secondary-text)',
    fontSize: '0.8rem',
    letterSpacing: '0.5px'
  };

  // Dynamically generate the list of unique brands for the filter dropdown
  const uniqueBrands = useMemo(() => {
    return [...new Set(allWatches.map(watch => watch.brand))];
  }, [allWatches]);

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h3 style={{ fontFamily: "'Playfair Display', serif", margin: 0 }}>Collection Overview</h3>
        <div className="d-flex" style={{ gap: '15px' }}>
          <Form.Select 
            style={{ width: '180px' }} 
            value={brandFilter} 
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option>All Brands</option>
            {uniqueBrands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
          </Form.Select>
          <Form.Select 
            style={{ width: '180px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold</option>
          </Form.Select>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <Table hover variant="dark" responsive="md" className="align-middle mb-0">
          <thead>
            <tr>
              <th style={{...headerStyle, width: '80px', paddingLeft: '1.5rem' }}>Image</th>
              <th style={headerStyle}>Brand</th>
              <th style={headerStyle}>Model</th>
              <th style={headerStyle}>Reference</th>
              <th style={{...headerStyle, width: '150px' }} className="text-end">Price (PHP)</th>
              <th style={{...headerStyle, width: '120px' }}>Condition</th>
              <th style={{...headerStyle, width: '100px' }} className="text-center">Quantity</th>
              <th style={{...headerStyle, width: '120px' }} className="text-center">Status</th>
              <th style={{...headerStyle, width: '100px', paddingRight: '1.5rem' }} className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watches.map(watch => (
              <tr key={watch.id}>
                <td style={{ paddingLeft: '1.5rem' }}>
                  <img 
                    src={watch.image_url || 'https://placehold.co/60x60/1E1E1E/FFFFFF?text=N/A'} 
                    alt={`${watch.brand} ${watch.model}`} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                </td>
                <td>{watch.brand}</td>
                <td>{watch.model}</td>
                <td>{watch.reference_number || 'N/A'}</td>
                <td className="text-end">{watch.price ? Number(watch.price).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }) : 'N/A'}</td>
                <td>{watch.condition}</td>
                <td className="text-center">{watch.quantity}</td>
                <td className="text-center">
                  <Badge 
                    bg={getStatusVariant(watch.status).bg} 
                    text={getStatusVariant(watch.status).text}
                    style={watch.status === 'Available' ? availableBadgeStyle : {}}
                    className="py-2 px-2"
                  >
                    {watch.status}
                  </Badge>
                </td>
                <td className="text-end" style={{ paddingRight: '1.5rem' }}>
                  <Button variant="link" onClick={() => onEditWatch(watch)} className="text-warning p-1">
                    <EditIcon />
                  </Button>
                  <Button variant="link" onClick={() => onDeleteWatch(watch)} className="text-danger p-1 ms-2">
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default InventoryTable;
