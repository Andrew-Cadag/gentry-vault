import React from 'react';
import { Card } from 'react-bootstrap';

// A reusable component for displaying key performance indicators (KPIs).
// It accepts a className prop to allow for flexible styling, like making all cards in a row equal height.
function KpiCard({ title, value, icon, trend, className }) {

  // This helper function determines the color for the icon and trend text based on the card's title or trend content.
  // This makes the card's appearance dynamic and data-driven.
  const getTrendColor = () => {
    if (title === "Available Stock") return '#28a745'; // A vibrant green for positive stock status
    if (title === "Low Stock" && value > 0) return 'var(--accent-yellow)'; // The brand's accent yellow for warnings
    if (trend && trend.includes('+')) return '#28a745'; // Green for any positive percentage trend
    return 'var(--secondary-text)'; // A neutral grey for general information
  };

  // Styles for the icon on the right, including a semi-transparent background matching its color.
  const iconStyle = {
    fontSize: '24px',
    color: getTrendColor(),
    backgroundColor: `${getTrendColor()}20`, // Hex alpha transparency (20 is ~12.5% opacity)
    borderRadius: '50%',
    width: '40px', // Fixed width
    height: '40px', // Fixed height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    // The className prop (e.g., "h-100") is passed to the Card to control its layout within a grid.
    <Card className={className}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          {/* Main content on the left */}
          <div className="d-flex flex-column">
            <Card.Subtitle 
              className="mb-2" 
              style={{ color: 'var(--secondary-text)', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.5px' }}
            >
              {title}
            </Card.Subtitle>
            <Card.Title as="h2" className="mb-1" style={{ fontFamily: "'Lato', sans-serif", fontWeight: '700' }}>{value}</Card.Title>
            {/* This placeholder ensures consistent height even if a card has no trend text. */}
            <small style={{ color: getTrendColor(), minHeight: '1.2em', display: 'inline-block' }}>
              {trend || ''}
            </small>
          </div>
          {/* Icon on the right */}
          <div style={iconStyle}>
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default KpiCard;
