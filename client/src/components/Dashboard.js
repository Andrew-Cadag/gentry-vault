import React from 'react';
import WatchForm from './WatchForm';
import WatchList from './WatchList';

function Dashboard({
  
  brand, setBrand,
  model, setModel,
  referenceNumber, setReferenceNumber,
  price, setPrice,
  condition, setCondition,
  status, setStatus,
  imageUrl, setImageUrl,
  
  
  handleLogout,
  handleFormSubmit, 
  handleDeleteWatch,
  handleSelectWatchToEdit, 
  handleCancelEdit, 
  
  
  editingWatchId, 
  watches
}) {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>The Gentry Vault</h1>
        <button onClick={handleLogout} style={{ padding: '8px 12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </div>

      <WatchForm 
        brand={brand} setBrand={setBrand}
        model={model} setModel={setModel}
        referenceNumber={referenceNumber} setReferenceNumber={setReferenceNumber}
        price={price} setPrice={setPrice}
        condition={condition} setCondition={setCondition}
        status={status} setStatus={setStatus}
        imageUrl={imageUrl} setImageUrl={setImageUrl}
        handleFormSubmit={handleFormSubmit}
        editingWatchId={editingWatchId}
        onCancelEdit={handleCancelEdit}
      />

      <WatchList 
        watches={watches}
        onDeleteWatch={handleDeleteWatch}
        onEditWatch={handleSelectWatchToEdit}
      />
    </div>
  );
}

export default Dashboard;