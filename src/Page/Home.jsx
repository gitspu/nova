import React from "react";
// นำเข้า Components หลักจาก React Bootstrap สำหรับการจัดเลย์เอาต์
import { Container, Row, Col, Navbar } from "react-bootstrap";
// Import: Components หลักจาก React Bootstrap
import { Card, ListGroup, Button } from "react-bootstrap";
// Import: Icons สำหรับเมนูและข้อมูลโปรไฟล์
import {
  BookmarkFill, // Saved Posts
  BoxArrowRight, // Logout
  PeopleFill, // Groups
  Newspaper, // Newsletters
  CalendarEvent, // Events
  GeoAltFill, // Location
} from "react-bootstrap-icons";
// Import: Components หลักจาก React Bootstrap
// Import: Icons สำหรับใช้งานในแถบด้านข้าง
import {
  InfoSquareFill, // Icon สำหรับข้อมูล/ช่วยเหลือ
  ArrowRightShort, // Icon ลูกศร
  PersonCircle, // Icon รูปบุคคล (Placeholder Avatar)
  RssFill, // Icon สำหรับ News/Feed
} from "react-bootstrap-icons";
// Import: Components หลักจาก React Bootstrap
import { Form, InputGroup } from "react-bootstrap";
// Import: Icons สำหรับปุ่มสร้างโพสต์
import {
  Image, // Photo
  PlayBtn, // Video
  CalendarDate, // Event
  PencilSquare, // Article
  Send, // Send Button
} from "react-bootstrap-icons";
// Import: Components หลักจาก React Bootstrap
// Import: Icons สำหรับ Action Buttons
import {
  HandThumbsUp, // Like
  ChatText, // Comment
  Share, // Share
} from "react-bootstrap-icons";

// Import: Link สำหรับการทำ Client-side Routing ไปหน้าโปรไฟล์
import { Link } from "react-router-dom";

import * as auth from "../Script/Authentication";
import * as profile from "../Script/Profile";

