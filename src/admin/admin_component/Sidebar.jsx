// ===================================================
// ไฟล์: src/Admin/components/Sidebar.jsx
// คำอธิบาย: เมนูด้านข้างของระบบ Admin
// ===================================================

import React from "react";
import { Nav } from "react-bootstrap";
import {
  FaChartLine,
  FaUsers,
  FaBriefcase,
  FaFileAlt,
  FaCog,
  FaBell,
} from "react-icons/fa";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  // รายการเมนูทั้งหมด
  const menuItems = [
    {
      id: "dashboard",
      label: "ภาพรวม",
      icon: <FaChartLine />,
    },
    {
      id: "users",
      label: "จัดการผู้ใช้",
      icon: <FaUsers />,
    },
    {
      id: "jobs",
      label: "จัดการงาน",
      icon: <FaBriefcase />,
    },
    {
      id: "resumes",
      label: "จัดการเรซูเม่",
      icon: <FaFileAlt />,
    },
  ];

  // ฟังก์ชันจัดการการคลิกเมนู
  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <div className="sidebar bg-white vh-100 shadow-sm">
      {/* โลโก้หรือชื่อระบบ */}
      <div className="p-4 border-bottom">
        <h5 className="mb-0 text-primary fw-bold">
          <FaCog className="me-2" />
          Admin Panel
        </h5>
      </div>

      {/* รายการเมนู */}
      <Nav className="flex-column pt-3">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`px-4 py-3 d-flex align-items-center menu-item ${
              activeMenu === item.id ? "active" : ""
            }`}
            style={{
              cursor: "pointer",
              color: activeMenu === item.id ? "#fff" : "#333",
              backgroundColor:
                activeMenu === item.id ? "#0d6efd" : "transparent",
              borderLeft:
                activeMenu === item.id
                  ? "4px solid #0a58ca"
                  : "4px solid transparent",
              transition: "all 0.3s ease",
            }}
          >
            <span className="me-3" style={{ fontSize: "1.2rem" }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Nav.Link>
        ))}
      </Nav>

      {/* ส่วนล่างของ Sidebar (ถ้ามี) */}
      <div className="position-absolute bottom-0 w-100 p-4 border-top">
        <div className="d-flex align-items-center text-muted small">
          
        </div>
      </div>

      <style jsx>{`
        .menu-item:hover {
          background-color: #f8f9fa !important;
          border-left-color: #0d6efd !important;
        }

        .menu-item.active:hover {
          background-color: #0d6efd !important;
        }
          
        .menu-item.active {
          color: #fff !important;
        }

        .menu-item.active span {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
