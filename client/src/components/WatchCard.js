import React from 'react';

function WatchCard({ watch, onDelete, onEdit }) {

  // Helper function to determine the color based on the watch's status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Sold':
        return 'red';
      case 'Reserved':
        return 'orange';
      case 'Available':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '15px', display: 'flex', gap: '20px', alignItems: 'center' }}>
      {watch.image_url ? 
        <img src={watch.image_url} alt={`${watch.brand} ${watch.model}`} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '4px' }} /> :
        <div style={{width: '150px', height: '150px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', color: '#aaa'}}>No Image</div>
      }
      <div style={{ flex: 1 }}>
        <h3>{watch.brand} {watch.model}</h3>
        <p><strong>Ref:</strong> {watch.reference_number || 'N/A'}</p>
        <p><strong>Price:</strong> {watch.price ? Number(watch.price).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }) : 'N/A'}</p>
        <p><strong>Condition:</strong> {watch.condition}</p>
        
        {}
        <p><strong>Status:</strong> <span style={{ fontWeight: 'bold', color: getStatusColor(watch.status) }}>{watch.status}</span></p>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
        <button onClick={() => onEdit(watch)} style={{ background: '#007bff', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}>Edit</button>
        <button onClick={() => onDelete(watch.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}>Delete</button>
      </div>
    </div>
  );
}

export default WatchCard;