export function Home ()
{
    const block = profile.getPersonal ();

    let icon = block.icon != null && block.icon != undefined ? `data:image/jepg;base64, ${block.icon}` : null;
    let name = [block.firstName.value, block.middleName.value, block.lastName.value].join (' ');
    let location = block.location.value;


    return <>
      {/* Container fluid: กำหนดให้ Container มีความกว้างเต็มหน้าจอ (100%)
        pt-4 px-5: เพิ่ม Padding ด้านบน (p) ขนาด 4 และ Padding ซ้ายขวา (x) ขนาด 5 
      */}
      <Container fluid className="pt-4 px-5">
        {/* Row: แถวหลักสำหรับจัดวาง 3 คอลัมน์ (Sidebar ซ้าย, Feed กลาง, Sidebar ขวา) */}
        <Row>
          {/* Col md={2}: คอลัมน์ขนาด 2 สำหรับหน้าจอขนาดกลาง (md) ขึ้นไป
            d-none d-lg-block: ซ่อนคอลัมน์นี้ในทุกขนาดหน้าจอ 
            ยกเว้นจะแสดงผลในหน้าจอขนาดใหญ่ (lg) ขึ้นไปเท่านั้น (Left Sidebar จะหายไปในจอเล็กและกลาง)
          */}
          <Col md={2} className="d-none d-lg-block">
            <LeftSidebar /> {/* แสดง Left Sidebar */}
          </Col>

          {/* Col xs={12} lg={7}: คอลัมน์หลักสำหรับ Feed
            xs={12}: ในหน้าจอขนาดเล็กที่สุด (xs) และกลาง (md) จะใช้ความกว้างเต็ม 12 คอลัมน์
            lg={7}: ในหน้าจอขนาดใหญ่ (lg) ขึ้นไป จะใช้ความกว้าง 7 คอลัมน์ 
          */}
          <Col xs={12} lg={7}>
            <Main /> {/* แสดง Feed หลัก */}
          </Col>

          {/* Col md={3}: คอลัมน์ขนาด 3 สำหรับหน้าจอขนาดกลาง (md) ขึ้นไป
            d-none d-md-block: ซ่อนคอลัมน์นี้ในหน้าจอขนาดเล็ก (xs) 
            และจะแสดงผลในหน้าจอขนาดกลาง (md) ขึ้นไปเท่านั้น
          */}
          <Col md={3} className="d-none d-md-block">
            <RightSidebar /> {/* แสดง Right Sidebar */}
          </Col>
        </Row>
      </Container>
    </>

    function LeftSidebar ()
    {
        const handleAddExperience = () => {
          // Logic: ควรเรียกใช้ Modal เพื่อกรอกข้อมูลประสบการณ์
          console.log("Action: Open Add Experience Form");
          alert("Placeholder: Experience form will open here.");
        };

        return (
          // Layout Container: กำหนดให้ Component 'sticky' อยู่ด้านบนของ Viewport
          <div className="sticky-top d-grid gap-3" style={{ top: "12px" }}>
            {/* Card 1: User Profile and Logout Section */}
            <Card className="custom-card">
              <div className="text-center p-3">
                {/* Link Area: ข้อมูลที่คลิกได้เพื่อนำไปหน้า Profile */}
                <Link to="/profile" className="text-decoration-none d-block">
                  {/* Image: รูป Avatar ของผู้ใช้ **(ส่วนที่เพิ่มกลับมา)** */}
                  <img
                    src={icon}
                    alt="Profile"
                    className="profile-avatar img-fluid"
                  />
                  {/* User Avatar, Name, Job Title, and Location */}
                  <Card.Title className="fw-bold text-dark mt-2 mb-0">
                    {name}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Job Title / Tagline
                  </Card.Subtitle>
                  <div className="text-muted small mb-3">
                    <GeoAltFill className="me-1" />{location}
                  </div>
                </Link>

                {/* Action Button: ปุ่มสำหรับเพิ่มประสบการณ์/ทักษะ */}
                <Button
                  className="btn-dashed"
                  variant="outline-secondary"
                  onClick={handleAddExperience}
                >
                  + ประสบการณ์
                </Button>
              </div>

              {/* ListGroup: Logout Link (แยกออกมาจากเมนูหลัก) */}
              <ListGroup variant="flush">
                <ListGroup.Item
                  action
                  className="custom-list-item text-danger fw-bold"
                >
                  <BoxArrowRight className="me-2" />
                  **Logout**
                </ListGroup.Item>
              </ListGroup>
            </Card>

            {/* Card 2: Main Navigation Links */}
            <Card className="custom-card">
              <ListGroup variant="flush">
                {/* Menu Item: Saved Posts */}
                <ListGroup.Item action className="custom-list-item fw-bold">
                  <BookmarkFill className="me-2" />
                  **Saved Posts**
                </ListGroup.Item>
                {/* Menu Item: Groups */}
                <ListGroup.Item action className="custom-list-item fw-bold">
                  <PeopleFill className="me-2" />
                  **Groups**
                </ListGroup.Item>
                {/* Menu Item: Newsletters */}
                <ListGroup.Item action className="custom-list-item fw-bold">
                  <Newspaper className="me-2" />
                  **Newsletters**
                </ListGroup.Item>
                {/* Menu Item: Events */}
                <ListGroup.Item action className="custom-list-item fw-bold">
                  <CalendarEvent className="me-2" />
                  **Events**
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        );
    }
    function RightSidebar ()
    {
        return (
          // Layout Container: กำหนดให้ Component 'sticky' อยู่ด้านบนของ Viewport
          <div className="sticky-top" style={{ top: "12px" }}>
            {/* Card 1: Trending News Section (ไม่มีการเปลี่ยนแปลง) */}
            <Card className="custom-card mb-4">
              {/* Card Header: หัวข้อ "Trending News" */}
              <Card.Header className="bg-white border-0 fw-bold pb-2">
                <RssFill className="me-2 text-primary" />
                **Trending News**
                <InfoSquareFill className="float-end text-muted" />{" "}
                {/* Icon ข้อมูล */}
              </Card.Header>

              {/* ListGroup: รายการข่าว Trending */}
              <ListGroup variant="flush">
                {/* Trending Item 1 */}
                <ListGroup.Item action className="custom-list-item">
                  <div className="fw-bold text-dark">#ReactJS hits 100k commits</div>
                  <div className="text-muted small">
                    Trending in Software • 5k posts
                  </div>
                </ListGroup.Item>
                {/* Trending Item 2 */}
                <ListGroup.Item action className="custom-list-item">
                  <div className="fw-bold text-dark">
                    AI Summit announces new date
                  </div>
                  <div className="text-muted small">Trending in Tech • 2k posts</div>
                </ListGroup.Item>
                {/* Link: ดูข่าวเพิ่มเติม */}
                <ListGroup.Item
                  action
                  className="custom-list-item text-primary fw-bold"
                >
                  View more news <ArrowRightShort size={20} />
                </ListGroup.Item>
              </ListGroup>
            </Card>

            {/* Card 2: Add to your feed Section (Recommendations) */}
            <Card className="custom-card">
              {/* Card Header: หัวข้อ "Add to your feed" */}
              <Card.Header className="bg-white border-0 fw-bold pb-2">
                **Add to your feed**
                <InfoSquareFill className="float-end text-muted" />
              </Card.Header>

              {/* ListGroup: รายการแนะนำให้ติดตาม (ปรับปรุงโครงสร้าง) */}
              <ListGroup variant="flush">
                {/* Recommendation Item 1 (Company) - ใช้ d-flex และ justify-content-between */}
                <ListGroup.Item className="d-flex align-items-center custom-list-item">
                  <PersonCircle size={40} className="me-3 text-primary" />{" "}
                  {/* Avatar */}
                  <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                    <div>
                      <div className="fw-bold text-dark">Company Name</div>
                      <div className="text-muted small">Industry</div>
                    </div>
                    {/* Action Button: Follow (ย้ายไปด้านขวา) */}
                    <Button
                      variant="outline-dark"
                      size="sm"
                      className="rounded-pill fw-bold"
                    >
                      + Follow
                    </Button>
                  </div>
                </ListGroup.Item>

                {/* Recommendation Item 2 (Person) - ใช้ d-flex และ justify-content-between */}
                <ListGroup.Item className="d-flex align-items-center custom-list-item">
                  <PersonCircle size={40} className="me-3 text-success" />{" "}
                  {/* Avatar */}
                  <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                    <div>
                      <div className="fw-bold text-dark">Relevant Person</div>
                      <div className="text-muted small">Role</div>
                    </div>
                    {/* Action Button: Follow (ย้ายไปด้านขวา) */}
                    <Button
                      variant="outline-dark"
                      size="sm"
                      className="rounded-pill fw-bold"
                    >
                      + Follow
                    </Button>
                  </div>
                </ListGroup.Item>

                {/* Recommendation Item 3 (New Item) - เพิ่มรายการที่ 3 */}
                <ListGroup.Item className="d-flex align-items-center custom-list-item">
                  <PersonCircle size={40} className="me-3 text-info" /> {/* Avatar */}
                  <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                    <div>
                      <div className="fw-bold text-dark">Another Follow Target</div>
                      <div className="text-muted small">Content Creator</div>
                    </div>
                    {/* Action Button: Follow (ย้ายไปด้านขวา) */}
                    <Button
                      variant="outline-dark"
                      size="sm"
                      className="rounded-pill fw-bold"
                    >
                      + Follow
                    </Button>
                  </div>
                </ListGroup.Item>

                {/* Link: ดูคำแนะนำทั้งหมด */}
                <ListGroup.Item
                  action
                  className="custom-list-item text-primary fw-bold"
                >
                  View all recommendations <ArrowRightShort size={20} />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        );
    }
}

