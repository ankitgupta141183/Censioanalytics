import React from 'react';
import './AdminCommonPagination.scss'
import PaginationItem from './PaginationItem';

const AdminCommonPagination = ({ currentPage, totalPages, pagesToShow, setCurrentPage }) => {

    const handlePageChange = (page) => {
        if (page !== '...') {
            setCurrentPage(page);
        }
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrev = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };


    // Calculate the range of pages to display
    const pageStart = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const pageEnd = Math.min(totalPages, pageStart + pagesToShow - 1);

    // Create an array of page numbers within the range
    const renderPaginationPages = () => {
        const currentPages = Array.from({ length: pageEnd - pageStart + 1 }, (_, index) =>
            pageStart + index
        );
        if (pageEnd < totalPages) {
            currentPages.push('...', totalPages)
        }
        if (pageStart > 1) {
            totalPages > 5  ? currentPages.unshift(1, '...') : currentPages.unshift(1)
        }
        return currentPages
    }

    return (
        <div className='d-flex pagination-inner' >
            <button onClick={handlePrev} disabled={currentPage === 1}
                className={currentPage === 1 ? "disable-pagination-footer-btn" : 'active-pagination-footer-btn'}
            >
                Previous
            </button>
            {/* {pageStart > 1 && <button className='disable-footer-btn'>...</button>} */}
            {renderPaginationPages().map((page , i) => (
                <PaginationItem
                    key={i}
                    page={page}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            ))}
            {/* {pageEnd < totalPages && <button className='disable-footer-btn'>...</button>} */}

            <button onClick={handleNext} disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "disable-pagination-footer-btn" : 'active-pagination-footer-btn'}
            >
                Next
            </button>
        </div>
    );
};

export default AdminCommonPagination;