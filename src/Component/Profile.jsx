import { Back, BoxArrowLeft, BoxArrowRight, Gear, GearWideConnected } from 'react-bootstrap-icons';
import * as auth from '../Script/Authentication'
import * as profile from '../Script/Profile'
import './Style/Profile.css'
import { useState } from 'react';

export function ProfileHead ()
{
    return <div>
        <img src="" width={48} height={48}></img>
    </div>
}
/**
 * ส่วนประกอบ สำหรับแสดงรูปโปรไฟล์พร้อมชื่อ (ตามที่กำหนด)
*/
export function ProfileCard ({
    showBorder = true /* แสดงขอบ */, 
    showIcon = true /* แสดงรูปโปรไฟล์ */, 
    showName = true /* แสดงชื่อโปรไฟล์ หรือ ชื่อบัญชี */,
    style = {} /* กำหนด css ให้กับส่วนประกอบ */, 
    className = "" /* กำหนดคลาสให้กับส่วนประกอบ */, 
    children /* รายการย่อยในตัวแม่ */
})
{
    let profileName = null;
    let profileIcon = "";
    let viewportClass = ["h-100", className].join (' ');
    let containerClass = ["w-100", "h-100", "p-1" , "d-flex", "align-items-center", "gap-3", showBorder ? "border border-1 rounded" : ""].join (' ');
    const [open, setOpen] = useState (false);

    if (auth.isLogged() && auth.isActive())
    {
        try
        {
            const info = profile.getPersonal ();

            if (info.icon != null || info.icon != "") {
                profileIcon = `data:image/jepg;base64, ${info.icon}`;
            }
            profileName = [info.firstName.value, info.middleName.value, info.lastName.value].join (' ');

            if (profileName == "") {
                profileName = auth.getName ();
            }
        }
        catch { ; }
    }
    return <Viewport>
        <Container>
            {showIcon ? <img className='h-100 flex-1 rounded-circle' src={profileIcon}></img> : <></>}
            {showName ? <label className='flex-2'>{profileName}</label> : <></>}
        </Container>
        <Context>
            <ContextItem text='โปรไฟล์'/>
            <ContextItem text='การตั้งค่า'/>
            <ContextItem text='ออกจากระบบ'/>
        </Context>
    </Viewport>

    function Viewport ({children})
    {
        return <button className={viewportClass} style={{minWidth: 192, height: '48px'}}>{children}</button>
    }
    function Container ({children})
    {
        return <div className={containerClass} onClick={() => setOpen(!open)}>{children}</div>
    }
    function Context ({children})
    {
        return <div className='w-100 border border-1'>{children}</div>
    }
    function ContextItem ({icon, text})
    {
        if (open == false) {
            return <></>
        }
        return <button className='w-100'>
            <img src={icon} alt=''></img>
            <label>{text}</label>
        </button>
    }
}
export function ProfileCardContext ()
{
    return 
}

/**
 * ส่วนประกอบสำหรับแสดงโพสต์ในโปรไฟล์ ซึ่งรวมไปถึงหน้าฟีดเช่นเดียวกัน
*/
export function ProfilePost ()
{
    function Background ({children})
    {
        // Card Container: โพสต์แต่ละอัน
        return <Card className="custom-card mb-4">{children}</Card>
    }
    function Header ()
    {
        // Card Header: ส่วนหัวของโพสต์ (ข้อมูลผู้ใช้)
        return <Card.Header className="d-flex align-items-center bg-white border-0 p-3">
            {/* User Avatar */}
            <PersonCircle size={40} className="me-3 text-primary" />
            <div>
                {/* User Name */}
                <Card.Title className="mb-0 fs-6 fw-bold">**User Name**</Card.Title>
                {/* Metadata: ตำแหน่งงานและเวลาโพสต์ */}
                <Card.Subtitle className="text-muted small">Job Title • 1h ago</Card.Subtitle>
            </div>
        </Card.Header>

    }
    function Body ()
    {
        // Card Body: ส่วนเนื้อหาโพสต์
        return <Card.Body className="pt-0 pb-2">
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
    }
    function Footer ()
    {
        // Card Footer: Action Buttons (Like, Comment, Share, Send)
        return <Card.Footer className="bg-white border-top border-light p-3">
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
    }

    return <Background>
        <Header/>
        <Body/>
        <Footer/>
    </Background>
}