import { useEffect, useMemo, useState } from "react";
import { Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import UserTable from "../../adminComponents/UserTable";
import { exportToCSV } from "../../../shared/utils/csvExport";
import { fetchUsers } from "../../../Script/Api/admin";

function Users() {
  // State สำหรับการค้นหาและกรอง
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // State สำหรับข้อมูลผู้ใช้
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  // State สำหรับ UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // โหลดข้อมูลผู้ใช้เมื่อมีการเปลี่ยนแปลง filters หรือ pagination
  useEffect(() => {
    async function loadUsers() {
      try {
        setIsLoading(true);
        const response = await fetchUsers({
          page: currentPage,
          pageSize,
          searchQuery,
          status: statusFilter,
        });
        setUsers(response.users);
        setTotalUsers(response.total);
      } catch (err) {
        setError(err?.message || "ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
      } finally {
        setIsLoading(false);
      }
    }
    loadUsers();
  }, [currentPage, pageSize, searchQuery, statusFilter]);

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalUsers / pageSize)),
    [totalUsers, pageSize]
  );

  // Export ข้อมูลเป็น CSV
  const handleExport = () => exportToCSV(users, "users.csv");

  // จัดการการยืนยันผู้ใช้
  const handleVerify = (user) => {
    alert(`✅ Verified: ${user.name}`);
  };

  // จัดการการปฏิเสธผู้ใช้
  const handleReject = (user) => {
    const confirmed = window.confirm(`Reject ${user.name}?`);
    if (confirmed) {
      alert(`❌ Rejected: ${user.name}`);
    }
  };

  // จัดการการเปลี่ยน search query
  const handleSearchChange = (value) => {
    setCurrentPage(1);
    setSearchQuery(value);
  };

  // จัดการการเปลี่ยน status filter
  const handleStatusChange = (value) => {
    setCurrentPage(1);
    setStatusFilter(value);
  };

  return (
    <>
      <Row className="g-3">
        <Col lg={12}>
          <Card className="shadow-sm">
            <Card.Header>User List</Card.Header>
            <Card.Body>
              {/* ฟอร์มค้นหาและกรอง */}
              <Form className="d-flex gap-2 mb-3">
                <Form.Control
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="flagged">Flags</option>
                </Form.Select>
                <Button variant="outline-secondary" onClick={handleExport}>
                  Export
                </Button>
              </Form>

              {/* แสดงสถานะ Loading และ Error */}
              {isLoading && <div className="text-muted mb-2">Loading...</div>}
              {error && <div className="text-danger mb-2">{error}</div>}

              {/* ตารางผู้ใช้ */}
              <UserTable
                rows={users}
                onView={setSelectedUser}
                onVerify={handleVerify}
                onReject={handleReject}
              />

              {/* Pagination Controls */}
              <div className="d-flex justify-content-end align-items-center gap-2 mt-2">
                <div className="text-muted small">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Back
                </Button>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal แสดงรายละเอียดผู้ใช้ */}
      <Modal show={!!selectedUser} onHide={() => setSelectedUser(null)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <div>
                <strong>Name:</strong> {selectedUser.name}
              </div>
              <div>
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div>
                <strong>Status:</strong> {selectedUser.status}
              </div>
              <div>
                <strong>Registered:</strong> {selectedUser.registeredAt}
              </div>
              <div>
                <strong>Active:</strong> {selectedUser.lastActiveAt}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Users;
