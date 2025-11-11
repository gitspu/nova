import React, { useEffect, useState } from "react";

import { Button, Button2 } from "../Component/Common";
import 
{ 
  PostContainer, 
  PostHead,
  PostBody, 
  PostBodyText, 
  PostBodyImage, 
  PostBodyVideo, 
  PostBodyAudio, 
  PostAction, 
} 
from "../Component/ProfilePost";

import * as api   from "../Script/Api";
import * as icon  from '../Script/Icon'
import './Style/Home.css'

/**
 * หน้าเว็บสำหรับ: หน้าแรก
*/
export function Home ()
{
    return <div className="page-home">
      <ElementMain/>
      <ElementLeft/>
      <ElementRight/>
    </div>

    function ElementLeft ()
    {
        return <div className="left mt-4 ms-4">
          <div>
            <Button2 type='list-vertical' icon={icon.house} text='หน้าหลัก'/>
            <Button2 type='list-vertical' icon={icon.sticky} text='บันทึกโพสต์'/>
            <Button2 type='list-vertical' icon={icon.people} text='กลุ่ม'/>
            <Button2 type='list-vertical' icon={icon.newspaper} text='ข่าวสาร'/>
            <Button2 type='list-vertical' icon={icon.calendar} text='กิจกรรม'/>
          </div>
        </div>
    }
    function ElementRight ()
    {
        return <div className="right mt-4 me-4">
          <div className="trending-news">
            <label className="h4">กำลังมาแรง</label>
            <div>
              <div>
                <label className="fw-bold text-dark">#ReactJS hits 100k commits</label>
                <label className="text-muted small">Trending in Software • 5k posts</label>
              </div>
              <div>
                <label className="fw-bold text-dark">AI Summit announces new date</label>
                <label className="text-muted small">Trending in Tech • 2k posts</label>
              </div>
            </div>
            <div>
              <label>เพิ่มเติม</label>
            </div>
          </div>
        </div>
    }
    function ElementMain ()
    {
        const [postNewText, setPostNewText]  = useState ("");
        const [postNewUpload] = useState ("");
        const [postList] = useState ("");

        useEffect (() => {
            doRefresh ();
        });

        return <div className='main mt-4 ms-4 me-4'>
          <div>
              <input className='w-100' type='text' placeholder='เริ่มโพสต์'
                     value={postNewText} onChange={(e) => setPostNewText (e.target.value)}/>
          </div>
          <div>
            {postNewUpload}
          </div>
          <div className="d-flex flex-grow-1 w-100 mt-2 mb-2">
            <Button2 className='flex-grow-1' layout='horizontal' icon={icon.image} text='รูปภาพ'/>
            <Button2 className='flex-grow-1' layout='horizontal' icon={icon.fileEarmarkPlay} text='วิดีโอ'/>
            <Button2 className='flex-grow-1' layout='horizontal' icon={icon.calendar} text='เหตุการณ์'/>
            <Button2 className='flex-grow-1' layout='horizontal' icon={icon.backquoteLeft} text='บทความ'/>
          </div>
          <div>
            {postList}
          </div>
        </div>


        function doRefresh ()
        {
            console.log ("Feed Refreshed");
        }
    }

    // return <>
    //   {/* Container fluid: กำหนดให้ Container มีความกว้างเต็มหน้าจอ (100%)
    //     pt-4 px-5: เพิ่ม Padding ด้านบน (p) ขนาด 4 และ Padding ซ้ายขวา (x) ขนาด 5 
    //   */}
    //   <Container fluid className="pt-4 px-5">
    //     {/* Row: แถวหลักสำหรับจัดวาง 3 คอลัมน์ (Sidebar ซ้าย, Feed กลาง, Sidebar ขวา) */}
    //     <Row>
    //       {/* Col md={2}: คอลัมน์ขนาด 2 สำหรับหน้าจอขนาดกลาง (md) ขึ้นไป
    //         d-none d-lg-block: ซ่อนคอลัมน์นี้ในทุกขนาดหน้าจอ 
    //         ยกเว้นจะแสดงผลในหน้าจอขนาดใหญ่ (lg) ขึ้นไปเท่านั้น (Left Sidebar จะหายไปในจอเล็กและกลาง)
    //       */}
    //       <Col md={2} className="d-none d-lg-block">
    //         <LeftSidebar /> {/* แสดง Left Sidebar */}
    //       </Col>

    //       {/* Col xs={12} lg={7}: คอลัมน์หลักสำหรับ Feed
    //         xs={12}: ในหน้าจอขนาดเล็กที่สุด (xs) และกลาง (md) จะใช้ความกว้างเต็ม 12 คอลัมน์
    //         lg={7}: ในหน้าจอขนาดใหญ่ (lg) ขึ้นไป จะใช้ความกว้าง 7 คอลัมน์ 
    //       */}
    //       <Col xs={12} lg={7}>
    //         <Main /> {/* แสดง Feed หลัก */}
    //       </Col>

    //       {/* Col md={3}: คอลัมน์ขนาด 3 สำหรับหน้าจอขนาดกลาง (md) ขึ้นไป
    //         d-none d-md-block: ซ่อนคอลัมน์นี้ในหน้าจอขนาดเล็ก (xs) 
    //         และจะแสดงผลในหน้าจอขนาดกลาง (md) ขึ้นไปเท่านั้น
    //       */}
    //       <Col md={3} className="d-none d-md-block">
    //         <RightSidebar /> {/* แสดง Right Sidebar */}
    //       </Col>
    //     </Row>
    //   </Container>
    // </>

    function LeftSidebar ()
    {
        const handleAddExperience = () => {
          // Logic: ควรเรียกใช้ Modal เพื่อกรอกข้อมูลประสบการณ์
          console.log("Action: Open Add Experience Form");
          alert("Placeholder: Experience form will open here.");
        };

        return (
          // Layout Container: กำหนดให้ Component 'sticky' อยู่ด้านบนของ Viewport
          <div className="d-grid gap-3 mt-4" >
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
          <div className="mt-4">
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
   