// ===================================================
// ไฟล์: src/Admin/pages/UserManagement.jsx
// คำอธิบาย: หน้าจัดการผู้ใช้งานทั้งหมด (เพิ่ม Export CSV)
// ===================================================

import React, { useState } from 'react';
import { Card, Badge, Button, Modal } from 'react-bootstrap';
import { 
  FaEye, 
  FaBan, 
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaFileAlt,
  FaBriefcase,
  FaFileExport // เพิ่ม icon สำหรับ Export
} from 'react-icons/fa';

// Import Components
import DataTable from '../admin_component/DataTable';
import Pagination from '../admin_component/Pagination';

// Import Data & Helpers
import { mockUsers } from '../admin_data/mockData';
import { 
  formatDate, 
  getStatusBadge, 
  getUserTypeBadge,
  paginateData,
  filterByDate // เพิ่ม import filterByDate
} from '../admin_utils/helpers';

const UserManagement = () => {
  // State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // State สำหรับ Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // State สำหรับ Date Filter
  const [dateFilter, setDateFilter] = useState('all'); // 'today', 'week', 'month', 'all'

  // ฟังก์ชันเปิด Modal รายละเอียดผู้ใช้
  const handleShowDetail = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // ฟังก์ชันปิด Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // ฟังก์ชันระงับผู้ใช้
  const handleSuspendUser = (user) => {
    if (window.confirm(`คุณต้องการระงับผู้ใช้ "${user.name}" หรือไม่?`)) {
      console.log('Suspending user:', user);
      // TODO: เชื่อม API เพื่อระงับผู้ใช้
    }
  };

  // ฟังก์ชันอนุมัติผู้ใช้
  const handleApproveUser = (user) => {
    if (window.confirm(`คุณต้องการอนุมัติผู้ใช้ "${user.name}" หรือไม่?`)) {
      console.log('Approving user:', user);
      // TODO: เชื่อม API เพื่ออนุมัติผู้ใช้
    }
  };

  // ===================================================
  // กรองข้อมูลตามวันที่โดยใช้ helper function
  // ===================================================
  const filteredUsers = filterByDate(mockUsers, 'joinDate', dateFilter);

  // ===================================================
  // ฟังก์ชัน Export เป็น CSV
  // ===================================================
  const handleExportCSV = () => {
    try {
      // กำหนด Header ของ CSV
      const headers = [
        'ID',
        'ชื่อ',
        'อีเมล',
        'เบอร์โทร',
        'ประเภท',
        'สถานะ',
        'วันที่สมัคร',
        'จำนวนเรซูเม่',
        'จำนวนงานที่โพสต์',
        'จำนวนการสมัครงาน'
      ];

      // แปลงข้อมูลเป็น Array
      const csvData = filteredUsers.map(user => {
        // แปลงประเภทผู้ใช้เป็นภาษาไทย
        const userType = user.type === 'jobseeker' ? 'ผู้หางาน' : 'บริษัท';
        
        // แปลงสถานะเป็นภาษาไทย
        const statusText = getStatusBadge(user.status).text;

        return [
          user.id,
          user.name,
          user.email,
          user.phone || '-',
          userType,
          statusText,
          formatDate(user.joinDate),
          user.type === 'jobseeker' ? (user.resumeCount || 0) : '-',
          user.type === 'company' ? (user.jobPostCount || 0) : '-',
          user.type === 'jobseeker' ? (user.applicationCount || 0) : '-'
        ];
      });

      // รวม Header และ Data
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => 
          row.map(cell => {
            // ถ้ามี comma หรือ quote ให้ใส่ quote ครอบ
            const cellStr = String(cell);
            if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
              return `"${cellStr.replace(/"/g, '""')}"`;
            }
            return cellStr;
          }).join(',')
        )
      ].join('\n');

      // เพิ่ม BOM สำหรับ UTF-8 (เพื่อให้ Excel แสดงภาษาไทยได้ถูกต้อง)
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

      // สร้าง link สำหรับดาวน์โหลด
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      // กำหนดชื่อไฟล์ด้วยวันที่ปัจจุบัน
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
      const fileName = `users_data_${dateStr}.csv`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      
      // เพิ่มเข้า DOM และคลิก
      document.body.appendChild(link);
      link.click();
      
      // ลบออกจาก DOM
      document.body.removeChild(link);
      
      // แสดงข้อความสำเร็จ
      alert(`ดาวน์โหลดไฟล์ ${fileName} สำเร็จ!\n\nจำนวนข้อมูลทั้งหมด: ${filteredUsers.length} รายการ`);
      
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์ กรุณาลองใหม่อีกครั้ง');
    }
  };

  // แบ่งหน้าข้อมูล (ใช้ข้อมูลที่กรองแล้ว)
  const paginatedResult = paginateData(filteredUsers, currentPage, itemsPerPage);

  // กำหนดคอลัมน์ของตาราง
  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      className: 'text-center',
      render: (value) => <span className="text-muted">#{value}</span>
    },
    {
      key: 'name',
      label: 'ชื่อ',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="fw-semibold">{value}</div>
          <small className="text-muted">{row.email}</small>
        </div>
      )
    },
    {
      key: 'type',
      label: 'ประเภท',
      sortable: true,
      className: 'text-center',
      render: (value) => {
        const badge = getUserTypeBadge(value);
        return (
          <Badge bg={badge.class}>
            {badge.icon} {badge.text}
          </Badge>
        );
      }
    },
    {
      key: 'status',
      label: 'สถานะ',
      sortable: true,
      className: 'text-center',
      render: (value) => {
        const badge = getStatusBadge(value);
        return <Badge bg={badge.class}>{badge.text}</Badge>;
      }
    },
    {
      key: 'joinDate',
      label: 'วันที่สมัคร',
      sortable: true,
      render: (value) => (
        <small className="text-muted">{formatDate(value)}</small>
      )
    },
    {
      key: 'resumeCount',
      label: 'เรซูเม่',
      sortable: true,
      className: 'text-center',
      render: (value, row) => {
        if (row.type === 'jobseeker') {
          return <Badge bg="info" pill>{value || 0}</Badge>;
        }
        return <span className="text-muted">-</span>;
      }
    },
    {
      key: 'jobPostCount',
      label: 'งานที่โพสต์',
      sortable: true,
      className: 'text-center',
      render: (value, row) => {
        if (row.type === 'company') {
          return <Badge bg="success" pill>{value || 0}</Badge>;
        }
        return <span className="text-muted">-</span>;
      }
    },
    {
      key: 'actions',
      label: 'การกระทำ',
      className: 'text-center',
      render: (value, row) => (
        <div className="d-flex gap-1 justify-content-center">
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => handleShowDetail(row)}
            title="ดูรายละเอียด"
          >
            <FaEye />
          </Button>
          {row.status === 'pending' && (
            <Button
              size="sm"
              variant="outline-success"
              onClick={() => handleApproveUser(row)}
              title="อนุมัติ"
            >
              <FaCheckCircle />
            </Button>
          )}
          {row.status === 'active' && (
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => handleSuspendUser(row)}
              title="ระงับ"
            >
              <FaBan />
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div>
      {/* หัวข้อหน้า */}
      <div className="mb-4">
        <h2 className="mb-1 fw-bold">จัดการผู้ใช้งาน</h2>
        <p className="text-muted">
          ดูและจัดการข้อมูลผู้ใช้งานทั้งหมดในระบบ (ทั้งหมด {mockUsers.length} คน | แสดง {filteredUsers.length} คน)
        </p>
      </div>

      {/* สถิติย่อย */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">ผู้ใช้ทั้งหมด</div>
                  <h4 className="mb-0 fw-bold">{filteredUsers.length}</h4>
                </div>
                <FaCheckCircle size={30} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">ใช้งานปกติ</div>
                  <h4 className="mb-0 fw-bold text-success">
                    {filteredUsers.filter(u => u.status === 'active').length}
                  </h4>
                </div>
                <FaCheckCircle size={30} className="text-success" />
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">รอตรวจสอบ</div>
                  <h4 className="mb-0 fw-bold text-warning">
                    {filteredUsers.filter(u => u.status === 'pending').length}
                  </h4>
                </div>
                <FaCheckCircle size={30} className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">ระงับการใช้งาน</div>
                  <h4 className="mb-0 fw-bold text-danger">
                    {filteredUsers.filter(u => u.status === 'inactive').length}
                  </h4>
                </div>
                <FaBan size={30} className="text-danger" />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* ตารางข้อมูลผู้ใช้ */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          {/* Header และปุ่ม Export CSV */}
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <div>
              <h5 className="mb-1 fw-bold text-dark">รายการผู้ใช้งานทั้งหมด</h5>
              <small className="text-muted">จัดการและค้นหาข้อมูลผู้ใช้ในระบบ</small>
            </div>
            <Button 
              variant="outline-primary"
              onClick={handleExportCSV}
              className="d-flex align-items-center gap-2 px-3"
              style={{
                fontWeight: '500',
                borderWidth: '2px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <FaFileExport />
              <span>ดาวน์โหลด CSV</span>
            </Button>
          </div>

          {/* Date Filter Buttons */}
          <div className="mb-4">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div className="btn-group" role="group">
                <Button
                  size="sm"
                  variant={dateFilter === 'today' ? 'primary' : 'outline-primary'}
                  onClick={() => {
                    setDateFilter('today');
                    setCurrentPage(1);
                  }}
                  style={{ fontWeight: dateFilter === 'today' ? '600' : '500' }}
                >
                  วันนี้
                </Button>
                <Button
                  size="sm"
                  variant={dateFilter === 'week' ? 'primary' : 'outline-primary'}
                  onClick={() => {
                    setDateFilter('week');
                    setCurrentPage(1);
                  }}
                  style={{ fontWeight: dateFilter === 'week' ? '600' : '500' }}
                >
                  สัปดาห์นี้
                </Button>
                <Button
                  size="sm"
                  variant={dateFilter === 'month' ? 'primary' : 'outline-primary'}
                  onClick={() => {
                    setDateFilter('month');
                    setCurrentPage(1);
                  }}
                  style={{ fontWeight: dateFilter === 'month' ? '600' : '500' }}
                >
                  เดือนนี้
                </Button>
                <Button
                  size="sm"
                  variant={dateFilter === 'all' ? 'primary' : 'outline-primary'}
                  onClick={() => {
                    setDateFilter('all');
                    setCurrentPage(1);
                  }}
                  style={{ fontWeight: dateFilter === 'all' ? '600' : '500' }}
                >
                  ทั้งหมด
                </Button>
              </div>
              {dateFilter !== 'all' && (
                <Badge bg="info" className="ms-2">
                  แสดง {filteredUsers.length} จาก {mockUsers.length} รายการ
                </Badge>
              )}
            </div>
          </div>

          <DataTable
            columns={columns}
            data={paginatedResult.data}
            searchable={true}
            searchFields={['name', 'email', 'phone']}
          />
          
          {/* Pagination */}
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={paginatedResult.totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Modal แสดงรายละเอียดผู้ใช้ */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดผู้ใช้</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              {/* ข้อมูลหลัก */}
              <div className="mb-4">
                <h5 className="mb-3 fw-bold border-bottom pb-2">ข้อมูลทั่วไป</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaCheckCircle className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">ชื่อ</small>
                        <strong>{selectedUser.name}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaEnvelope className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">อีเมล</small>
                        <strong>{selectedUser.email}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaPhone className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">เบอร์โทร</small>
                        <strong>{selectedUser.phone}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaCalendar className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">วันที่สมัคร</small>
                        <strong>{formatDate(selectedUser.joinDate)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* สถานะและประเภท */}
              <div className="mb-4">
                <h5 className="mb-3 fw-bold border-bottom pb-2">สถานะและประเภท</h5>
                <div className="d-flex gap-3">
                  <div>
                    <small className="text-muted d-block mb-1">ประเภทผู้ใช้</small>
                    <Badge bg={getUserTypeBadge(selectedUser.type).class} className="px-3 py-2">
                      {getUserTypeBadge(selectedUser.type).text}
                    </Badge>
                  </div>
                  <div>
                    <small className="text-muted d-block mb-1">สถานะ</small>
                    <Badge bg={getStatusBadge(selectedUser.status).class} className="px-3 py-2">
                      {getStatusBadge(selectedUser.status).text}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* สถิติเพิ่มเติม */}
              <div>
                <h5 className="mb-3 fw-bold border-bottom pb-2">สถิติการใช้งาน</h5>
                <div className="row g-3">
                  {selectedUser.type === 'jobseeker' && (
                    <>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start">
                          <FaFileAlt className="text-success me-2 mt-1" />
                          <div>
                            <small className="text-muted d-block">เรซูเม่ที่สร้าง</small>
                            <strong>{selectedUser.resumeCount || 0} ฉบับ</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start">
                          <FaBriefcase className="text-info me-2 mt-1" />
                          <div>
                            <small className="text-muted d-block">งานที่สมัคร</small>
                            <strong>{selectedUser.applicationCount || 0} ตำแหน่ง</strong>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedUser.type === 'company' && (
                    <>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start">
                          <FaBriefcase className="text-success me-2 mt-1" />
                          <div>
                            <small className="text-muted d-block">งานที่โพสต์</small>
                            <strong>{selectedUser.jobPostCount || 0} ตำแหน่ง</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start">
                          <FaCheckCircle className="text-info me-2 mt-1" />
                          <div>
                            <small className="text-muted d-block">ขนาดบริษัท</small>
                            <strong>{selectedUser.companySize || '-'} คน</strong>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ปิด
          </Button>
          {selectedUser && selectedUser.status === 'pending' && (
            <Button 
              variant="success" 
              onClick={() => {
                handleApproveUser(selectedUser);
                handleCloseModal();
              }}
            >
              อนุมัติผู้ใช้
            </Button>
          )}
          {selectedUser && selectedUser.status === 'active' && (
            <Button 
              variant="danger" 
              onClick={() => {
                handleSuspendUser(selectedUser);
                handleCloseModal();
              }}
            >
              ระงับผู้ใช้
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;