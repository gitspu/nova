// ===================================================
// ไฟล์: src/Admin/pages/Dashboard.jsx
// คำอธิบาย: หน้าภาพรวมแสดงสถิติและกราฟต่างๆ
// ===================================================

import React from 'react';
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { 
  FaUsers, 
  FaFileAlt, 
  FaBriefcase,
  FaTrophy,
  FaEye
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Import Components
import StatCard from '../admin_component/StatCard';

// Import Data
import { 
  summaryStats, 
  monthlyStats, 
  userTypeStats,
  mockJobs,
  mockResumes
} from '../admin_data/mockData';

const Dashboard = ({menu}) => {
  // หางานยอดนิยม 5 อันดับแรก (เรียงตามจำนวนผู้สมัคร)
  const topJobs = [...mockJobs]
    .sort((a, b) => b.applicationCount - a.applicationCount)
    .slice(0, 5);

  // เรซูเม่ที่ดูมากที่สุด 5 อันดับแรก
  const topResumes = [...mockResumes]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);

  return (
    <div className={menu[0] == 1 ? 'd-block' : 'd-none'}>
      {/* หัวข้อหน้า */}
      <div className="mb-4">
        <h2 className="mb-1 fw-bold">ภาพรวมระบบ</h2>
        <p className="text-muted">
          สถิติและข้อมูลภาพรวมของระบบ Smart Persona
        </p>
      </div>

      {/* การ์ดสถิติภาพรวม */}
      <Row className="mb-4 g-3">
        <Col md={6} lg={4}>
          <StatCard
            title="ผู้ใช้งานทั้งหมด"
            value={summaryStats.totalUsers}
            growth={summaryStats.userGrowth}
            icon={<FaUsers />}
            bgColor="#0d6efd"
          />
        </Col>
        <Col md={6} lg={4}>
          <StatCard
            title="โปรไฟล์ทั้งหมด"
            value={summaryStats.totalResumes}
            growth={summaryStats.resumeGrowth}
            icon={<FaFileAlt />}
            bgColor="#198754"
          />
        </Col>
        <Col md={6} lg={4}>
          <StatCard
            title="ตำแหน่งงานทั้งหมด"
            value={summaryStats.totalJobs}
            growth={summaryStats.jobGrowth}
            icon={<FaBriefcase />}
            bgColor="#0dcaf0"
          />
        </Col>
      </Row>

      {/* กราฟสถิติรายเดือน */}
      <Row className="mb-4 g-3">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">สถิติการเติบโตรายเดือน</h5>
              <small className="text-muted">แสดงข้อมูล 6 เดือนล่าสุด</small>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    stroke="#6c757d"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6c757d"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '14px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#0d6efd" 
                    strokeWidth={3}
                    name="ผู้ใช้ใหม่" 
                    dot={{ fill: '#0d6efd', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  {/* <Line 
                    type="monotone" 
                    dataKey="resumes" 
                    stroke="#198754" 
                    strokeWidth={3}
                    name="เรซูเม่ใหม่" 
                    dot={{ fill: '#198754', r: 4 }}
                    activeDot={{ r: 6 }}
                  /> */}
                  <Line 
                    type="monotone" 
                    dataKey="jobs" 
                    stroke="#0dcaf0" 
                    strokeWidth={3}
                    name="งานใหม่" 
                    dot={{ fill: '#0dcaf0', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">ประเภทผู้ใช้งาน</h5>
              <small className="text-muted">จำนวนผู้ใช้แต่ละประเภท</small>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userTypeStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="type" 
                    tick={{ fontSize: 12 }}
                    stroke="#6c757d"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6c757d"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#0d6efd" 
                    radius={[8, 8, 0, 0]}
                    name="จำนวน"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ตารางงานยอดนิยมและเรซูเม่ที่ดูมากที่สุด */}
      <Row className="g-3">
        <Col lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 py-3 d-flex align-items-center">
              <FaTrophy className="text-warning me-2" size={20} />
              <div>
                <h5 className="mb-0 fw-bold">งานยอดนิยม 5 อันดับ</h5>
                <small className="text-muted">ตำแหน่งที่มีผู้สมัครมากที่สุด</small>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="px-3" style={{ width: '60px' }}>อันดับ</th>
                    <th>ตำแหน่งงาน</th>
                    <th className="text-center" style={{ width: '100px' }}>ผู้สมัคร</th>
                  </tr>
                </thead>
                <tbody>
                  {topJobs.map((job, index) => (
                    <tr key={job.id}>
                      <td className="px-3">
                        <div 
                          className="d-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: index === 0 ? '#ffc107' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#f8f9fa',
                            color: index < 3 ? '#fff' : '#333'
                          }}
                        >
                          {index + 1}
                        </div>
                      </td>
                      <td>
                        <div className="fw-semibold">{job.title}</div>
                        <small className="text-muted">{job.company}</small>
                      </td>
                      <td className="text-center">
                        <Badge bg="primary" pill className="px-3">
                          {job.applicationCount}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 py-3 d-flex align-items-center">
              <FaEye className="text-info me-2" size={20} />
              <div>
                <h5 className="mb-0 fw-bold">โปรไฟล์ยอดนิยม 5 อันดับ</h5>
                <small className="text-muted">โปรไฟล์ที่ดูมากที่สุด</small>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="px-3" style={{ width: '60px' }}>อันดับ</th>
                    <th>ชื่อโปรไฟล์</th>
                    <th className="text-center" style={{ width: '100px' }}>ยอดดู</th>
                  </tr>
                </thead>
                <tbody>
                  {topResumes.map((resume, index) => (
                    <tr key={resume.id}>
                      <td className="px-3">
                        <div 
                          className="d-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: index === 0 ? '#ffc107' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#f8f9fa',
                            color: index < 3 ? '#fff' : '#333'
                          }}
                        >
                          {index + 1}
                        </div>
                      </td>
                      <td>
                        <div className="fw-semibold">{resume.title}</div>
                        <small className="text-muted">{resume.ownerName}</small>
                      </td>
                      <td className="text-center">
                        <Badge bg="info" pill className="px-3">
                          {resume.viewCount}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;