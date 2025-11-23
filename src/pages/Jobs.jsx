import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { Heart, Briefcase, Inbox, Filter } from "lucide-react";

// Import Components ที่แยกออกไป
import JobHeader from "../components/jobSeeker/JobHeader.jsx";
import JobCard from "../components/jobSeeker/JobCard.jsx";
import JobDetailContent from "../components/jobSeeker/JobDetailContent.jsx";

// --- MOCK DATA ---
// ข้อมูลงานจำลอง
const mockJobs = [
  {
    id: 1,
    title: "Chief Operating Officer (COO)",
    company: "Bangchak Corporation PLC",
    location: "พระโขนง, กรุงเทพฯ",
    type: "Full-time",
    salary: "฿150k - ฿250k /เดือน",
    posted: "12 วันที่ผ่านมา",
    isNew: true,
    category: "Management",
    logoUrl: "https://placehold.co/50x50/1e40af/ffffff?text=BCP",
    snippet:
      "Lead global operations, optimize asset performance, and drive strategic initiatives for sustainable growth.",
  },
  {
    id: 2,
    title: "Senior Project Manager",
    company: "SCG Logistics Management",
    location: "บางซื่อ, กรุงเทพฯ",
    type: "Full-time",
    salary: "ตามโครงสร้างบริษัท",
    posted: "วันนี้",
    isNew: true,
    category: "Management",
    logoUrl: "https://placehold.co/50x50/065f46/ffffff?text=SCG",
    snippet:
      "Manage logistics projects, ensuring timely delivery and cost efficiency using agile methodologies.",
  },
  {
    id: 3,
    title: "Marketing Director",
    company: "Central Group",
    location: "ปทุมวัน, กรุงเทพฯ",
    type: "Contract",
    salary: "฿80k - ฿120k /เดือน",
    posted: "3 วันที่ผ่านมา",
    isNew: false,
    category: "Marketing",
    logoUrl: "https://placehold.co/50x50/be123c/ffffff?text=CG",
    snippet:
      "Oversee marketing campaigns, brand positioning, and digital transformation strategies.",
  },
  {
    id: 4,
    title: "UX/UI Designer",
    company: "Kasikorn Business-Technology",
    location: "สามย่าน, กรุงเทพฯ",
    type: "Full-time",
    salary: "฿50k - ฿85k /เดือน",
    posted: "1 วันที่ผ่านมา",
    isNew: true,
    category: "IT & Digital",
    logoUrl: "https://placehold.co/50x50/059669/ffffff?text=KBTG",
    snippet:
      "Design intuitive user experiences for mobile banking applications reaching millions of users.",
  },
  {
    id: 6,
    title: "Frontend Developer",
    company: "LINE MAN Wongnai",
    location: "สาทร, กรุงเทพฯ",
    type: "Full-time",
    salary: "฿45k - ฿70k /เดือน",
    posted: "3 วันที่ผ่านมา",
    isNew: true,
    category: "IT & Digital",
    logoUrl: "https://placehold.co/50x50/3b82f6/ffffff?text=LMW",
    snippet: "Develop UI/UX features using React, Next.js, and TailwindCSS.",
  },
];

