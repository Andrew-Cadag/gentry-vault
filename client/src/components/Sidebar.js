import React from 'react';
import { Nav } from 'react-bootstrap';

// You can replace this with an actual SVG logo later
const Logo = () => (
  <div className="text-center mb-4">
    <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--accent-yellow)' }}>Gentry Vault</h2>
  </div>
);

function Sidebar({ handleLogout }) {
  // Placeholder user data
  const user = {
    email: 'admin123@email.com',
    role: 'Curator'
  };

  const sidebarStyle = {
    backgroundColor: 'var(--surface-dark)',
    height: '100vh',
    width: '280px',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderRight: '1px solid var(--border-color)'
  };

  const navLinkStyle = {
    color: 'var(--secondary-text)',
    padding: '10px 15px',
    borderRadius: '5px',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
  };
  
  const activeNavLinkStyle = {
    ...navLinkStyle,
    color: 'var(--primary-text)',
    backgroundColor: 'rgba(255, 215, 0, 0.1)'
  };

  return (
    <div style={sidebarStyle}>
      <Logo />
      <Nav className="flex-column" defaultActiveKey="/inventory">
        <Nav.Link href="#inventory" style={activeNavLinkStyle}>
          Inventory Management
        </Nav.Link>
        {/* The "Settings" Nav.Link has been removed */}
      </Nav>
      
      {/* User Info Section at the bottom */}
      <div className="mt-auto">
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
          <div style={{ color: 'var(--primary-text)' }}>{user.email}</div>
          <small style={{ color: 'var(--accent-yellow)' }}>{user.role}</small>
          <Nav.Link onClick={handleLogout} style={{ ...navLinkStyle, color: 'var(--secondary-text)', padding: '10px 0' }}>
            Logout
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
