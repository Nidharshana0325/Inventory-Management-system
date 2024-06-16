import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
      >
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
