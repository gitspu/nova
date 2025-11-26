// ===================================================
// ไฟล์: src/Admin/components/StatCard.jsx
// คำอธิบาย: การ์ดแสดงสถิติสำหรับหน้า Dashboard
// ===================================================

import React from 'react';
import { Card } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatCard = ({ 
  title, 
  value, 
  growth, 
  icon, 
  color = 'primary',
  bgColor = '#0d6efd' 
}) => {
  // ตรวจสอบว่าเป็นการเติบโตหรือลดลง
  const isPositiveGrowth = growth && growth.startsWith('+');
  const isNegativeGrowth = growth && growth.startsWith('-');

  return (
    <Card className="stat-card shadow-sm border-0 h-100">
      <Card.Body className="d-flex flex-column">
        {/* ส่วนบนของการ์ด - ไอคอนและชื่อ */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h6 className="text-muted mb-0 fw-normal">{title}</h6>
          </div>
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: `${bgColor}20`,
              color: bgColor
            }}
          >
            {icon && React.cloneElement(icon, { size: 24 })}
          </div>
        </div>

        {/* ตัวเลขสถิติหลัก */}
        <div className="mb-2">
          <h2 className="mb-0 fw-bold" style={{ color: bgColor }}>
            {value.toLocaleString('th-TH')}
          </h2>
        </div>

        {/* แสดงอัตราการเติบโต */}
        {growth && (
          <div className="d-flex align-items-center">
            {isPositiveGrowth && (
              <span className="text-success d-flex align-items-center small">
                <FaArrowUp className="me-1" />
                <strong>{growth}</strong>
              </span>
            )}
            {isNegativeGrowth && (
              <span className="text-danger d-flex align-items-center small">
                <FaArrowDown className="me-1" />
                <strong>{growth}</strong>
              </span>
            )}
            {!isPositiveGrowth && !isNegativeGrowth && (
              <span className="text-muted small">
                <strong>{growth}</strong>
              </span>
            )}
            <span className="text-muted small ms-2">จากเดือนที่แล้ว</span>
          </div>
        )}
      </Card.Body>

      <style jsx>{`
        .stat-card {
          transition: all 0.3s ease;
          cursor: default;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </Card>
  );
};

export default StatCard;