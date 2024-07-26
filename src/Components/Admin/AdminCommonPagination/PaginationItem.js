import React from 'react';

const PaginationItem = ({ page, currentPage, onPageChange }) => {
  const handleClick = () => {
    onPageChange(page);
  };

  return (
    <button
    className={page === currentPage ? "active-footer-btn" : "disable-footer-btn"}
      onClick={handleClick}
    >
      {page} 
    </button>
  );
};

export default PaginationItem;