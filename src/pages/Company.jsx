import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Toast,
  ToastContainer,
} from "react-bootstrap";
// Import Lucide-React icons
import { Inbox } from "lucide-react";

// Import Components
import JobCard from "../components/compony/companyCard.jsx";
import JobDetailContent from "../components/compony/companyDetailContent.jsx";
import JobHeader from "../components/compony/companyHeader.jsx";
import JobPostForm from "../components/compony/companyPost.jsx";

// Mock Data
const initialJobs = [
  {
    id: 1,
    title: "Senior Marketing Manager",
    company: "Bangchak Corporation PLC",
    logoUrl: "https://placehold.co/80x80/ea580c/ffffff?text=BCP",
    location: "กรุงเทพฯ",
    type: "Full-time",
    category: "Marketing",
    salary: "฿80k - ฿120k /เดือน",
    posted: "1 วันที่แล้ว",
    status: "เปิดรับ",
    isNew: false,
    snippet: "รับผิดชอบในการวางแผนและดำเนินการกลยุทธ์การตลาดทั้งหมด...",
    description:
      "* วางแผนและดำเนินงานด้านการตลาดดิจิทัลและออฟไลน์\n* วิเคราะห์ข้อมูลการตลาดและพฤติกรรมลูกค้า\n* บริหารงบประมาณและตรวจสอบผลลัพธ์ของแคมเปญ",
    qualifications:
      "* ปริญญาโทด้านการตลาดหรือสาขาที่เกี่ยวข้อง\n* ประสบการณ์ 5 ปีขึ้นไปในตำแหน่งบริหาร\n* ทักษะภาษาอังกฤษดีเยี่ยม",
  },
  {
    id: 2,
    title: "IT Project Lead",
    company: "Bangchak Corporation PLC",
    logoUrl: "https://placehold.co/80x80/ea580c/ffffff?text=BCP",
    location: "นนทบุรี",
    type: "Contract",
    category: "IT & Digital",
    salary: "฿50k - ฿70k /เดือน",
    posted: "3 วันที่แล้ว",
    status: "ปิดรับ",
    isNew: false,
    snippet: "นำทีมพัฒนาซอฟต์แวร์และดูแลโครงการ IT ที่ซับซ้อน...",
    description:
      "* นำทีมพัฒนาซอฟต์แวร์ตามหลัก Agile\n* ประสานงานกับผู้มีส่วนได้ส่วนเสียเพื่อกำหนดความต้องการของระบบ\n* ควบคุมคุณภาพและเวลาในการส่งมอบโปรเจกต์",
    qualifications:
      "* ปริญญาตรีด้านวิทยาการคอมพิวเตอร์หรือสาขาที่เกี่ยวข้อง\n* ประสบการณ์ 3 ปีขึ้นไปในการบริหารโครงการ IT\n* มีความรู้ด้าน Cloud Computing (AWS/Azure)",
  },
];

// กำหนด CSS Custom Properties สำหรับ Mint Green Theme
const mintThemeStyles = `
  /* Mint Green Theme Custom Properties */
  :root {
    --bs-primary: #50C878; /* Mint Green */
    --bs-primary-rgb: 80, 200, 120;
    --bs-info: #66CDAA; /* Medium Aqua Marine */
    --bs-info-rgb: 102, 205, 170;
    --bs-success: #008080; /* Teal for Success/Open status */
    --bs-success-rgb: 0, 128, 128;
  }
  .bg-primary { background-color: var(--bs-primary) !important; }
  .text-primary { color: var(--bs-primary) !important; }
  .border-primary { border-color: var(--bs-primary) !important; }
`;

