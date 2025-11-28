// ===================================================
// ไฟล์: src/Admin/components/DataTable.jsx
// คำอธิบาย: ตารางข้อมูลที่ใช้ซ้ำได้ พร้อมฟีเจอร์ค้นหาและเรียงลำดับ
// ===================================================

import React, { useState, useMemo } from 'react';
import { Table, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaSearch, FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';
import { sortData, filterData } from '../admin_utils/helpers';

const DataTable = ({
  columns,           // คอลัมน์ของตาราง [{ key, label, sortable, render }]
  data,             // ข้อมูลที่จะแสดง
  searchable = true, // เปิด/ปิดการค้นหา
  searchFields = [], // ฟิลด์ที่ใช้ในการค้นหา
  loading = false,   // สถานะกำลังโหลดข้อมูล
  emptyMessage = 'ไม่พบข้อมูล' // ข้อความเมื่อไม่มีข้อมูล
}) => {
  // State สำหรับการค้นหา
  const [searchTerm, setSearchTerm] = useState('');
  
  // State สำหรับการเรียงลำดับ
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: 'asc'
  });

  // ฟังก์ชันจัดการการเรียงลำดับ
  const handleSort = (columnKey) => {
    // หาว่าคอลัมน์นี้สามารถเรียงได้หรือไม่
    const column = columns.find(col => col.key === columnKey);
    if (!column || !column.sortable) return;

    let direction = 'asc';
    
    // ถ้ากำลังเรียงคอลัมน์เดิมอยู่ ให้สลับทิศทาง
    if (sortConfig.column === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ column: columnKey, direction });
  };

  // ฟังก์ชันแสดงไอคอนการเรียงลำดับ
  const getSortIcon = (columnKey) => {
    if (sortConfig.column !== columnKey) {
      return <FaSort className="ms-2 text-muted" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <FaSortUp className="ms-2 text-primary" />
      : <FaSortDown className="ms-2 text-primary" />;
  };

  // คำนวณข้อมูลที่จะแสดง (กรอง + เรียงลำดับ)
  const processedData = useMemo(() => {
    let result = [...data];

    // กรองข้อมูลตามคำค้นหา
    if (searchable && searchTerm && searchFields.length > 0) {
      result = filterData(result, searchTerm, searchFields);
    }

    // เรียงลำดับข้อมูล
    if (sortConfig.column) {
      result = sortData(result, sortConfig.column, sortConfig.direction);
    }

    return result;
  }, [data, searchTerm, sortConfig, searchable, searchFields]);

  return (
    <div>
      {/* ช่องค้นหา */}
      {searchable && (
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="ค้นหา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          {searchTerm && (
            <small className="text-muted mt-1 d-block">
              พบ {processedData.length} รายการจากทั้งหมด {data.length} รายการ
            </small>
          )}
        </div>
      )}

      {/* ตาราง */}
      <div className="table-responsive">
        <Table hover className="mb-0">
          <thead className="table-light">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  style={{ 
                    cursor: column.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    verticalAlign: 'middle',
                    whiteSpace: 'nowrap'
                  }}
                  className={column.className || ''}
                >
                  <div className={`d-flex align-items-center ${
                    column.className?.includes('text-center') ? 'justify-content-center' : 
                    column.className?.includes('text-end') ? 'justify-content-end' : ''
                  }`}>
                    {column.label}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* แสดง Spinner ถ้ากำลังโหลด */}
            {loading && (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <div className="mt-2 text-muted">กำลังโหลดข้อมูล...</div>
                </td>
              </tr>
            )}

            {/* แสดงข้อมูล */}
            {!loading && processedData.length > 0 && processedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td 
                    key={column.key} 
                    className={column.className || ''}
                    style={{ verticalAlign: 'middle' }}
                  >
                    {/* ถ้ามีฟังก์ชัน render ให้ใช้ render ไม่งั้นแสดงข้อมูลตรงๆ */}
                    {column.render 
                      ? column.render(row[column.key], row, rowIndex)
                      : row[column.key] || '-'
                    }
                  </td>
                ))}
              </tr>
            ))}

            {/* แสดงข้อความเมื่อไม่มีข้อมูล */}
            {!loading && processedData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-5 text-muted">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <style>{`
        .table-responsive {
          border-radius: 8px;
          overflow: hidden;
        }
        
        .table > thead > tr > th {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          padding: 14px 12px;
          border-bottom: 2px solid #dee2e6;
        }
        
        .table > tbody > tr > td {
          padding: 14px 12px;
        }
        
        .table > tbody > tr {
          transition: background-color 0.2s;
        }
        
        .table > tbody > tr:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default DataTable;