import React, { useState } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { MapPin } from "lucide-react";

// Card (การ์ดงานแต่ละรายการ)
export function CompanyCard ({ data, isActive, onClick, isHistoryView }) 
{
  // isSaved และ isNew ถูกซ่อนในโหมด History แต่ยังคงอยู่ใน prop signature เดิม
  return (
    <Card
      className={`mb-3 shadow-sm transition-all ${
        isActive ? "border-primary border-4 border-start bg-light" : ""
      }`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Body className="p-3">
        <Row>
          <Col xs={9}>
            <div className="d-flex align-items-start justify-content-between">
              <h6
                className={`fw-bold mb-1 ${
                  isActive ? "text-primary" : "text-dark"
                }`}
                style={{ fontSize: "1.1rem" }}
              >
                {data.title}
              </h6>
            </div>

            <div className="text-dark mb-2 fw-medium">{data.company}</div>

            <div className="d-flex gap-2 mb-2">
              {/* แสดงป้ายสถานะสำหรับ Job History */}
              {isHistoryView && (
                  <Badge 
                    bg={data.status === "เปิดรับ" ? "success" : "secondary"} 
                    className="rounded-pill fw-medium px-2"
                  >
                    {data.status === "เปิดรับ" ? "กำลังเปิดรับ" : "ปิดรับแล้ว"}
                  </Badge>
              )}
            </div>

            <div className="text-secondary small mb-2 d-flex align-items-center gap-1">
              <MapPin size={14} /> {data.location}
            </div>

            <div className="text-muted small" style={{ fontSize: "0.85rem", lineHeight: "1.4" }}>
              {data.snippet}
            </div>

            <div className="text-muted mt-2" style={{ fontSize: "0.75rem" }}>
              {data.posted} • {data.salary}
            </div>
          </Col>

          <Col xs={3} className="text-end d-flex flex-column justify-content-between align-items-end">
            <img
              src={data.logoUrl}
              alt="logo"
              className="rounded-1 border p-1"
              style={{ width: "50px", height: "50px", objectFit: "contain", backgroundColor: "white" }}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// DetailContent (รายละเอียดงานขวามือ)
export function CompanyDetailContent ({ job, isHistoryView }) 
{
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
                 <Button variant="outline-primary" className="fw-medium px-3 rounded-pill">
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
            <div className="col-6 d-flex align-items-center gap-2"><MapPin className="text-info" size={18} /> <span className="fw-medium">{job.location}</span></div>
            <div className="col-6 d-flex align-items-center gap-2"><Briefcase className="text-info" size={18} /> <span className="fw-medium">{job.type}</span></div>
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


// Header (ส่วนหัวสำหรับผู้ประกอบการ)
export function CompanyHeader ({ onToggleView, view })
{
  return (
    <div className="bg-primary text-white py-4 shadow-lg">
      <Container className="position-relative px-lg-5">
        <div className="d-flex justify-content-between align-items-center">
           <h2 className="fw-bold h3 mb-0 text-white">Jobs</h2>
           <Button 
              variant="outline-light" 
              className="fw-bold rounded-pill px-4" 
              onClick={onToggleView}
           >
             <Briefcase size={18} className="me-2 mb-1"/> 
             {view === "history" ? "ลงประกาศงานใหม่" : "ประวัติการโพสต์งาน"}
           </Button>
        </div>
      </Container>
    </div>
  );
};


// PostForm (แบบฟอร์มโพสต์งาน)
export function CompanyPost ({ onPostSuccess, onCancel }) 
{
  const [jobData, setJobData] = useState({
    title: "", company: "Bangchak Corporation PLC", logoUrl: "https://placehold.co/80x80/ea580c/ffffff?text=BCP", location: "กรุงเทพฯ",
    type: "Full-time", category: "Management", salary: "฿50k - ฿80k /เดือน", description: "* กำหนดกลยุทธ์ด้านการดำเนินงาน\n* บริหารจัดการทีม", qualifications: "* ปริญญาตรี\n* ประสบการณ์ 5 ปี"
  });
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // สร้าง  object ใหม่
    const newJob = {
      ...jobData,
      id: Date.now(), // Generate unique ID
      posted: "เมื่อสักครู่",
      isNew: true,
      status: "เปิดรับ",
      // สร้าง snippet จากบรรทัดแรกของ description
      snippet: jobData.description.split('\n')[0].replace('*', '').trim() + "..."
    };
    onPostSuccess(newJob);
  };

  const handleChange = (e) => setJobData({ ...jobData, [e.target.name]: e.target.value });

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
            <div className="mb-4">
                 <Button variant="link" className="text-decoration-none text-muted ps-0" onClick={onCancel}>
                    <ArrowLeft size={18} className="me-1"/> กลับไปหน้าประวัติการโพสต์
                 </Button>
            </div>
          <Card className="border-0 shadow-lg rounded-4 p-4">
             <div className="text-center mb-4">
                <UploadCloud size={48} className="text-primary mb-2" />
                <h3 className="fw-bold">ลงประกาศงานใหม่</h3>
             </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col} md="6" className="mb-3">
                  <Form.Label>ตำแหน่งงาน</Form.Label>
                  <Form.Control required name="title" value={jobData.title} onChange={handleChange} placeholder="เช่น UX/UI Designer" />
                </Form.Group>
                <Form.Group as={Col} md="6" className="mb-3">
                  <Form.Label>บริษัท</Form.Label>
                  {/* กำหนดให้เป็นบริษัทเดียวกับ Mock data */}
                  <Form.Control required name="company" value={jobData.company} onChange={handleChange} readOnly disabled /> 
                </Form.Group>
                <Form.Group as={Col} md="6" className="mb-3">
                  <Form.Label>สถานที่</Form.Label>
                  <Form.Control name="location" value={jobData.location} onChange={handleChange} placeholder="เช่น สีลม, กรุงเทพฯ" />
                </Form.Group>
                <Form.Group as={Col} md="6" className="mb-3">
                  <Form.Label>เงินเดือน</Form.Label>
                  <Form.Control name="salary" value={jobData.salary} onChange={handleChange} placeholder="เช่น 30k - 50k" />
                </Form.Group>
                 <Form.Group as={Col} md="6" className="mb-3">
                  <Form.Label>หมวดหมู่</Form.Label>
                  <Form.Select name="category" value={jobData.category} onChange={handleChange}>
                    <option value="IT & Digital">IT & Digital</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Management">Management</option>
                  </Form.Select>
                </Form.Group>
                 <Form.Group as={Col} md="12" className="mb-3">
                  <Form.Label>รายละเอียดงาน (ขึ้นบรรทัดใหม่ด้วย * เพื่อทำเป็นข้อๆ)</Form.Label>
                  <Form.Control required as="textarea" rows={4} name="description" value={jobData.description} onChange={handleChange} placeholder="รายละเอียดงาน..." />
                </Form.Group>
                 <Form.Group as={Col} md="12" className="mb-3">
                  <Form.Label>คุณสมบัติ</Form.Label>
                  <Form.Control as="textarea" rows={3} name="qualifications" value={jobData.qualifications} onChange={handleChange} placeholder="คุณสมบัติผู้สมัคร..." />
                </Form.Group>
              </Row>
              <div className="d-grid mt-3">
                <Button type="submit" variant="primary" size="lg">โพสต์งานทันที</Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};