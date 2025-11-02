import './pagination.css';

function Pagination({paging, onPageChange}) {
    return (  
        <>
            <div class="pagination-section">
                <div class="pagination-info">
                    <div class="page-info">Page {paging.currentPage} of { paging.totalPages }</div>
                </div>

                <div class="pagination-container">
                    <div class="pagination-nav">
                        <button
                            class="nav-btn nbd"
                            id="firstPage"
                            onClick={()=>onPageChange(1)}
                        >
                            <i class="fas fa-angle-double-left"></i>
                            First
                        </button>
                        <button
                            class="nav-btn nbu"
                            id="prevPage"
                            onClick={()=>onPageChange(paging.currentPage - 1)}
                        >
                            <i class="fas fa-chevron-left"></i>
                            Previous
                        </button>
                    </div>

                    <div class="pagination-controls">
                        <button class="pagination-btn active">{ paging.currentPage }</button>
                    </div>

                    <div class="pagination-nav">
                        <button
                            class="nav-btn nbu"
                            id="nextPage"
                            onClick={()=>onPageChange(paging.currentPage + 1)}
                        >
                            Next
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <button
                            class="nav-btn nbd"
                            id="lastPage"
                            onClick={()=>onPageChange(paging.totalPages)}
                        >
                            Last
                            <i class="fas fa-angle-double-right"></i>
                        </button>
                    </div>
                </div>

                 {/* Mobile Compact Version 
                <div class="pagination-compact">
                    <div class="mobile-pagination">
                        <button class="nav-btn">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <div class="mobile-page-info">Page 1 of 62</div>
                        <button class="nav-btn">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default Pagination;