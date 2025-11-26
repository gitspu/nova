// ===================================================
// ไฟล์: src/Admin/AdminDashboard.jsx
// คำอธิบาย: หน้าหลักของระบบ Admin (Layout)
// ===================================================

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Import Components
import Sidebar from './admin_component/Sidebar';

// Import Pages
import Dashboard from './admin_pages/Dashboard';
import UserManagement from './admin_pages/UserManagement';
import JobManagement from './admin_pages/JobManagement';
import ResumeManagement from './admin_pages/ResumeManagement';

const AdminDashboard = () => {
  // State สำหรับเก็บหน้าที่กำลังแสดงอยู่
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // ฟังก์ชันเลือกหน้าที่จะแสดง
  const renderActivePage = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'jobs':
        return <JobManagement />;
      case 'resumes':
        return <ResumeManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-layout" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>

      <Container fluid className="p-0">
        <Row className="g-0">
          {/* เมนูด้านข้าง */}
          <Col md={2} className="position-relative">
            <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          </Col>

          {/* พื้นที่เนื้อหาหลัก */}
          <Col md={10}>
            <div className="p-4">
              {renderActivePage()}
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .admin-layout {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;