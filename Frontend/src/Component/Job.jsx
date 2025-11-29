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
import { A, Div, H1, H2, H3, H4, H5, H6, Hr, Img, Label, P, Section, Span } from "./Common";
import styled from "styled-components";
import api, { profileEm, util } from "../Script/Api"
import nav from "../Script/Navigator"
import icon from "../Script/Icon"

//
// JobCard (การ์ดงานแต่ละรายการ)
//
export function PostList ({ oOwner, oData, sActive, sSaved }) 
{
    let logo      = String (api.decodeContent (oOwner.icon));
    const name      = String (oOwner.name);

    const title     = String (oData.title);
    const location  = String (oData.location);
    const brief     = String (oData.brief);
    const created   = new Date (oData.created);
    let salary    = "";

    salary = `${oData.minSalary} - ${oData.maxSalary}`;


    if (logo == "" || logo == icon.transparent)
        logo = icon.profile;

    if (oData.minSalary == 0 && oData.maxSalary == 0)
        salary = "รายได้ไม่ตายตัว";

    const isRecently = !util.timeLonger (created, 259200000); // 3 วัน

    const [isActive, setActive] = sActive;
    const [isSaved] = sSaved;

    return <>
      <Card
        className={`mb-3 shadow-sm transition-all border-2 ${
          isActive ? "border-success border-2 border-start bg-light" : ""
        }`}
        onClick={setActive}
        style={{ cursor: "pointer" }}
      >
        <Card.Body className="p-3">
          <Row>
            <Col xs={9}>
              <Div className="d-flex align-items-start justify-content-between">
                <H2>{title}</H2>
              </Div>

              <H4 $variant="secondary" $weight="medium" className="mb-2">{name}</H4>

              <Div className="d-flex gap-2 mb-2">
                {isRecently && (<Badge bg="light" className="border border-success rounded-pill fw-medium px-2" text="success">ใหม่</Badge>)}
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
                <H5>{created.toLocaleDateString()} • {salary}</H5>
              </Div>
            </Col>

            {/* Logo บริษัท */}
            <Col
              xs={3}
              className="text-end d-flex flex-column justify-content-between align-items-end"
            >
              <Img
                src={logo}
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
    </>;
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

    background-color: var(--app-bg-2);
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

export function PostDetail ({oOwner, oData, sSave, sShare })
{
    const background = String (api.decodeContent (oOwner.background));
    let logo = String (api.decodeContent (oOwner.icon));
    const name = String (oOwner.name);

    const title = String (oData.title);
    const created = String (oData.created.toLocaleDateString ());
    const location = String (oData.location);
    const description = String (oData.description);
    const requirement = String (oData.requirement);

    let time = Number (oData.workTime);
    let salary = "";

    switch (time)
    {
        case profileEm.WORK_TIME_FULL: time = "ทำงานเต็มเวลา"; break;
        case profileEm.WORK_TIME_PART: time = "พาร์ทไทม์"; break;
        case profileEm.WORK_TIME_CONTRACT: time = "ตามเงื่อนไขสัญญา"; break;
    }
    salary = `${oData.minSalary} - ${oData.maxSalary}`;


    
    if (logo == "" || logo == icon.transparent)
        logo = icon.profile;

    if (oData.minSalary == 0 && oData.maxSalary == 0)
        salary = "รายได้ไม่ตายตัว";

    const [saved, setSaved] = sSave;
    const [shared, setShared] = sShare;

    return <>
      <StylePostDetail className="shadow-lg border-0">
        <StylePostDetailBanner src={background}/>
        <StylePostDetailHeading>
          {/* โลโก้บริษัท */}
          <Img src={logo} alt={name} width={96} height={96}/>
          {/* ปุ่ม Save และ Share */}
          <Div className="d-flex gap-2 ">
            {saved != null &&
              <Button variant="light"className={`rounded-circle border shadow-sm
                  ${saved ? "bg-danger text-white border-danger" : "text-danger"}`}
                style={{ width: '48px', height: '48px'}}
                // เมื่อคลิกปุ่มนี้ จะเรียก onToggleSave โดยส่ง id ของงาน
                onClick={() => setSaved (!saved)}>
                <Heart className={saved ? "fill-current" : ""} size={24} />
              </Button>
            }
            <Button
              variant="light"
              className="rounded-circle border shadow-sm text-primary "
              style={{ width: '48px', height: '48px'}} onClick={setShared}>
              <Share2 size={24} />
            </Button>
          </Div>
        </StylePostDetailHeading>
        <StylePostDetailContent>
          <Section className="mb-2">
            <H1 className="mb-1" $variant='primary' $size='h1'>{String (title)}</H1>
            <Div className=" d-flex align-items-center gap-2">
              <H2 $variant='secondary' $size='text'>{name}</H2>
              <A onClick={() => nav.userProfile (oOwner.id)}>ดูโปรไฟล์บริษัท</A>
            </Div>
          </Section>
          <Section className="mb-4">
            <Row>
              <Col>
                <MapPin className="me-2 text-info" size={24} />
                <Label $weight='medium'>{location}</Label>
              </Col>
              <Col>
                <Briefcase className="me-2 text-info" size={24}/>
                <Label $weight='medium'>{time}</Label>  
              </Col>
            </Row>
            <Row>
              <Col>
                <Banknote className="me-2 text-success" size={24}/>
                <Label $weight='medium'>{salary}</Label>
              </Col>
              <Col>
                <Clock className="me-2 text-info" size={24}/>
                <Label $weight='medium'>{created}</Label>
              </Col>
            </Row>
          </Section>

          <Section>
            <H2 className="mb-4">รายละเอียดงาน</H2>
            <P className="mt-4 mb-4 ms-4 me-4">{description}</P>
          </Section>
          <Section>
            <H2 className="mb-4">คุณสมบัติ</H2>
            <P className="mb-4 ms-4 me-4">{requirement}</P>
          </Section>
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

