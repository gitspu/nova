import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { UploadCloud, ArrowLeft } from "lucide-react";

// PostForm (แบบฟอร์มโพสต์งาน)
const companyPost = ({ onPostSuccess, onCancel }) => {
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

export default companyPost;