function LeftSidebar ()
{
    // Handler: จัดการการคลิกปุ่มเพิ่มประสบการณ์
  
}
function RightSidebar ()
{
   
}
function Main ()
{
    return (
    <div>
      {/* Card 1: Create Post Area (กล่องสำหรับสร้างโพสต์ใหม่) */}
      <Card className="feed-card p-3 mb-4">
        {/* Row 1: Avatar และ Input Field */}
        <div className="d-flex align-items-center mb-3">
          {/* User Avatar */}
          <img
            src="https://via.placeholder.com/50/6c5ce7/FFFFFF?text=P"
            alt="User Avatar"
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          {/* Input Group: ช่องกรอกข้อความโพสต์ */}
          <InputGroup>
            <Form.Control
              placeholder="Start a post"
              className="post-input-box"
            />
          </InputGroup>
        </div>

        {/* Row 2: Action Buttons และปุ่ม Send */}
        <div className="d-flex justify-content-between border-top pt-2">
          {/* Action Buttons: Photo, Video, Event, Article */}
          <div className="d-flex gap-1">
            <Button variant="light">
              <Image className="me-2 text-info" /> **Photo**
            </Button>
            <Button variant="light">
              <PlayBtn className="me-2 text-success" /> **Video**
            </Button>
            <Button variant="light">
              <CalendarDate className="me-2 text-warning" /> **Event**
            </Button>
            <Button variant="light">
              <PencilSquare className="me-2 text-danger" /> **Article**
            </Button>
          </div>

          {/* Send Button: ปุ่มสำหรับส่งโพสต์ */}
          <Button
            variant="dark"
            className="rounded-pill px-4 fw-bold align-self-center"
          >
            Send <Send className="ms-1" />
          </Button>
        </div>
      </Card>

      {/* Feed Divider: ส่วนแสดงตัวกรอง/การเรียงลำดับโพสต์ */}
      <div className="text-center my-3 border-bottom pb-2">
        <span className="text-muted small fw-bold">
          Sort by: <span className="text-primary">Top</span>
        </span>
      </div>

      {/* Post List: แสดงรายการโพสต์ที่ดึงมาจาก PostCard Component */}
      <PostCard />
      <PostCard />
      <PostCard />
      {/* หมายเหตุ: ในแอปพลิเคชันจริง ส่วนนี้ควรใช้ map() loop เพื่อแสดงรายการโพสต์จาก State/API */}
    </div>
  );
}
function PostCard ()
{
      return (
    // Card Container: โพสต์แต่ละอัน
    <Card className="custom-card mb-4">
      {/* Card Header: ส่วนหัวของโพสต์ (ข้อมูลผู้ใช้) */}
      <Card.Header className="d-flex align-items-center bg-white border-0 p-3">
        {/* User Avatar */}
        <PersonCircle size={40} className="me-3 text-primary" />
        <div>
          {/* User Name */}
          <Card.Title className="mb-0 fs-6 fw-bold">**User Name**</Card.Title>
          {/* Metadata: ตำแหน่งงานและเวลาโพสต์ */}
          <Card.Subtitle className="text-muted small">
            Job Title • 1h ago
          </Card.Subtitle>
        </div>
      </Card.Header>

      {/* Card Body: ส่วนเนื้อหาโพสต์ */}
      <Card.Body className="pt-0 pb-2">
        {/* Post Text: เนื้อหาข้อความของโพสต์ */}
        <Card.Text className="text-dark">
          ตัวอย่างเนื้อหาโพสต์ #SmartPersona
        </Card.Text>

        {/* Post Media: รูปภาพ/วิดีโอ (Placeholder) */}
        <img
          src="https://via.placeholder.com/600x300/e0e0e0/555555?text=Post+Content"
          alt="Post Content"
          className="img-fluid rounded-3 mt-2"
        />
      </Card.Body>

      {/* Card Footer: Action Buttons (Like, Comment, Share, Send) */}
      <Card.Footer className="bg-white border-top border-light p-3">
        {/* Row: จัดเรียงปุ่มเป็น 4 คอลัมน์ (Col) */}
        <Row className="text-center">
          {/* Action: Like */}
          <Col>
            <Button variant="light" className="w-100 post-action-btn">
              <HandThumbsUp className="me-1" /> **Like**
            </Button>
          </Col>
          {/* Action: Comment */}
          <Col>
            <Button variant="light" className="w-100 post-action-btn">
              <ChatText className="me-1" /> **Comment**
            </Button>
          </Col>
          {/* Action: Share */}
          <Col>
            <Button variant="light" className="w-100 post-action-btn">
              <Share className="me-1" /> **Share**
            </Button>
          </Col>
          {/* Action: Send (Direct Message) */}
          <Col>
            <Button variant="light" className="w-100 post-action-btn">
              <Send className="me-1" /> **Send**
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}