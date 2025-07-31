import React, { useState, useEffect } from 'react';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import api from './services/api';

function App() {
  
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [watches, setWatches] = useState([]);
  const [editingWatchId, setEditingWatchId] = useState(null);

  
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Used');
  const [status, setStatus] = useState('Available');
  const [imageUrl, setImageUrl] = useState('');

  
  const fetchWatches = async (authToken) => {
    try {
      const response = await api.get('/watches', authToken);
      if (response.ok) {
        const data = await response.json();
        setWatches(data);
      } else if (response.status === 401 || response.status === 403) {
        console.error('Authentication error. Logging out.');
        localStorage.removeItem('token');
        setToken(null);
      } else {
        console.error(`Failed to fetch watches: Server responded with ${response.status}`);
        alert('An error occurred while fetching your collection. Please check the console.');
      }
    } catch (error) {
      console.error('Network error fetching watches:', error);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchWatches(savedToken);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        fetchWatches(data.token);
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Login error. Please try again.');
    }
  };

  const handleSelectWatchToEdit = (watch) => {
    setEditingWatchId(watch.id);
    setBrand(watch.brand);
    setModel(watch.model);
    setReferenceNumber(watch.reference_number || '');
    setPrice(watch.price || '');
    setCondition(watch.condition);
    setStatus(watch.status);
    setImageUrl(watch.image_url || '');
  };

  const handleCancelEdit = () => {
    setEditingWatchId(null);
    setBrand('');
    setModel('');
    setReferenceNumber('');
    setPrice('');
    setCondition('Used');
    setStatus('Available');
    setImageUrl('');
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();
  const watchData = {
    brand,
    model,
    reference_number: referenceNumber,
    price: price || null,
    condition,
    status,
    image_url: imageUrl,
  };

    try {
    let response;
    if (editingWatchId) {
     
      console.log("Attempting to UPDATE watch with ID:", editingWatchId);
      console.log("Data being sent:", watchData);
      

      response = await api.put(`/watches/${editingWatchId}`, watchData, token);
    } else {
      response = await api.post('/watches', watchData, token);
    }

    if (response.ok) {
      fetchWatches(token);
      handleCancelEdit();
    } else {
      alert(`Failed to ${editingWatchId ? 'update' : 'add'} watch.`);
    }
  } catch (error) {
    console.error(`Error in form submission:`, error);
  }
};

  const handleDeleteWatch = async (id) => {
    try {
      const response = await api.delete(`/watches/${id}`, token);
      if (response.ok) {
        fetchWatches(token);
      } else {
        alert('Failed to delete watch.');
      }
    } catch (error) {
      console.error('Delete watch error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setWatches([]);
  };

  
  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Dashboard 
      watches={watches}
      handleLogout={handleLogout}
      handleDeleteWatch={handleDeleteWatch}
      handleFormSubmit={handleFormSubmit}
      editingWatchId={editingWatchId}
      handleCancelEdit={handleCancelEdit}
      handleSelectWatchToEdit={handleSelectWatchToEdit}
      brand={brand} setBrand={setBrand}
      model={model} setModel={setModel}
      referenceNumber={referenceNumber} setReferenceNumber={setReferenceNumber}
      price={price} setPrice={setPrice}
      condition={condition} setCondition={setCondition}
      status={status} setStatus={setStatus}
      imageUrl={imageUrl} setImageUrl={setImageUrl}
    />
  );
}

export default App;