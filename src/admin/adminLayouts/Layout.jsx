import { Container, Nav } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../theme.css";

/**
 * Layout สำหรับ Admin Dashboard
 * ประกอบด้วย Sidebar navigation และ Main content area
 */
function Layout() {
  const { pathname } = useLocation();

  // ตรวจสอบว่า link เป็น active หรือไม่
  const isActive = (path) => pathname === path;

  return (
    <div className="d-flex">
      {/* Sidebar Navigation - ติดด้านซ้ายแบบ Fixed */}
      <aside
        className="admin-sidebar"
        style={{
          width: 240,
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div className="p-3 fw-bold">NOVA</div>

        <Nav className="flex-column">
          <Nav.Item>
            <Link
              className={`nav-link ${isActive("/admin") ? "active" : ""}`}
              to="/admin"
            >
              Dashboard
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link
              className={`nav-link ${isActive("/admin/users") ? "active" : ""}`}
              to="/admin/users"
            >
              Users
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link
              className={`nav-link ${
                isActive("/admin/reports") ? "active" : ""
              }`}
              to="/admin/reports"
            >
              Reports
            </Link>
          </Nav.Item>
        </Nav>
      </aside>

      {/* Main Content Area - เว้นระยะซ้ายเท่ากับความกว้าง Sidebar */}
      <main
        className="flex-grow-1"
        style={{
          marginLeft: 240,
          minHeight: "100vh",
        }}
      >
        <Container fluid className="p-3">
          <h4 className="mb-3">Admin Dashboard</h4>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}

export default Layout;
