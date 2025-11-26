// ===================================================
// ไฟล์: src/Admin/pages/ResumeManagement.jsx
// คำอธิบาย: หน้าจัดการเรซูเม่ที่ผู้ใช้สร้าง (เพิ่ม Export CSV)
// ===================================================

import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Form } from 'react-bootstrap';
import { 
  FaEye, 
  FaCheckCircle, 
  FaTimes,
  FaUser,
  FaCalendar,
  FaEyeSlash,
  FaDownload,
  FaFileAlt,
  FaClock,
  FaFileExport // เพิ่ม icon สำหรับ Export
} from 'react-icons/fa';

// Import Components
import DataTable from '../admin_component/DataTable';
import Pagination from '../admin_component/Pagination';

// Import Data & Helpers
import { mockResumes } from '../admin_data/mockData';
import { 
  formatDate, 
  getStatusBadge,
  paginateData,
  filterByDate // เพิ่ม import filterByDate
} from '../admin_utils/helpers';

const ResumeManagement = () => {
  // State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // State สำหรับ Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  // State สำหรับ Modal ปฏิเสธเรซูเม่
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // State สำหรับ Date Filter
  const [dateFilter, setDateFilter] = useState('all'); // 'today', 'week', 'month', 'all'

  // ฟังก์ชันเปิด Modal รายละเอียดเรซูเม่
  const handleShowDetail = (resume) => {
    setSelectedResume(resume);
    setShowModal(true);
  };

  // ฟังก์ชันปิด Modal รายละเอียด
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResume(null);
  };

  // ฟังก์ชันอนุมัติเรซูเม่
  const handleApproveResume = (resume) => {
    if (window.confirm(`คุณต้องการอนุมัติเรซูเม่ "${resume.title}" หรือไม่?`)) {
      console.log('Approving resume:', resume);
      // TODO: เชื่อม API เพื่ออนุมัติเรซูเม่
      handleCloseModal();
    }
  };

  // ฟังก์ชันเปิด Modal ปฏิเสธเรซูเม่
  const handleShowRejectModal = (resume) => {
    setSelectedResume(resume);
    setShowRejectModal(true);
  };

  // ฟังก์ชันปฏิเสธเรซูเม่
  const handleRejectResume = () => {
    if (!rejectReason.trim()) {
      alert('กรุณาระบุเหตุผลในการปฏิเสธ');
      return;
    }
    
    console.log('Rejecting resume:', selectedResume, 'Reason:', rejectReason);
    // TODO: เชื่อม API เพื่อปฏิเสธเรซูเม่
    
    setShowRejectModal(false);
    setShowModal(false);
    setRejectReason('');
    setSelectedResume(null);
  };

  // ฟังก์ชันดาวน์โหลดเรซูเม่ (จำลอง)
  const handleDownloadResume = (resume) => {
    console.log('Downloading resume:', resume);
    alert(`ดาวน์โหลดเรซูเม่: ${resume.title}`);
    // TODO: เชื่อม API เพื่อดาวน์โหลดเรซูเม่
  };

  // ===================================================
  // กรองข้อมูลตามวันที่โดยใช้ helper function
  // ===================================================
  const filteredResumes = filterByDate(mockResumes, 'createdDate', dateFilter);

  // ===================================================
  // ฟังก์ชัน Export เป็น CSV
  // ===================================================
  const handleExportCSV = () => {
    try {
      // กำหนด Header ของ CSV
      const headers = [
        'ID',
        'ชื่อเรซูเม่',
        'เจ้าของ',
        'เทมเพลต',
        'สถานะ',
        'ยอดดู',
        'ยอดดาวน์โหลด',
        'วันที่สร้าง',
        'วันที่แก้ไขล่าสุด'
      ];

      // แปลงข้อมูลเป็น Array
      const csvData = filteredResumes.map(resume => {
        // แปลงสถานะเป็นภาษาไทย
        const statusText = getStatusBadge(resume.status).text;

        return [
          resume.id,
          resume.title,
          resume.ownerName,
          resume.template,
          statusText,
          resume.viewCount || 0,
          resume.downloadCount || 0,
          formatDate(resume.createdDate),
          formatDate(resume.updatedDate)
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
      const fileName = `resumes_data_${dateStr}.csv`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      
      // เพิ่มเข้า DOM และคลิก
      document.body.appendChild(link);
      link.click();
      
      // ลบออกจาก DOM
      document.body.removeChild(link);
      
      // แสดงข้อความสำเร็จ
      alert(`ดาวน์โหลดไฟล์ ${fileName} สำเร็จ!\n\nจำนวนข้อมูลทั้งหมด: ${filteredResumes.length} ฉบับ`);
      
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์ กรุณาลองใหม่อีกครั้ง');
    }
  };

  // แบ่งหน้าข้อมูล (ใช้ข้อมูลที่กรองแล้ว)
  const paginatedResult = paginateData(filteredResumes, currentPage, itemsPerPage);

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
      key: 'title',
      label: 'ชื่อเรซูเม่',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="fw-semibold">{value}</div>
          <small className="text-muted">
            <FaUser className="me-1" />
            {row.ownerName}
          </small>
        </div>
      )
    },
    {
      key: 'template',
      label: 'เทมเพลต',
      sortable: true,
      render: (value) => (
        <Badge bg="secondary" className="px-2 py-1">
          {value}
        </Badge>
      )
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
      key: 'viewCount',
      label: 'ยอดดู',
      sortable: true,
      className: 'text-center',
      render: (value) => (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <FaEye className="text-info" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'createdDate',
      label: 'วันที่สร้าง',
      sortable: true,
      render: (value) => (
        <small className="text-muted">{formatDate(value)}</small>
      )
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
            <>
              <Button
                size="sm"
                variant="outline-success"
                onClick={() => handleApproveResume(row)}
                title="อนุมัติ"
              >
                <FaCheckCircle />
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => handleShowRejectModal(row)}
                title="ปฏิเสธ"
              >
                <FaTimes />
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => handleDownloadResume(row)}
            title="ดาวน์โหลด"
          >
            <FaFileExport />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      {/* หัวข้อหน้า */}
      <div className="mb-4">
        <h2 className="mb-1 fw-bold">จัดการเรซูเม่</h2>
        <p className="text-muted">
          ตรวจสอบและอนุมัติเรซูเม่ที่ผู้ใช้สร้าง (ทั้งหมด {mockResumes.length} ฉบับ | แสดง {filteredResumes.length} ฉบับ)
        </p>
      </div>

      {/* สถิติย่อย */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">เรซูเม่ทั้งหมด</div>
                  <h4 className="mb-0 fw-bold">{filteredResumes.length}</h4>
                </div>
                <FaFileAlt size={30} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">อนุมัติแล้ว</div>
                  <h4 className="mb-0 fw-bold text-success">
                    {filteredResumes.filter(r => r.status === 'approved').length}
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
                    {filteredResumes.filter(r => r.status === 'pending').length}
                  </h4>
                </div>
                <FaClock size={30} className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">ปฏิเสธ</div>
                  <h4 className="mb-0 fw-bold text-danger">
                    {filteredResumes.filter(r => r.status === 'rejected').length}
                  </h4>
                </div>
                <FaTimes size={30} className="text-danger" />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* ตารางข้อมูลเรซูเม่ */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          {/* Header และปุ่ม Export CSV */}
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <div>
              <h5 className="mb-1 fw-bold text-dark">รายการเรซูเม่ทั้งหมด</h5>
              <small className="text-muted">ตรวจสอบและอนุมัติเรซูเม่ที่ผู้ใช้สร้างขึ้น</small>
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
              <span>ดาวน์โหลด</span>
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
                  แสดง {filteredResumes.length} จาก {mockResumes.length} รายการ
                </Badge>
              )}
            </div>
          </div>

          <DataTable
            columns={columns}
            data={paginatedResult.data}
            searchable={true}
            searchFields={['title', 'ownerName', 'template']}
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

      {/* Modal แสดงรายละเอียดเรซูเม่ */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดเรซูเม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedResume && (
            <div>
              {/* ชื่อเรซูเม่และสถานะ */}
              <div className="mb-4">
                <h4 className="mb-2 fw-bold">{selectedResume.title}</h4>
                <div className="d-flex gap-2 align-items-center mb-3">
                  <Badge bg={getStatusBadge(selectedResume.status).class} className="px-3 py-2">
                    {getStatusBadge(selectedResume.status).text}
                  </Badge>
                  <Badge bg="secondary" className="px-3 py-2">
                    {selectedResume.template}
                  </Badge>
                </div>
              </div>

              {/* ข้อมูลเจ้าของเรซูเม่ */}
              <div className="mb-4">
                <h5 className="mb-3 fw-bold border-bottom pb-2">ข้อมูลเจ้าของ</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaUser className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">ชื่อเจ้าของ</small>
                        <strong>{selectedResume.ownerName}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaCalendar className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">วันที่สร้าง</small>
                        <strong>{formatDate(selectedResume.createdDate)}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaCalendar className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">วันที่แก้ไขล่าสุด</small>
                        <strong>{formatDate(selectedResume.updatedDate)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* สถิติการดูและดาวน์โหลด */}
              <div className="mb-4">
                <h5 className="mb-3 fw-bold border-bottom pb-2">สถิติการใช้งาน</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaEye className="text-info me-2 mt-1" size={20} />
                      <div>
                        <small className="text-muted d-block">จำนวนครั้งที่ถูกดู</small>
                        <strong className="text-info">{selectedResume.viewCount} ครั้ง</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaDownload className="text-success me-2 mt-1" size={20} />
                      <div>
                        <small className="text-muted d-block">จำนวนครั้งที่ดาวน์โหลด</small>
                        <strong className="text-success">{selectedResume.downloadCount} ครั้ง</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* สรุปเรซูเม่ */}
              <div className="mb-4">
                <h5 className="mb-3 fw-bold border-bottom pb-2">สรุปเรซูเม่</h5>
                <p className="text-muted mb-0">
                  {selectedResume.summary}
                </p>
              </div>

              {/* เหตุผลการปฏิเสธ (ถ้ามี) */}
              {selectedResume.status === 'rejected' && selectedResume.rejectionReason && (
                <div className="alert alert-danger">
                  <h6 className="fw-bold mb-2">
                    <FaEyeSlash className="me-2" />
                    เหตุผลการปฏิเสธ
                  </h6>
                  <p className="mb-0">{selectedResume.rejectionReason}</p>
                </div>
              )}

              {/* พื้นที่แสดงตัวอย่างเรซูเม่ */}
              <div className="border rounded p-4 bg-light text-center">
                <FaFileAlt size={50} className="text-muted mb-3" />
                <p className="text-muted mb-0">
                  ตัวอย่างเรซูเม่จะแสดงที่นี่<br />
                  <small>(ในระบบจริงจะแสดงตัวอย่างเรซูเม่แบบเต็ม)</small>
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={() => handleDownloadResume(selectedResume)}
          >
            <FaDownload className="me-1" />
            ดาวน์โหลด
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            ปิด
          </Button>
          {selectedResume && selectedResume.status === 'pending' && (
            <>
              <Button 
                variant="danger" 
                onClick={() => {
                  handleCloseModal();
                  handleShowRejectModal(selectedResume);
                }}
              >
                <FaTimes className="me-1" />
                ปฏิเสธ
              </Button>
              <Button 
                variant="success" 
                onClick={() => handleApproveResume(selectedResume)}
              >
                <FaCheckCircle className="me-1" />
                อนุมัติ
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal ปฏิเสธเรซูเม่ */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ปฏิเสธเรซูเม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedResume && (
            <div>
              <p className="mb-3">
                คุณกำลังจะปฏิเสธเรซูเม่: <strong>{selectedResume.title}</strong>
              </p>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  เหตุผลในการปฏิเสธ <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="กรุณาระบุเหตุผลที่ปฏิเสธเรซูเม่นี้..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <Form.Text className="text-muted">
                  เหตุผลนี้จะถูกส่งไปยังเจ้าของเรซูเม่เพื่อปรับปรุง
                </Form.Text>
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="danger" onClick={handleRejectResume}>
            <FaTimes className="me-1" />
            ยืนยันการปฏิเสธ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResumeManagement;