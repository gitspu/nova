import React from "react";
import { Card, Button } from "react-bootstrap";
import {
  MapPin,
  Briefcase,
  Clock,
  Banknote,
  Share2,
  Heart,
  ClipboardList,
} from "lucide-react";

// DetailContent (รายละเอียดงานขวามือ)
const companyDetailContent = ({ job, isHistoryView }) => {
  if (!job) return (
     <div
        className="text-center py-5 text-muted d-flex flex-column align-items-center justify-content-center h-100 bg-white shadow-sm"
        style={{ minHeight: "500px", border: "2px dashed #dee2e6", borderRadius: "1rem" }}
      >
        <Briefcase size={48} className="text-muted mb-3 opacity-50" />
        <h5>เลือกงานเพื่อดูรายละเอียด</h5>
      </div>
  );

  // Helper to format text lists
  const formatList = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
        if(line.trim().startsWith('*')) {
             // text-primary คือ Mint Green
             return <li key={i} className="mb-2"><span className="text-primary me-2">•</span>{line.substring(1).trim()}</li>
        }
        return <p key={i}>{line}</p>
    });
  };

  return (
    <Card className="border-0 shadow-lg rounded-4" style={{ top: "20px" }}>
      <>
        <div className="p-0">
          <img
            src="https://placehold.co/600x150/0d1b3e/ffffff?text=Company+Banner"
            className="w-100 rounded-top-4"
            style={{ height: "140px", objectFit: "cover" }}
            alt="Company Banner"
          />
        </div>
        <Card.Body className="p-4 pt-2">
          <div className="d-flex justify-content-between align-items-end mb-3" style={{ marginTop: "-60px" }}>
            <div className="bg-white p-2 rounded-3 shadow-lg border border-light">
              <img
                src={job.logoUrl}
                alt={`Logo`}
                style={{ height: "80px", width: "80px", objectFit: "contain", backgroundColor: "white" }}
              />
            </div>
            <div className="d-flex gap-2 mb-2">
              {/* ปุ่มที่แสดงในโหมด Job History (ดูผู้สมัคร) */}
              {isHistoryView && (
                 <Button 
                    // variant="outline-primary" คือ outline Mint Green
                    variant="outline-primary" 
                    className="fw-medium px-3 rounded-pill"
                >
                     <ClipboardList size={18} className="me-2"/> ดูผู้สมัคร
                 </Button>
              )}
              {/* ปุ่ม Save/Share สำหรับผู้หางาน (ถูกซ่อนในโหมดนี้) */}
            </div>
          </div>

          <h4 className="fw-bolder text-dark mt-3 mb-1" style={{ fontSize: "1.8rem" }}>{job.title}</h4>
          <div className="text-primary fw-bold mb-3 d-flex align-items-center gap-2">
            <span>{job.company}</span>
            <span className="text-decoration-underline small text-muted" style={{ cursor: "pointer" }}>ดูโปรไฟล์บริษัท</span>
          </div>

          <div className="row g-3 mb-4 text-secondary small border-top pt-3">
            {/* text-info คือ Medium Aqua Marine */}
            <div className="col-6 d-flex align-items-center gap-2"><MapPin className="text-info" size={18} /> <span className="fw-medium">{job.location}</span></div>
            <div className="col-6 d-flex align-items-center gap-2"><Briefcase className="text-info" size={18} /> <span className="fw-medium">{job.type}</span></div>
            {/* text-success คือ Teal */}
            <div className="col-6 d-flex align-items-center gap-2"><Banknote className="text-success" size={18} /> <span className="fw-bold text-dark">{job.salary}</span></div>
            <div className="col-6 d-flex align-items-center gap-2"><Clock className="text-info" size={18} /> <span className="fw-medium">{job.posted}</span></div>
          </div>

          <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">รายละเอียดงาน</h5>
          <div className="job-description text-muted">
            <ul className="list-unstyled ps-3">{formatList(job.description)}</ul>
            <h6 className="fw-bold mt-4 text-dark">คุณสมบัติ</h6>
            <ul className="list-unstyled ps-3">{formatList(job.qualifications)}</ul>
          </div>
        </Card.Body>
      </>
    </Card>
  );
};

export default companyDetailContent;