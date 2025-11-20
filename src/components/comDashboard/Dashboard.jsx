// src/pages/Dashboard.jsx
import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { FaUser, FaStar } from "react-icons/fa";
import { MdArticle } from "react-icons/md";

// Component ย่อยสำหรับกล่องสรุปข้อมูล
const StatCard = ({ icon, title, value }) => (
  <Card className="shadow-sm border-0">
    <Card.Body>
      <div className="d-flex align-items-center mb-2">
        <span className="me-2 text-muted" style={{ fontSize: "1.5rem" }}>
          {icon}
        </span>
        <Card.Title className="mb-0">{title}</Card.Title>
      </div>
      <h3>{value}</h3>
    </Card.Body>
  </Card>
);

const Dashboard = () => {
  return (
    // พื้นที่หลักของ Dashboard (ฝั่งขวา)
    <div className="flex-grow-1 overflow-auto">
      <Container fluid className="p-4">
        {/* หัวข้อหน้า */}
        <h1 className="mb-4 fw-bold">Dashboard</h1>

        {/* แถวบน: กล่องสรุปข้อมูล 3 รายการ */}
        <Row className="mb-4">
          <Col md={4}>
            <StatCard icon={<FaUser />} title="Total Users" value="65,340" />
          </Col>
          <Col md={4}>
            <StatCard icon={<FaStar />} title="New Users" value="1,284" />
          </Col>
          <Col md={4}>
            <StatCard icon={<MdArticle />} title="Total Posts" value="12,345" />
          </Col>
        </Row>

        {/* แถวล่าง: กราฟผู้ใช้ + ตารางกิจกรรม */}
        <Row className="align-items-stretch">
          {/* กล่องซ้าย: กราฟผู้ใช้ (ยังเป็น placeholder) */}
          <Col md={8}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column h-100">
                <Card.Title>Active Users (Weekly)</Card.Title>
                <div
                  className="flex-grow-1 d-flex align-items-center justify-content-center text-muted"
                  style={{
                    backgroundColor: "#E0ECEA",
                    borderRadius: "8px",
                  }}
                >
                  [Graph Placeholder]
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* กล่องขวา: ตารางกิจกรรมล่าสุด */}
          <Col md={4}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column h-100">
                <Card.Title>Recent Activity</Card.Title>
                <div className="flex-grow-1 overflow-auto mt-3">
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sarah Adams</td>
                        <td>Created a post</td>
                      </tr>
                      <tr>
                        <td>Jack Wilson</td>
                        <td>Posted a job</td>
                      </tr>
                      <tr>
                        <td>Emily Clark</td>
                        <td>Created a post</td>
                      </tr>
                      <tr>
                        <td>Michael Anderson</td>
                        <td>Reported a post</td>
                      </tr>
                      <tr>
                        <td>Jessica Thomas</td>
                        <td>Sent a message</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