const Jobs = () => {
  // Inject Bootstrap CSS
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.backgroundColor = "#f8f9fa";

    return () => {
      document.head.removeChild(link);
      document.body.style.backgroundColor = ""; // Cleanup
    };
  }, []);

  // --- States (สถานะต่างๆ) ---
  const [activeJobId, setActiveJobId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [viewMode, setViewMode] = useState("all");
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  // ตั้งค่างานแรกให้เป็น active เมื่อโหลดครั้งแรก
  useEffect(() => {
    if (mockJobs.length > 0 && activeJobId === null) {
      setActiveJobId(mockJobs[0].id);
    }
  }, [activeJobId]);

  // --- Logic ---

  // ฟังก์ชันบันทึก/ยกเลิกการบันทึกงาน
  const toggleSaveJob = (id, e) => {
    if (e) e.stopPropagation();

    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter((savedId) => savedId !== id));
      setToast({
        show: true,
        msg: "ลบออกจากรายการบันทึกแล้ว",
        type: "secondary",
      });
    } else {
      setSavedJobIds([...savedJobIds, id]);
      setToast({ show: true, msg: "บันทึกงานเรียบร้อยแล้ว!", type: "success" });
    }
  };

  // ตรรกะการกรองข้อมูลงาน (Filter Logic)
  const filteredJobs = mockJobs.filter((job) => {
    // 1. กรองตาม Tab (All vs Saved)
    if (viewMode === "saved" && !savedJobIds.includes(job.id)) return false;

    // 2. กรองตามหมวดหมู่
    const categoryMatch =
      activeCategory === "ทั้งหมด" || job.category === activeCategory;
    if (!categoryMatch) return false;

    // 3. กรองตามคำค้นหา
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  // จัดการเมื่อคลิกงาน
  const handleJobClick = (id) => {
    setActiveJobId(id);
  };

  // หางานที่ Active เพื่อแสดงรายละเอียด
  const activeJob = mockJobs.find((j) => j.id === activeJobId);

  // --- Render (การแสดงผล) ---
  return (
    <div className="bg-light min-vh-100 font-sans">
      {/* ส่วนหัว: ค้นหาและฟิลเตอร์ */}
      <JobHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        allJobs={mockJobs}
      />

      <Container className="py-4 px-lg-5">
        <Row>
          {/* คอลัมน์ซ้าย: รายการงาน */}
          <Col xs={12} lg={5} className="mb-4">
            {/* View Toggle Tabs (สลับดูงานทั้งหมด/งานที่บันทึก) */}
            <div className="bg-white p-1 rounded-3 shadow-sm mb-3 d-flex">
              <Button
                variant={viewMode === "all" ? "primary" : "light"}
                className={`flex-grow-1 border-0 rounded-2 fw-bold ${
                  viewMode === "all" ? "bg-primary text-white" : "text-muted"
                }`}
                onClick={() => {
                  setViewMode("all");
                  // รีเซ็ต activeCategory เมื่อเปลี่ยนไปดูงานทั้งหมด
                  if (activeCategory !== "ทั้งหมด") {
                    setActiveCategory("ทั้งหมด");
                  }
                }}
              >
                งานทั้งหมด ({mockJobs.length})
              </Button>
              <Button
                variant={viewMode === "saved" ? "primary" : "light"}
                className={`flex-grow-1 border-0 rounded-2 fw-bold ${
                  viewMode === "saved" ? "bg-primary text-white" : "text-muted"
                }`}
                onClick={() => setViewMode("saved")}
              >
                <Heart size={16} className="me-2 mb-1" />
                บันทึกไว้ ({savedJobIds.length})
              </Button>
            </div>

            {/* หัวข้อรายการงาน */}
            <div className="d-flex justify-content-between align-items-center mb-3 px-1">
              <div className="d-flex gap-2">
                <span className="fw-bold text-dark">
                  {viewMode === "saved" ? "รายการที่บันทึก" : "ผลการค้นหา"} (
                  {filteredJobs.length})
                </span>
              </div>
              <div className="text-muted small d-flex align-items-center">
                <Filter size={14} className="me-1" /> เรียงตาม: เกี่ยวข้อง
              </div>
            </div>

            {/* Empty State (กรณีไม่พบงาน) */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-5 bg-white rounded-3 shadow-sm">
                <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                  <Inbox size={48} className="text-muted" />
                </div>
                <h5 className="text-muted">ไม่พบงานที่คุณค้นหา</h5>
                <p className="text-secondary small">
                  ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นดูนะ
                </p>
                {viewMode === "saved" && (
                  <Button variant="link" onClick={() => setViewMode("all")}>
                    กลับไปดูงานทั้งหมด
                  </Button>
                )}
              </div>
            )}

            {/* Job Card List (รายการการ์ดงาน) */}
            <div className="job-list">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  data={job}
                  isActive={activeJobId === job.id}
                  isSaved={savedJobIds.includes(job.id)}
                  onClick={() => handleJobClick(job.id)}
                />
              ))}
            </div>
          </Col>

          {/* คอลัมน์ขวา: รายละเอียดงาน */}
          <Col xs={12} lg={7}>
            {activeJob ? (
              <JobDetailContent
                job={activeJob}
                isSaved={savedJobIds.includes(activeJob.id)}
                onToggleSave={toggleSaveJob}
              />
            ) : (
              // Placeholder (เมื่อยังไม่ได้เลือกงาน)
              <div
                className="text-center py-5 text-muted d-flex flex-column align-items-center justify-content-center h-100 bg-white shadow-sm"
                style={{
                  minHeight: "500px",
                  border: "2px dashed #dee2e6",
                  borderRadius: "1rem",
                }}
              >
                <Briefcase size={48} className="text-muted mb-3 opacity-50" />
                <h5>เลือกงานเพื่อดูรายละเอียด</h5>
                <p className="small">
                  คลิกที่การ์ดงานทางด้านซ้ายเพื่อดูข้อมูลเพิ่มเติม
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Toast Notification (แจ้งเตือน) */}
      <ToastContainer
        position="bottom-center"
        className="p-3"
        style={{ zIndex: 9999 }}
      >
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          bg={toast.type === "success" ? "success" : "secondary"}
          delay={2500}
          autohide
          className="text-white fw-bold shadow-sm"
        >
          <Toast.Body>{toast.msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Jobs;
