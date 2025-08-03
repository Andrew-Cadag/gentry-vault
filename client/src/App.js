import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import Sidebar from './components/Sidebar.js';
import NotificationToast from './components/NotificationToast.js';
import ConfirmationModal from './components/ConfirmationModal.js';
import api from './services/api';

function App() {
  // --- STATE MANAGEMENT ---
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [watches, setWatches] = useState([]);
  const [editingWatchId, setEditingWatchId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });
  const [watchToDelete, setWatchToDelete] = useState(null);
  
  // --- Pagination State ---
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  // --- Search & Filter State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('All Brands');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Form-Specific State
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Used');
  const [status, setStatus] = useState('Available');
  const [imageUrl, setImageUrl] = useState('');

  // --- DERIVED STATE FOR FILTERING (Now operates on the current page's data) ---
  const filteredWatches = useMemo(() => {
    return watches
      .filter(watch => {
        if (brandFilter !== 'All Brands' && watch.brand !== brandFilter) return false;
        if (statusFilter !== 'All Status' && watch.status !== statusFilter) return false;
        if (searchTerm && !(
          watch.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          watch.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          watch.reference_number.toLowerCase().includes(searchTerm.toLowerCase())
        )) return false;
        return true;
      });
  }, [watches, searchTerm, brandFilter, statusFilter]);


  // --- REUSABLE VALIDATION LOGIC ---
  const validateForm = useCallback((fields) => {
    const { brand, model, referenceNumber, price, quantity, imageUrl } = fields;
    const newErrors = {};
    if (!brand) newErrors.brand = 'Brand is required.';
    if (!model) newErrors.model = 'Model is required.';
    if (!referenceNumber) newErrors.referenceNumber = 'Reference number is required.';
    if (!price) newErrors.price = 'Price is required.';
    else if (isNaN(price) || Number(price) < 0) newErrors.price = 'Price must be a positive number.';
    if (!quantity) newErrors.quantity = 'Quantity is required.';
    else if (isNaN(quantity) || Number(quantity) < 0) newErrors.quantity = 'Quantity must be a positive number.';
    if (!imageUrl) newErrors.imageUrl = 'Image URL is required.';
    else { try { new URL(imageUrl); } catch (_) { newErrors.imageUrl = 'Please enter a valid URL.'; } }
    return newErrors;
  }, []);

  useEffect(() => {
    if (showModal) {
      const fields = { brand, model, referenceNumber, price, quantity, imageUrl };
      const newErrors = validateForm(fields);
      setErrors(newErrors);
    }
  }, [brand, model, referenceNumber, price, quantity, imageUrl, showModal, validateForm]);

  const isFormValid = Object.keys(errors).length === 0;

  // --- MODAL & TOAST HANDLERS ---
  const handleCloseModal = () => setShowModal(false);
  const showToast = (message, variant = 'success') => {
    setToast({ show: true, message, variant });
  };
  
  const handleShowAddModal = () => {
    setEditingWatchId(null);
    setBrand(''); setModel(''); setReferenceNumber(''); setQuantity(1);
    setPrice(''); setCondition('Used'); setStatus('Available'); setImageUrl('');
    const initialFields = { brand: '', model: '', referenceNumber: '', price: '', quantity: 1, imageUrl: '' };
    setErrors(validateForm(initialFields));
    setShowModal(true);
  };

  // --- CORE FUNCTIONS ---
  const fetchWatches = useCallback(async (authToken, page = 1) => {
    try {
      // Now we send the page number in the request
      const response = await api.get(`/watches?page=${page}`, authToken);
      if (response.ok) {
        const data = await response.json();
        setWatches(data.watches); // The watches for the current page
        setPagination(data.pagination); // The pagination info
      }
    } catch (error) { console.error('Error fetching watches:', error); }
  }, []); // useCallback to memoize the function

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchWatches(savedToken, pagination.currentPage);
    }
  }, [fetchWatches, pagination.currentPage]); // Re-fetch when currentPage changes

  const handleLogin = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        fetchWatches(data.token, 1); // Fetch the first page on login
      } else { alert(data.message || 'Login failed'); }
    } catch (error) { alert('Login error. Please try again.'); }
  };

  const handleSelectWatchToEdit = (watch) => {
    setEditingWatchId(watch.id);
    setBrand(watch.brand); setModel(watch.model); setReferenceNumber(watch.reference_number || '');
    setQuantity(watch.quantity || 1); setPrice(watch.price || ''); setCondition(watch.condition);
    setStatus(watch.status); setImageUrl(watch.image_url || '');
    setErrors({});
    setShowModal(true);
  };

  const handleCancelEdit = () => {
    setEditingWatchId(null);
    setBrand(''); setModel(''); setReferenceNumber(''); setQuantity(1);
    setPrice(''); setCondition('Used'); setStatus('Available'); setImageUrl('');
    setErrors({});
    handleCloseModal();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const watchData = {
      brand, model, reference_number: referenceNumber, quantity,
      price: price || null, condition, status, image_url: imageUrl,
    };

    try {
      const response = editingWatchId
        ? await api.put(`/watches/${editingWatchId}`, watchData, token)
        : await api.post('/watches', watchData, token);

      if (response.ok) {
        fetchWatches(token, pagination.currentPage); // Re-fetch the current page
        handleCancelEdit();
        showToast(`'${watchData.brand} ${watchData.model}' ${editingWatchId ? 'updated' : 'added'} successfully!`);
      } else { showToast(`Failed to ${editingWatchId ? 'update' : 'add'} watch.`, 'danger'); }
    } catch (error) { console.error(`Error in form submission:`, error); }
  };

  const requestDeleteWatch = (watch) => {
    setWatchToDelete(watch);
  };

  const confirmDeleteWatch = async () => {
    if (!watchToDelete) return;
    try {
      const response = await api.delete(`/watches/${watchToDelete.id}`, token);
      if (response.ok) {
        fetchWatches(token, pagination.currentPage); // Re-fetch the current page
        showToast(`'${watchToDelete.brand} ${watchToDelete.model}' was deleted.`, 'success');
      }
      else { showToast('Failed to delete watch.', 'danger'); }
    } catch (error) { console.error('Delete watch error:', error); }
    setWatchToDelete(null);
  };

  const cancelDeleteWatch = () => {
    setWatchToDelete(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setWatches([]);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  const mainContentStyle = { marginLeft: '280px', padding: '20px' };

  return (
    <div className="app-layout">
      <Sidebar handleLogout={handleLogout} />
      <div style={mainContentStyle}>
        <Dashboard 
          watches={filteredWatches}
          allWatches={watches}
          handleDeleteWatch={requestDeleteWatch}
          handleFormSubmit={handleFormSubmit}
          editingWatchId={editingWatchId}
          handleCancelEdit={handleCancelEdit}
          handleSelectWatchToEdit={handleSelectWatchToEdit}
          brand={brand} setBrand={setBrand}
          model={model} setModel={setModel}
          referenceNumber={referenceNumber} setReferenceNumber={setReferenceNumber}
          quantity={quantity} setQuantity={setQuantity}
          price={price} setPrice={setPrice}
          condition={condition} setCondition={setCondition}
          status={status} setStatus={setStatus}
          imageUrl={imageUrl} setImageUrl={setImageUrl}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleShowAddModal={handleShowAddModal}
          errors={errors}
          isFormValid={isFormValid}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          brandFilter={brandFilter}
          setBrandFilter={setBrandFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          // Pass pagination state and handler
          pagination={pagination}
          onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
        />
      </div>
      <NotificationToast 
        show={toast.show} 
        message={toast.message} 
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })} 
      />
      <ConfirmationModal
        show={!!watchToDelete}
        onHide={cancelDeleteWatch}
        onConfirm={confirmDeleteWatch}
        watchName={watchToDelete ? `${watchToDelete.brand} ${watchToDelete.model}` : ''}
      />
    </div>
  );
}

export default App;
