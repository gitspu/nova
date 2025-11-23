import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Badge,
  InputGroup,
} from "react-bootstrap";
import { Search, MapPin } from "lucide-react";

// JobHeader (ส่วนหัว: แถบค้นหาและฟิลเตอร์หมวดหมู่)
const JobHeader = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  allJobs = [],
}) => {
  const categories = ["ทั้งหมด", "IT & Digital", "Marketing", "Management"];

  // ฟังก์ชันเพื่อนับจำนวนงานตามหมวดหมู่
  const getCount = (cat) => {
    if (cat === "ทั้งหมด") return allJobs.length;
    return allJobs.filter((job) => job.category === cat).length;
  };

  return (
    // ใช้ bg-primary เป็นสีน้ำเงินเข้ม และเพิ่ม padding ด้านล่าง
    <div className="bg-primary text-white py-5 shadow-lg ">
      <Container className="position-relative px-lg-5">
        {/* Search Bar (แถบค้นหา) - ทำเป็น Card สีขาวขนาดใหญ่ */}
        <div
          className="bg-white p-3 rounded-4 shadow mb-4 "
          style={{ transform: "translateY(10px)" }}
        >
          {" "}
          {/* ใช้ shadow มาตรฐาน */}
          <Row className="g-0 align-items-center ">
            {/* Search Input */}
            <Col xs={10} md={5} className="border-end border-light ">
              <InputGroup className="h-100 align-items-center ">
                <InputGroup.Text className="bg-transparent border-0 ps-3 ">
                  <Search className="text-primary opacity-75" size={20} />{" "}
                  {/* เปลี่ยนสีไอคอนให้เด่นขึ้น */}
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="ค้นหางาน"
                  className="border-0 shadow-none py-2 text-dark"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: "1.1rem" }}
                />
              </InputGroup>
            </Col>
            {/* Location (ตำแหน่งงาน) */}
            <Col
              xs={0}
              md={3}
              className="d-none d-md-block border-end border-light"
            >
              <div className="d-flex align-items-center h-100 px-3 text-muted">
                <MapPin size={18} className="me-2 text-info" />
                <span>กรุงเทพมหานคร</span>
              </div>
            </Col>
            {/* Search Button */}
            <Col xs={2} md={2} className="p-1 ms-auto">
              <Button
                variant="danger"
                className="w-100 h-100 fw-bold border-0 rounded-3 shadow-sm"
                style={{ height: "48px", fontSize: "1rem" }}
              >
                <span className="d-none d-md-inline text-white">ค้นหา</span>
                <Search size={18} className="d-inline d-md-none" />
              </Button>
            </Col>
          </Row>
        </div>

        {/* Category Filters (ฟิลเตอร์หมวดหมู่) */}
        <div className="d-flex gap-2 flex-wrap justify-content-center justify-content-md-start mt-4 ">
          {categories.map((cat, idx) => {
            const count = getCount(cat);
            return (
              <Button
                key={idx}
                // กำหนด Active state และใช้ Bootstrap utility classes
                variant={activeCategory === cat ? "light" : "outline-light"}
                size="sm"
                className={`rounded-pill px-4 py-2 fw-medium shadow-sm gap-3${
                  activeCategory === cat
                    ? "fw-bold text-primary shadow-sm"
                    : "text-white opacity-90 "
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}{" "}
                <Badge
                  bg={activeCategory === cat ? "primary" : "white"}
                  text={activeCategory === cat ? "white" : "dark"}
                  pill
                  className="ms-1"
                  style={{
                    fontSize: "0.65rem",
                    opacity: activeCategory === cat ? 1 : 0.8,
                  }}
                >
                  {count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default JobHeader;
