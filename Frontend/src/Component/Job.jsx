import React from "react";
import 
{ 
    Card, 
    Row, 
    Col, 
    Badge, 
    Button,
    Container,
    InputGroup,
    Form,
} 
from "react-bootstrap";
import 
{
    Briefcase,
    Clock,
    Banknote,
    Share2,
    Heart,
    MapPin,
    Search
} 
from "lucide-react";
import { A, Div, H1, H2, H3, H4, H5, H6, Img, Label, P, Span } from "./Common";
import styled from "styled-components";


//
// JobCard (การ์ดงานแต่ละรายการ)
//
export function PostList ({ data, isActive, onClick, isSaved }) 
{
    if (data == null) return;

    const title = String (data.title);
    const entity = String (data.company);
    const location = String (data.location);
    const brief = String (data.snippet);
    const created = new Date (data.posted).toLocaleDateString ();

    return <>
      <Card
        className={`mb-3 shadow-sm transition-all border-2 ${
          isActive ? "border-primary border-2 border-start bg-light" : ""
        }`}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <Card.Body className="p-3">
          <Row>
            <Col xs={9}>
              <Div className="d-flex align-items-start justify-content-between">
                <H2>{title}</H2>
              </Div>

              <H4 $variant="secondary" $weight="medium" className="mb-2">{entity}</H4>

              <Div className="d-flex gap-2 mb-2">
                {data.isNew && (<Badge bg="light" className="border border-success rounded-pill fw-medium px-2" text="success">ใหม่</Badge>)}
                {isSaved && (<Badge bg="danger" className="rounded-pill">บันทึกแล้ว</Badge>)}
              </Div>

              <Div className="text-secondary small mb-2 d-flex align-items-center gap-1">
                <MapPin size={14} />
                <Label>{location}</Label>
              </Div>

              {/* ส่วนสรุปย่อ (Snippet) */}
              <Div className="text-muted small" style={{ fontSize: "0.85rem", lineHeight: "1.4" }}>
                <P>{brief}</P>
              </Div>

              <Div className="text-muted mt-2" style={{ fontSize: "0.75rem" }}>
                <H5>{created} • {data.salary}</H5>
              </Div>
            </Col>

            {/* Logo บริษัท */}
            <Col
              xs={3}
              className="text-end d-flex flex-column justify-content-between align-items-end"
            >
              <Img
                src={data.logoUrl}
                alt="logo"
                className="rounded-1 border p-1"
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "contain",
                }}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
};

const StylePostDetail = styled.div `
    width: 100%;
    height: 100%;

    position: relative;
    overflow: hidden;

    /* background-color: var(--app-bg-2); */
    border: var(--app-bg-border-2);
    border-radius: var(--app-bg-radius-2);
`;
const StylePostDetailBanner = styled.img `

    position: absolute;

    width: 100%;
    height: 192px;

    border: none;
    outline: none;
    object-fit: cover;
`;
const StylePostDetailHeading = styled.div `
  
    padding: 0px 24px;
    position: absolute;
    inset: calc(192px - 48px) 0px auto 0px;

    height: 96px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    & img
    {

        border: 2px solid white;
        border-radius: var(--app-bg-radius-1);
    }
`;
const StylePostDetailContent = styled.div `

    position: absolute;
    padding: 0px 24px;
    inset: calc(192px + 64px) 0px 0px 0px;
    overflow-y: auto;
`;

export function PostDetail ({job, save, share})
{
    if (job == null) return;

    const [getSaved, setSaved] = save;

    return <>
      <StylePostDetail className="shadow-lg border-0">
        <StylePostDetailBanner
          src="https://placehold.co/600x150/0d1b3e/ffffff?text=Company+Banner"
          alt="Company Banner">
        </StylePostDetailBanner>
        <StylePostDetailHeading>
          {/* โลโก้บริษัท */}
          <Img
            src={job.logoUrl}
            alt={`Logo of ${job.company}`}
            width={96} height={96}
          />
          {/* ปุ่ม Save และ Share */}
          <Div className="d-flex gap-2 ">
            <Button
              variant="light"
              className={`rounded-circle border shadow-sm  ${
                getSaved ? "bg-danger text-white border-danger" : "text-danger"
              }`}
              style={{ width: '48px', height: '48px'}}
              // เมื่อคลิกปุ่มนี้ จะเรียก onToggleSave โดยส่ง id ของงาน
              onClick={() => setSaved (!getSaved)}>
              <Heart className={getSaved ? "fill-current" : ""} size={24} />
            </Button>
            <Button
              variant="light"
              className="rounded-circle border shadow-sm text-primary "
              style={{ width: '48px', height: '48px'}} onClick={share}>
              <Share2 size={24} />
            </Button>
          </Div>
        </StylePostDetailHeading>
        <StylePostDetailContent>
          <H1 $variant='primary' $size='h1'>{String (job.title)}</H1>
          <Div className=" d-flex align-items-center gap-2">
            <H2 $variant='secondary' $size='text'>{String (job.company)}</H2>
            <A>ดูโปรไฟล์บริษัท</A>
          </Div>
          {/* Job Info Grid (ข้อมูลงาน) */}
          <div className="mt-4 row g-3 mb-4 text-secondary small border-top">
            <div className="col-6 d-flex align-items-center gap-2">
              <MapPin className="text-info" size={18} />{" "}
              <Label $weight='medium'>{job.location}</Label>
            </div>
            <div className="col-6 d-flex align-items-center gap-2">
              <Briefcase className="text-info" size={18} />{" "}
              <Label $weight='medium'>{job.type}</Label>
            </div>
            <div className="col-6 d-flex align-items-center gap-2">
              <Banknote className="text-success" size={18} />{" "}
              <Label $weight='bold'>{job.salary}</Label>
            </div>
            <div className="col-6 d-flex align-items-center gap-2">
              <Clock className="text-info" size={18} />{" "}
              <Label $weight='medium'>{job.posted}</Label>
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
        </StylePostDetailContent>
      </StylePostDetail>
    </>
}
export function PostPlaceholder ()
{
    // Placeholder (เมื่อยังไม่ได้เลือกงาน)
    return <>
      <Div
        className="text-center text-muted d-flex flex-column align-items-center justify-content-center h-100 bg-white shadow-lg"
        style={{
          minHeight: "500px",
          border: "var(--app-bg-border-2)",
          borderRadius: "var(--app-bg-radius-2)",
          borderStyle: "dashed",
        }}
      >
        <Briefcase size={48} className="text-muted mb-3 opacity-50" />
        <H1>เลือกงานเพื่อดูรายละเอียด</H1>
        <P>คลิกที่การ์ดงานทางด้านซ้ายเพื่อดูข้อมูลเพิ่มเติม</P>
      </Div>
    </>
}

// JobHeader (ส่วนหัว: แถบค้นหาและฟิลเตอร์หมวดหมู่)
export function JobHeader ({
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    allJobs = [],
}) 
{
    const categories = ["ทั้งหมด", "IT & Digital", "Marketing", "Management"];

    // ฟังก์ชันเพื่อนับจำนวนงานตามหมวดหมู่
    const getCount = (cat) => 
    {
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

