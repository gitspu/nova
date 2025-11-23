import { useEffect, useState } from "react";
import { Row, Col, Card, ButtonGroup, Button } from "react-bootstrap";
import StatCard from "../../adminComponents/StatCard";
import {
  BsPeopleFill,
  BsCheckCircleFill,
  BsClockFill,
  BsExclamationTriangleFill,
} from "react-icons/bs";
import LineChart from "../../charts/Linechart";
import BarChart from "../../charts/Barchart";
import DoughnutChart from "../../charts/DoughnutChart";

import {
  fetchDashboardStats,
  fetchReportsDaily,
  mapRegistrationsToLineDataset,
  mapVerificationsToBarDataset,
  mapFlagsToLineDataset,
  mapStatusToDoughnutDataset,
} from "../../../Script/Api/admin";

function Dashboard() {
  // State สำหรับข้อมูลสถิติและรายงาน
  const [stats, setStats] = useState(null);
  const [dailyData, setDailyData] = useState([]);

  // State สำหรับ UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("7d");

  // State สำหรับข้อมูลกราฟ
  const [chartData, setChartData] = useState({
    registrations: null,
    verifications: null,
    flags: null,
    status: null,
  });

  // โหลดข้อมูล Dashboard เมื่อเปลี่ยน timeRange
  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        // ดึงข้อมูลพร้อมกัน
        const [statsResponse, dailyResponse] = await Promise.all([
          fetchDashboardStats(),
          fetchReportsDaily({ range: timeRange }),
        ]);

        setStats(statsResponse);
        setDailyData(dailyResponse);

        // แปลงข้อมูลเป็น chart datasets
        setChartData({
          registrations: mapRegistrationsToLineDataset(dailyResponse),
          verifications: mapVerificationsToBarDataset(dailyResponse),
          flags: mapFlagsToLineDataset(dailyResponse),
          status: mapStatusToDoughnutDataset(statsResponse),
        });
      } catch (err) {
        setError(err?.message || "ไม่สามารถโหลดข้อมูล Dashboard ได้");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [timeRange]);

  // แสดงสถานะต่างๆ
  if (loading) return <div className="p-3">Loading...</div>;
  if (error) return <div className="p-3 text-danger">{error}</div>;
  if (!stats) return null;

  return (
    <>
      {/* แสดงสถิติหลัก */}
      <Row className="g-3">
        <Col md={3}>
          <StatCard
            icon={BsPeopleFill}
            title="Users"
            value={stats.totalUsers}
            color="primary"
            footer="Registered"
          />
        </Col>
        <Col md={3}>
          <StatCard
            icon={BsClockFill}
            title="Pending"
            value={stats.pending}
            color="warning"
            footer="Waiting"
          />
        </Col>
        <Col md={3}>
          <StatCard
            icon={BsCheckCircleFill}
            title="Verified Today"
            value={stats.verifiedToday}
            color="success"
            footer="Done"
          />
        </Col>
        <Col md={3}>
          <StatCard
            icon={BsExclamationTriangleFill}
            title="Flags"
            value={stats.flagged}
            color="danger"
            footer="Detected"
          />
        </Col>
      </Row>

      {/* ปุ่มเลือกช่วงเวลา */}
      <div className="d-flex justify-content-end mt-3">
        <ButtonGroup size="sm">
          <Button
            variant={timeRange === "7d" ? "primary" : "outline-primary"}
            onClick={() => setTimeRange("7d")}
          >
            7d
          </Button>
          <Button
            variant={timeRange === "30d" ? "primary" : "outline-primary"}
            onClick={() => setTimeRange("30d")}
          >
            30d
          </Button>
        </ButtonGroup>
      </div>

      {/* กราฟ Registrations และ Verifications */}
      <Row className="g-3 mt-3">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header>Registrations ({timeRange})</Card.Header>
            <Card.Body style={{ height: 250, position: "relative" }}>
              {chartData.registrations ? (
                <LineChart data={chartData.registrations} />
              ) : (
                <div>Loading chart...</div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header>Verifications ({timeRange})</Card.Header>
            <Card.Body style={{ height: 250, position: "relative" }}>
              {chartData.verifications ? (
                <BarChart data={chartData.verifications} />
              ) : (
                <div>Loading chart...</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* กราฟ Flags และ Status */}
      <Row className="g-3 mt-3">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header>Flags ({timeRange})</Card.Header>
            <Card.Body style={{ height: 250, position: "relative" }}>
              {chartData.flags ? (
                <LineChart data={chartData.flags} />
              ) : (
                <div>Loading chart...</div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header>Status</Card.Header>
            <Card.Body style={{ height: 250, position: "relative" }}>
              {chartData.status ? (
                <DoughnutChart data={chartData.status} />
              ) : (
                <div>Loading chart...</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
