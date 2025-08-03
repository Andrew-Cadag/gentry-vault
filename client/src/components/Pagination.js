import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  // Don't render the component if there's only one page or less
  if (totalPages <= 1) {
    return null;
  }

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className="d-flex justify-content-center mt-3">
      <Pagination>
        <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
        {items}
        <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
}

export default PaginationComponent;
