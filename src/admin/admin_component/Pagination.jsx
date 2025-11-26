// ===================================================
// ไฟล์: src/Admin/components/Pagination.jsx
// คำอธิบาย: คอมโพเนนต์สำหรับแบ่งหน้าข้อมูล
// ===================================================

import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { 
  FaChevronLeft, 
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from 'react-icons/fa';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  maxPagesToShow = 5 
}) => {
  // ฟังก์ชันสร้างหมายเลขหน้าที่จะแสดง
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // ปรับ startPage ถ้า endPage ติดขอบ
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // ฟังก์ชันไปหน้าแรก
  const goToFirstPage = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  // ฟังก์ชันไปหน้าสุดท้าย
  const goToLastPage = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  // ฟังก์ชันไปหน้าก่อนหน้า
  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // ฟังก์ชันไปหน้าถัดไป
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // ถ้ามีเพียงหน้าเดียว ไม่ต้องแสดง Pagination
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="d-flex justify-content-between align-items-center">
      {/* ข้อมูลหน้าปัจจุบัน */}
      <div className="text-muted small">
        หน้า {currentPage} จาก {totalPages}
      </div>

      {/* ปุ่ม Pagination */}
      <BootstrapPagination className="mb-0">
        {/* ปุ่มไปหน้าแรก */}
        <BootstrapPagination.First 
          onClick={goToFirstPage}
          disabled={currentPage === 1}
        >
          <FaAngleDoubleLeft />
        </BootstrapPagination.First>

        {/* ปุ่มหน้าก่อนหน้า */}
        <BootstrapPagination.Prev 
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </BootstrapPagination.Prev>

        {/* แสดง ... ถ้าไม่ได้เริ่มจากหน้า 1 */}
        {pageNumbers[0] > 1 && (
          <>
            <BootstrapPagination.Item onClick={() => onPageChange(1)}>
              1
            </BootstrapPagination.Item>
            {pageNumbers[0] > 2 && <BootstrapPagination.Ellipsis disabled />}
          </>
        )}

        {/* หมายเลขหน้า */}
        {pageNumbers.map(number => (
          <BootstrapPagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </BootstrapPagination.Item>
        ))}

        {/* แสดง ... ถ้าไม่ได้จบที่หน้าสุดท้าย */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <BootstrapPagination.Ellipsis disabled />
            )}
            <BootstrapPagination.Item onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </BootstrapPagination.Item>
          </>
        )}

        {/* ปุ่มหน้าถัดไป */}
        <BootstrapPagination.Next 
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </BootstrapPagination.Next>

        {/* ปุ่มไปหน้าสุดท้าย */}
        <BootstrapPagination.Last 
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
        >
          <FaAngleDoubleRight />
        </BootstrapPagination.Last>
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;