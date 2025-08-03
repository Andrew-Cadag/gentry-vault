import React from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import Header from './Header';
import KpiCard from './KpiCard';
import WatchForm from './WatchForm';
import InventoryTable from './InventoryTable';

// --- SVG Icons for KPI Cards ---
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M12.736 4.264a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L5.5 10.793l6.236-6.529z"/><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>;
const WarningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>;
const BrandsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/><path d="M2.5 7.5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11z"/></svg>;


function Dashboard({
  // All existing props...
  brand, setBrand, model, setModel, referenceNumber, setReferenceNumber, price, setPrice, condition, setCondition, status, setStatus, imageUrl, setImageUrl,
  quantity, setQuantity,
  handleFormSubmit, handleDeleteWatch, handleSelectWatchToEdit, handleCancelEdit,
  editingWatchId, watches, allWatches, // <-- Receive allWatches here
  showModal, handleCloseModal, handleShowAddModal,
  errors, isFormValid,
  searchTerm, setSearchTerm,
  brandFilter, setBrandFilter, statusFilter, setStatusFilter // <-- Receive filter props
}) {

  // --- Calculate KPI data ---
  const totalInventory = allWatches.length; // Calculate from the full list
  const availableStock = allWatches.filter(w => w.status === 'Available').length;
  const lowStock = allWatches.filter(w => w.status !== 'Sold' && w.status !== 'Reserved').length < 3 ? 1 : 0;
  const totalBrands = new Set(allWatches.map(w => w.brand)).size;

  return (
    <>
      <Header 
        onShowAddModal={handleShowAddModal} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Row className="g-3 mb-4">
        <Col md={6} lg={3}>
          <KpiCard title="Total Inventory" value={totalInventory} icon={<ClockIcon />} className="h-100" />
        </Col>
        <Col md={6} lg={3}>
          <KpiCard title="Available Stock" value={availableStock} icon={<CheckIcon />} trend={`${totalInventory > 0 ? ((availableStock / totalInventory) * 100).toFixed(1) : 0}% availability rate`} className="h-100" />
        </Col>
        <Col md={6} lg={3}>
          <KpiCard title="Low Stock" value={lowStock} icon={<WarningIcon />} trend={lowStock > 0 ? 'Requires attention' : 'All stock levels OK'} className="h-100" />
        </Col>
        <Col md={6} lg={3}>
          <KpiCard title="Total Brands" value={totalBrands} icon={<BrandsIcon />} trend="Premium brands" className="h-100" />
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton style={{borderBottom: '1px solid var(--border-color)'}}>
          <Modal.Title style={{fontFamily: "'Playfair Display', serif"}}>
            {editingWatchId ? 'Edit Timepiece' : 'Add New Timepiece'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WatchForm 
            brand={brand} setBrand={setBrand}
            model={model} setModel={setModel}
            referenceNumber={referenceNumber} setReferenceNumber={setReferenceNumber}
            price={price} setPrice={setPrice}
            condition={condition} setCondition={setCondition}
            status={status} setStatus={setStatus}
            imageUrl={imageUrl} setImageUrl={setImageUrl}
            quantity={quantity} setQuantity={setQuantity}
            handleFormSubmit={handleFormSubmit}
            editingWatchId={editingWatchId}
            onCancelEdit={handleCloseModal}
            errors={errors}
            isFormValid={isFormValid}
          />
        </Modal.Body>
      </Modal>

      <InventoryTable
        watches={watches} // This is the filtered list for display
        allWatches={allWatches} // Pass the full list for generating filter options
        onDeleteWatch={handleDeleteWatch}
        onEditWatch={handleSelectWatchToEdit}
        brandFilter={brandFilter}
        setBrandFilter={setBrandFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    </>
  );
}

export default Dashboard;
