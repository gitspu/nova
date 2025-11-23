import React from "react";
import { Card, Button } from "react-bootstrap";
import {
  MapPin,
  Briefcase,
  Clock,
  Banknote,
  Share2,
  Heart,
} from "lucide-react";

// JobDetailContent
const JobDetailContent = ({ job, isSaved, onToggleSave }) => {
  if (!job) return null;

  return (
    // Card แสดงรายละเอียดงาน
    <Card className="border-0 shadow-lg rounded-4" style={{ top: "20px" }}>
      <>
        {/* แบนเนอร์บริษัท (ภาพประกอบ) */}
        <div className="p-0">
          <img
            src="https://placehold.co/600x150/0d1b3e/ffffff?text=Company+Banner"
            className="w-100 rounded-top-4" // เพิ่ม rounded-top-4
            style={{ height: "140px", objectFit: "cover" }}
            alt="Company Banner"
          />
        </div>
        <Card.Body className="p-4 pt-2">
          <div
            className="d-flex justify-content-between align-items-end mb-3"
            style={{ marginTop: "-60px" }} // ดึงโลโก้ขึ้นมาให้เด่นชัดขึ้น
          >
            {/* โลโก้บริษัท */}
            <div className="bg-white p-2 rounded-3 shadow-lg border border-light">
              <img
                src={job.logoUrl}
                alt={`Logo of ${job.company}`}
                style={{
                  height: "80px",
                  width: "80px",
                  objectFit: "contain",
                  backgroundColor: "white",
                }} // ขยายโลโก้
              />
            </div>
            {/* ปุ่ม Save และ Share */}
            <div className="d-flex gap-2 mb-2">
              <Button
                variant="light"
                className={`rounded-circle border shadow-sm  ${
                  isSaved ? "bg-danger text-white border-danger" : "text-danger"
                }`}
                // เมื่อคลิกปุ่มนี้ จะเรียก onToggleSave โดยส่ง id ของงาน
                onClick={(e) => onToggleSave(job.id, e)}
              >
                <Heart className={isSaved ? "fill-current" : ""} size={20} />
              </Button>
              <Button
                variant="light"
                className="rounded-circle border shadow-sm text-primary " 
              >
                <Share2 size={20} />
              </Button>
            </div>
          </div>

          <h4
            className="fw-bolder text-dark mt-3 mb-1"
            style={{ fontSize: "1.8rem" }}
          >
            {job.title}
          </h4>
          <div className="text-primary fw-bold mb-3 d-flex align-items-center gap-2">
            <span>{job.company}</span>
            <span
              className="text-decoration-underline small text-muted" 
              style={{ cursor: "pointer" }}
            >
              ดูโปรไฟล์บริษัท
            </span>
          </div>

          {/* Job Info Grid (ข้อมูลงาน) */}
          <div className="row g-3 mb-4 text-secondary small border-top pt-3">
            <div className="col-6 d-flex align-items-center gap-2">
              <MapPin className="text-info" size={18} />{" "}
              <span className="fw-medium">{job.location}</span>
            </div>
            <div className="col-6 d-flex align-items-center gap-2">
              <Briefcase className="text-info" size={18} />{" "}
              <span className="fw-medium">{job.type}</span>
            </div>
            <div className="col-6 d-flex align-items-center gap-2">
              <Banknote className="text-success" size={18} />{" "}
              <span className="fw-bold text-dark">{job.salary}</span>{" "}
              {/* เน้นค่า salary */}
            </div>
            <div className="col-6 d-flex align-items-center gap-2">
              <Clock className="text-info" size={18} />{" "}
              <span className="fw-medium">{job.posted}</span>
            </div>
          </div>

          {/* Job Description (คำอธิบายงาน) */}
          <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
            รายละเอียดงาน
          </h5>
          <div className="job-description text-muted">
            <p>
              We are seeking a highly motivated and experienced **{job.title}**
              to join our dynamic team. The successful candidate will be
              responsible for overseeing daily operations. {job.snippet}
            </p>
            {/* ใช้ list-unstyled และเพิ่ม margin/padding แทนการสร้าง Bullet ใหม่ */}
            <ul className="list-unstyled ps-3">
              <li className="mb-2">
                <span className="text-primary me-2">•</span>Develop and
                implement operational strategies.
              </li>
              <li className="mb-2">
                <span className="text-primary me-2">•</span>Lead
                cross-functional teams to achieve business goals.
              </li>
              <li className="mb-2">
                <span className="text-primary me-2">•</span>Analyze data to
                improve performance matching KPIs.
              </li>
            </ul>
            <h6 className="fw-bold mt-4 text-dark">คุณสมบัติ</h6>
            <ul className="list-unstyled ps-3">
              <li className="mb-2">
                <span className="text-primary me-2">•</span>Bachelor's degree in
                related field.
              </li>
              <li className="mb-2">
                <span className="text-primary me-2">•</span>Minimum 3-5 years of
                experience.
              </li>
              <li className="mb-2">
                <span className="text-primary me-2">•</span>Strong communication
                skills in English and Thai.
              </li>
            </ul>
          </div>
        </Card.Body>
      </>
    </Card>
  );
};

export default JobDetailContent;
