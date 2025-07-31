// This is a simple wrapper around the fetch API
const api = {
  get: async (endpoint, token) => {
    return fetch(`/api${endpoint}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  post: async (endpoint, body, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    // Add token to header if it exists (for protected routes)
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    // Use the correct path for auth vs. api routes
    const url = endpoint.startsWith('/auth') ? endpoint : `/api${endpoint}`;
    return fetch(url, options);
  },

  // --- THIS IS THE NEW FUNCTION ---
  put: async (endpoint, body, token) => {
    const options = {
      method: 'PUT', // The HTTP method is PUT for updates
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Protected routes always need a token
      },
      body: JSON.stringify(body),
    };
    return fetch(`/api${endpoint}`, options);
  },
  // --------------------------------

  delete: async (endpoint, token) => {
    return fetch(`/api${endpoint}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
};

export default api;