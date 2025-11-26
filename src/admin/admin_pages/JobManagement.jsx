// ===================================================
// ไฟล์: src/Admin/pages/JobManagement.jsx
// คำอธิบาย: หน้าจัดการตำแหน่งงานที่องค์กรโพสต์ (เพิ่ม Export CSV)
// ===================================================

import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Form } from 'react-bootstrap';
import { 
  FaEye, 
  FaCheckCircle, 
  FaTimes,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendar,
  FaUsers,
  FaClock,
  FaBriefcase,
  FaFileExport // เพิ่ม icon สำหรับ Export
} from 'react-icons/fa';

// Import Components
import DataTable from '../admin_component/DataTable';
import Pagination from '../admin_component/Pagination';

// Import Data & Helpers
import { mockJobs } from '../admin_data/mockData';
import { 
  formatDate, 
  getStatusBadge,
  formatSalaryRange,
  paginateData,
  filterByDate // เพิ่ม import filterByDate
} from '../admin_utils/helpers';

const JobManagement = () => {
  // State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // State สำหรับ Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // State สำหรับ Modal ปฏิเสธงาน
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // State สำหรับ Date Filter
  const [dateFilter, setDateFilter] = useState('all'); // 'today', 'week', 'month', 'all'

  // ฟังก์ชันเปิด Modal รายละเอียดงาน
  const handleShowDetail = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  // ฟังก์ชันปิด Modal รายละเอียด
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  // ฟังก์ชันอนุมัติงาน
  const handleApproveJob = (job) => {
    if (window.confirm(`คุณต้องการอนุมัติงาน "${job.title}" หรือไม่?`)) {
      console.log('Approving job:', job);
      // TODO: เชื่อม API เพื่ออนุมัติงาน
      handleCloseModal();
    }
  };

  // ฟังก์ชันเปิด Modal ปฏิเสธงาน
  const handleShowRejectModal = (job) => {
    setSelectedJob(job);
    setShowRejectModal(true);
  };

  // ฟังก์ชันปฏิเสธงาน
  const handleRejectJob = () => {
    if (!rejectReason.trim()) {
      alert('กรุณาระบุเหตุผลในการปฏิเสธ');
      return;
    }
    
    console.log('Rejecting job:', selectedJob, 'Reason:', rejectReason);
    // TODO: เชื่อม API เพื่อปฏิเสธงาน
    
    setShowRejectModal(false);
    setShowModal(false);
    setRejectReason('');
    setSelectedJob(null);
  };

  // ฟังก์ชันปิดรับสมัครงาน
  const handleCloseJob = (job) => {
    if (window.confirm(`คุณต้องการปิดรับสมัครงาน "${job.title}" หรือไม่?`)) {
      console.log('Closing job:', job);
      // TODO: เชื่อม API เพื่อปิดรับสมัครงาน
    }
  };

  // ===================================================
  // กรองข้อมูลตามวันที่โดยใช้ helper function
  // ===================================================
  const filteredJobs = filterByDate(mockJobs, 'postedDate', dateFilter);

  // ===================================================
  // ฟังก์ชัน Export เป็น CSV
  // ===================================================
  const handleExportCSV = () => {
    try {
      // กำหนด Header ของ CSV
      const headers = [
        'ID',
        'ตำแหน่งงาน',
        'บริษัท',
        'หมวดหมู่',
        'ประเภทงาน',
        'สถานที่',
        'เงินเดือน',
        'สถานะ',
        'จำนวนผู้สมัคร',
        'วันที่โพสต์'
      ];

      // แปลงข้อมูลเป็น Array
      const csvData = filteredJobs.map(job => {
        // แปลงประเภทงานเป็นภาษาไทย
        const jobType = job.type === 'full-time' ? 'งานประจำ' : 
                       job.type === 'part-time' ? 'งานพาร์ทไทม์' :
                       job.type === 'contract' ? 'งานสัญญาจ้าง' : 'อื่นๆ';
        
        // แปลงสถานะเป็นภาษาไทย
        const statusText = getStatusBadge(job.status).text;

        return [
          job.id,
          job.title,
          job.company,
          job.category,
          jobType,
          job.location,
          formatSalaryRange(job.salary),
          statusText,
          job.applicationCount || 0,
          formatDate(job.postedDate)
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
      const fileName = `jobs_data_${dateStr}.csv`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      
      // เพิ่มเข้า DOM และคลิก
      document.body.appendChild(link);
      link.click();
      
      // ลบออกจาก DOM
      document.body.removeChild(link);
      
      // แสดงข้อความสำเร็จ
      alert(`ดาวน์โหลดไฟล์ ${fileName} สำเร็จ!\n\nจำนวนข้อมูลทั้งหมด: ${filteredJobs.length} ตำแหน่ง`);
      
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์ กรุณาลองใหม่อีกครั้ง');
    }
  };

  // แบ่งหน้าข้อมูล (ใช้ข้อมูลที่กรองแล้ว)
  const paginatedResult = paginateData(filteredJobs, currentPage, itemsPerPage);

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
      label: 'ตำแหน่งงาน',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="fw-semibold">{value}</div>
          <small className="text-muted">
            <FaBuilding className="me-1" />
            {row.company}
          </small>
        </div>
      )
    },
    {
      key: 'category',
      label: 'หมวดหมู่',
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
      key: 'applicationCount',
      label: 'ผู้สมัคร',
      sortable: true,
      className: 'text-center',
      render: (value) => (
        <Badge bg="primary" pill>{value}</Badge>
      )
    },
    {
      key: 'postedDate',
      label: 'วันที่โพสต์',
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
                onClick={() => handleApproveJob(row)}
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
          {row.status === 'active' && (
            <Button
              size="sm"
              variant="outline-dark"
              onClick={() => handleCloseJob(row)}
              title="ปิดรับสมัคร"
            >
              <FaTimes />
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
        <h2 className="mb-1 fw-bold">จัดการตำแหน่งงาน</h2>
        <p className="text-muted">
          ดูและอนุมัติตำแหน่งงานที่องค์กรโพสต์ (ทั้งหมด {mockJobs.length} ตำแหน่ง | แสดง {filteredJobs.length} ตำแหน่ง)
        </p>
      </div>

      {/* สถิติย่อย */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">งานทั้งหมด</div>
                  <h4 className="mb-0 fw-bold">{filteredJobs.length}</h4>
                </div>
                <FaBriefcase size={30} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">เปิดรับสมัคร</div>
                  <h4 className="mb-0 fw-bold text-success">
                    {filteredJobs.filter(j => j.status === 'active').length}
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
                    {filteredJobs.filter(j => j.status === 'pending').length}
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
                  <div className="text-muted small">ปิดรับสมัคร</div>
                  <h4 className="mb-0 fw-bold text-secondary">
                    {filteredJobs.filter(j => j.status === 'closed').length}
                  </h4>
                </div>
                <FaTimes size={30} className="text-secondary" />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* ตารางข้อมูลงาน */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          {/* Header และปุ่ม Export CSV */}
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <div>
              <h5 className="mb-1 fw-bold text-dark">รายการตำแหน่งงานทั้งหมด</h5>
              <small className="text-muted">จัดการและตรวจสอบประกาศงานในระบบ</small>
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
                  แสดง {filteredJobs.length} จาก {mockJobs.length} รายการ
                </Badge>
              )}
            </div>
          </div>

          <DataTable
            columns={columns}
            data={paginatedResult.data}
            searchable={true}
            searchFields={['title', 'company', 'category', 'location']}
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

      {/* Modal แสดงรายละเอียดงาน */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดตำแหน่งงาน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <div>
              {/* ชื่อตำแหน่งและสถานะ */}
              <div className="mb-4">
                <h4 className="mb-2 fw-bold">{selectedJob.title}</h4>
                <div className="d-flex gap-2 align-items-center mb-3">
                  <Badge bg={getStatusBadge(selectedJob.status).class} className="px-3 py-2">
                    {getStatusBadge(selectedJob.status).text}
                  </Badge>
                  <Badge bg="secondary" className="px-3 py-2">
                    {selectedJob.category}
                  </Badge>
                  <Badge bg="info" className="px-3 py-2">
                    {selectedJob.type === 'full-time' ? 'งานประจำ' : 'งานอื่นๆ'}
                  </Badge>
                </div>
              </div>

              {/* ข้อมูลบริษัทและตำแหน่ง */}
              <div className="mb-4">
                <h5 className="mb-3 fw-bold border-bottom pb-2">ข้อมูลทั่วไป</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaBuilding className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">บริษัท</small>
                        <strong>{selectedJob.company}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaMapMarkerAlt className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">สถานที่</small>
                        <strong>{selectedJob.location}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaMoneyBillWave className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">เงินเดือน</small>
                        <strong>{formatSalaryRange(selectedJob.salary)}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaCalendar className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">วันที่โพสต์</small>
                        <strong>{formatDate(selectedJob.postedDate)}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaUsers className="text-primary me-2 mt-1" />
                      <div>
                        <small className="text-muted d-block">จำนวนผู้สมัคร</small>
                        <strong>{selectedJob.applicationCount} คน</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* รายละเอียดงาน */}
              <div className="mb-4">
                <h5 className="mb-3 fw-bold border-bottom pb-2">รายละเอียดงาน</h5>
                <p className="text-muted mb-2">
                  {selectedJob.description}
                </p>
              </div>

              {/* คุณสมบัติที่ต้องการ */}
              <div>
                <h5 className="mb-3 fw-bold border-bottom pb-2">คุณสมบัติที่ต้องการ</h5>
                <p className="text-muted mb-0">
                  {selectedJob.requirements}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ปิด
          </Button>
          {selectedJob && selectedJob.status === 'pending' && (
            <>
              <Button 
                variant="danger" 
                onClick={() => {
                  handleCloseModal();
                  handleShowRejectModal(selectedJob);
                }}
              >
                <FaTimes className="me-1" />
                ปฏิเสธ
              </Button>
              <Button 
                variant="success" 
                onClick={() => handleApproveJob(selectedJob)}
              >
                <FaCheckCircle className="me-1" />
                อนุมัติ
              </Button>
            </>
          )}
          {selectedJob && selectedJob.status === 'active' && (
            <Button 
              variant="dark" 
              onClick={() => {
                handleCloseJob(selectedJob);
                handleCloseModal();
              }}
            >
              <FaTimes className="me-1" />
              ปิดรับสมัคร
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal ปฏิเสธงาน */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ปฏิเสธตำแหน่งงาน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <div>
              <p className="mb-3">
                คุณกำลังจะปฏิเสธตำแหน่ง: <strong>{selectedJob.title}</strong>
              </p>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  เหตุผลในการปฏิเสธ <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="กรุณาระบุเหตุผลที่ปฏิเสธตำแหน่งงานนี้..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <Form.Text className="text-muted">
                  เหตุผลนี้จะถูกส่งไปยังองค์กรเพื่อปรับปรุงประกาศงาน
                </Form.Text>
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="danger" onClick={handleRejectJob}>
            <FaTimes className="me-1" />
            ยืนยันการปฏิเสธ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobManagement;