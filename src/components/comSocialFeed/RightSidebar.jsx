import React from "react";
// Import: Components หลักจาก React Bootstrap
import { Card, ListGroup, Button } from "react-bootstrap";
// Import: Icons สำหรับใช้งานในแถบด้านข้าง
import {
  InfoSquareFill, // Icon สำหรับข้อมูล/ช่วยเหลือ
  ArrowRightShort, // Icon ลูกศร
  PersonCircle, // Icon รูปบุคคล (Placeholder Avatar)
  RssFill, // Icon สำหรับ News/Feed
} from "react-bootstrap-icons";

// Component: RightSidebar - แสดงส่วน "Trending News" และ "Add to your feed"
const RightSidebar = () => {
  return (
    // Layout Container: กำหนดให้ Component 'sticky' อยู่ด้านบนของ Viewport
    <div className="sticky-top" style={{ top: "20px" }}>
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
};

export default RightSidebar;
