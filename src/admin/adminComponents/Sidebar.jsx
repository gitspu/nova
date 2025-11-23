import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

// รายการเมนูสำหรับ Navigation
const menuItems = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/reports", label: "Reports" },
];

/**
 * Sidebar Navigation สำหรับ Admin
 * แสดงเมนูพร้อม highlight menu ที่ active
 */
function Sidebar() {
  const { pathname } = useLocation();

  // ตรวจสอบว่า menu item เป็น active หรือไม่
  const isActive = (path) => pathname === path;

  return (
    <div className="border-end" style={{ width: 240, minHeight: "100vh" }}>
      <div className="p-3 fw-semibold">NOVA</div>

      <Nav className="flex-column">
        {menuItems.map((item) => (
          <Nav.Item key={item.to}>
            <Nav.Link
              as={Link}
              to={item.to}
              className={isActive(item.to) ? "active fw-semibold" : ""}
            >
              {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}

export default Sidebar;
