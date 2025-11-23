import { useEffect, useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  ButtonGroup,
} from "react-bootstrap";
import { exportToCSV } from "../../../shared/utils/csvExport";
import {
  fetchReportsSummary,
  fetchReportsDaily,
} from "../../../Script/Api/admin";

function Reports() {
  // State สำหรับ Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [timeRange, setTimeRange] = useState("7d");

  // State สำหรับข้อมูลรายงาน
  const [summaryData, setSummaryData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  // State สำหรับ UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // โหลดข้อมูลรายงาน
  async function loadReports({ startDate, endDate, range }) {
    try {
      setIsLoading(true);

      const [summaryResponse, dailyResponse] = await Promise.all([
        fetchReportsSummary({ range }),
        fetchReportsDaily({ range, startDate, endDate }),
      ]);

      setSummaryData(summaryResponse);
      setDailyData(dailyResponse);
      setCurrentPage(1);
    } catch (err) {
      setError(err?.message || "ไม่สามารถโหลดข้อมูลรายงานได้");
    } finally {
      setIsLoading(false);
    }
  }

  // โหลดข้อมูลใหม่เมื่อเปลี่ยน timeRange
  useEffect(() => {
    loadReports({ startDate: "", endDate: "", range: timeRange });
  }, [timeRange]);

  // จัดการการกรองข้อมูล
  const handleFilter = () => {
    loadReports({ startDate, endDate, range: timeRange });
  };

  // Export ข้อมูลเป็น CSV
  const handleExport = () => {
    exportToCSV(dailyData, "reports.csv");
  };

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(dailyData.length / pageSize)),
    [dailyData, pageSize]
  );

  // แบ่งข้อมูลตามหน้า
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return dailyData.slice(startIndex, startIndex + pageSize);
  }, [dailyData, currentPage, pageSize]);

  // ตรวจสอบว่าควรแสดง metric นี้หรือไม่
  const shouldShowMetric = (metricName) => {
    return selectedMetric === "all" || selectedMetric === metricName;
  };

  return (
    <>
      <Row className="g-3">
        <Col lg={12}>
          <Card className="shadow-sm">
            <Card.Header className="fw-semibold d-flex justify-content-between align-items-center">
              <span>Report Summary</span>

              {/* ปุ่มเลือกช่วงเวลา */}
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
            </Card.Header>

            <Card.Body>
              {/* ฟอร์มกรองข้อมูล */}
              <Form className="d-flex gap-2 mb-3">
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  aria-label="Start date"
                />
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  aria-label="End date"
                />
                <Form.Select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  aria-label="Metric"
                >
                  <option value="all">All</option>
                  <option value="registrations">Registrations</option>
                  <option value="verifications">Verifications</option>
                  <option value="flags">Flags</option>
                </Form.Select>
                <Button variant="primary" onClick={handleFilter}>
                  Filter
                </Button>
                <Button variant="outline-secondary" onClick={handleExport}>
                  Export
                </Button>
              </Form>

              {/* แสดงสถานะ Loading และ Error */}
              {isLoading && <div className="text-muted mb-2">Loading...</div>}
              {error && <div className="text-danger mb-2">{error}</div>}

              {/* การ์ดสรุปข้อมูล */}
              <Row className="g-3">
                {summaryData.map((item, index) => (
                  <Col md={4} key={index}>
                    <Card className="border-0 bg-light">
                      <Card.Body>
                        <div className="text-muted small">{item.label}</div>
                        <div className="h5 mb-0">{item.value}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* ตารางรายงานรายวัน */}
              <Card className="mt-3">
                <Card.Header className="fw-semibold">Daily Report</Card.Header>
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Registrations</th>
                      <th>Verifications</th>
                      <th>Flags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center text-muted">
                          No data
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.date}</td>
                          <td>
                            {shouldShowMetric("registrations")
                              ? row.registrations
                              : "-"}
                          </td>
                          <td>
                            {shouldShowMetric("verifications")
                              ? row.verifications
                              : "-"}
                          </td>
                          <td>{shouldShowMetric("flags") ? row.flags : "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>

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
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Reports;
