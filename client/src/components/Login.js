import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  // --- Styles for the image background and overlay ---
  const imageBackgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -2, // Place it behind everything
    objectFit: 'cover', // Ensures the image covers the screen without distortion
    filter: 'brightness(0.5)' // Darkens the image slightly
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // A slightly less opaque overlay
    zIndex: -1 // Place it on top of the image, but behind the content
  };

  return (
    <>
      {/* The img element now points to your selected image */}
      <img 
        src="https://wallpapers.com/images/hd/black-brick-background-16njbs1py5zymjnd.jpg" 
        style={imageBackgroundStyle}
        alt="Black brick background"
      />
      
      {/* The overlay darkens the background to ensure text is readable */}
      <div style={overlayStyle}></div>

      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4" style={{fontFamily: "'Playfair Display', serif"}}>Login to The Gentry Vault</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default Login;