const Company = () => {
  // Styles: นำเข้า Bootstrap CSS + Mint Theme Styles
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    // Inject Custom Mint Theme Styles
    const style = document.createElement("style");
    style.textContent = mintThemeStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  // State
  // กำหนดให้หน้าเริ่มต้นเป็น "ประวัติการโพสต์งาน"
  const [view, setView] = useState("history");
  const [jobs, setJobs] = useState(initialJobs);
  const [activeJobId, setActiveJobId] = useState(initialJobs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState("เปิดรับ"); // กรองตามสถานะงาน
  const [toast, setToast] = useState({ show: false, msg: "" });

  // Job Status Categories
  const jobStatuses = ["เปิดรับ", "ปิดรับ"];

  // Logic: ลงประกาศงานใหม่สำเร็จ
  const handlePostJob = (newJob) => {
    setJobs([newJob, ...jobs]);
    setActiveJobId(newJob.id);
    setActiveCategory("เปิดรับ");
    setView("history");
    setToast({ show: true, msg: "โพสต์งานสำเร็จ! งานของคุณแสดงอยู่บนสุดแล้ว" });
  };

  // Logic: สลับโหมดดู/โพสต์งาน
  const handleToggleView = () => {
    setView((prev) => (prev === "history" ? "post" : "history"));
    if (view === "post") {
      setActiveJobId(jobs[0]?.id || null);
      setActiveCategory("เปิดรับ");
    }
  };

  // Filter Logic สำหรับ Job History: กรองตามสถานะงานที่เลือก
  const filteredJobs = jobs.filter((job) =>
    activeCategory === "เปิดรับ"
      ? job.status === "เปิดรับ"
      : job.status === "ปิดรับ"
  );

  // หา activeJob
  let currentActiveJob = jobs.find((j) => j.id === activeJobId);

  // กรณีที่งาน Active ไม่อยู่ในรายการที่กรองแล้ว
  if (
    !currentActiveJob ||
    !filteredJobs.some((j) => j.id === currentActiveJob.id)
  ) {
    currentActiveJob = filteredJobs[0] || null;
    setActiveJobId(currentActiveJob?.id || null);
  }

  return (
    <div className="bg-light min-vh-100 font-sans">
      {/* Header สำหรับผู้ประกอบการ */}
      <JobHeader onToggleView={handleToggleView} view={view} />

      {/* View Switcher: แสดงหน้าประวัติการโพสต์ หรือ หน้าลงประกาศงาน */}
      {view === "history" ? (
        <Container className="py-4 px-lg-5">
          {/* --- Status Filters สำหรับ Job History --- */}
          <div className="d-flex gap-2 flex-wrap mb-4">
            {jobStatuses.map((status, idx) => (
              <Button
                key={idx}
                // primary คือ Mint Green
                variant={
                  activeCategory === status ? "primary" : "outline-primary"
                }
                size="sm"
                className={`rounded-pill px-4 py-2 fw-medium shadow-sm`}
                onClick={() => setActiveCategory(status)}
              >
                {status === "เปิดรับ" ? "กำลังเปิดรับ" : "ปิดรับแล้ว"}{" "}
                <Badge
                  // primary คือ Mint Green
                  bg={activeCategory === status ? "white" : "primary"}
                  text={activeCategory === status ? "primary" : "white"}
                  pill
                  className="ms-1"
                >
                  {jobs.filter((job) => job.status === status).length}
                </Badge>
              </Button>
            ))}
          </div>

          <Row>
            <Col xs={12} lg={5}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold">
                  ประวัติการโพสต์งาน:{" "}
                  {activeCategory === "เปิดรับ" ? "กำลังเปิดรับ" : "ปิดรับแล้ว"}{" "}
                  ({filteredJobs.length})
                </span>
              </div>
              {filteredJobs.length === 0 ? (
                <div className="text-center py-5 bg-white rounded-3 shadow-sm">
                  <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                    <Inbox size={48} className="text-muted" />
                  </div>
                  <h5 className="text-muted">ไม่พบงานที่อยู่ในสถานะนี้</h5>
                  <Button
                    variant="link"
                    onClick={() => setActiveCategory("เปิดรับ")}
                  >
                    ดูงานที่กำลังเปิดรับแทน
                  </Button>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    data={job}
                    isActive={activeJobId === job.id}
                    onClick={() => setActiveJobId(job.id)}
                    isHistoryView={true} // โหมด History
                  />
                ))
              )}
            </Col>
            <Col xs={12} lg={7}>
              <JobDetailContent
                job={currentActiveJob}
                isHistoryView={true} // โหมด History
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <JobPostForm
          onPostSuccess={handlePostJob}
          onCancel={() => setView("history")}
        />
      )}

      <ToastContainer position="bottom-center" className="p-3">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
          // bg="success" คือ Teal
          bg="success" 
        >
          <Toast.Body className="text-white fw-bold">{toast.msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Company;