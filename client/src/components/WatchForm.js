import React from 'react';

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
    <form onSubmit={handleFormSubmit} style={{ margin: '20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
      <h3 style={{ gridColumn: '1 / -1', margin: '0 0 10px 0' }}>
        {editingWatchId ? 'Edit Watch' : 'Add a New Watch'}
      </h3>
      
      <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required style={{padding: '8px'}} />
      <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required style={{padding: '8px'}} />
      <input type="text" placeholder="Reference Number" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} style={{padding: '8px'}} />
      <input type="number" placeholder="Price (PHP)" value={price} onChange={(e) => setPrice(e.target.value)} style={{padding: '8px'}} />
      <select value={condition} onChange={(e) => setCondition(e.target.value)} style={{padding: '8px'}}><option value="Brand New">Brand New</option><option value="Mint">Mint</option><option value="Used">Used</option></select>
      <select value={status} onChange={(e) => setStatus(e.target.value)} style={{padding: '8px'}}><option value="Available">Available</option><option value="Reserved">Reserved</option><option value="Sold">Sold</option></select>
      <input type="url" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ gridColumn: '1 / -1', padding: '8px' }} />
      
      <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px' }}>
        <button type="submit" style={{ flex: 1, padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
          {editingWatchId ? 'Update Watch' : 'Add Watch'}
        </button>
        {editingWatchId && (
          <button type="button" onClick={onCancelEdit} style={{ padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default WatchForm;