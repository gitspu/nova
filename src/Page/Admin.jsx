import * as profile from './../API/Profile'
import * as auth    from './../API/Authentication'
import * as authUI  from './../Page/Auth'

import { useEffect, useState } from "react"
import { ToggleBar, ToggleBarItem, ToggleBarSeparator, ToggleBox } from "./../Component/Common"
import { ProfileCard } from './../Component/Profile';
import './Style/Admin.css'

export function Admin ()
{
    if (auth.isLogged () == false)
    {
        return authUI.navigate ();
    }
    if (auth.isActive () == false ||
        (auth.getRole () != auth.ROLE_ADMIN &&
        auth.getRole () != auth.ROLE_TESTER &&
        auth.getRole () != auth.ROLE_DEVELOPER))
    {
        return <p>Insufficient permission</p>;
    }
    

    const [selection, setSelection] = useState (1);
    const [selectionOpen, setSelectionOpen] = useState (window.innerWidth >= 512 ? true : false);

    function resize ()
    {
        setSelectionOpen (window.innerWidth >= 512 ? true : selectionOpen);
    }

    useEffect (() => 
    {
        document.title = "NOVA Admin";
        window.addEventListener ("resize", resize);

        return () =>
        {
            window.removeEventListener ("resize", resize);
        }
    });


    return <div className="page-admin">
        <Content selection={selection}/>
        <Menu selectionOpen={selectionOpen} selection={[selection, setSelection]}/>
        <Header selectionOpen={[selectionOpen, setSelectionOpen]}/>
    </div>
}
function Header ({selectionOpen})
{
    return <div className="header">
        <div className="header-inner">
            {window.innerWidth < 512 ?
                <button onClick={() => selectionOpen[1](!selectionOpen[0])}>Selection</button> :
                ""
            }
            <h2>แผงควบคุมระบบ</h2>
            <div style={{flexGrow: 1}}></div>
            <ProfileCard/>
        </div>
    </div>
} 
function Menu ({selectionOpen, selection})
{
    return <div className="menu" style={{ display: selectionOpen ? 'block' : 'none' }}>
        <div className="menu-inner">
            <ToggleBar type='vertical' state={selection[0]} setState={selection[1]}>
                <ToggleBarItem text='แดชบอร์ด' value={1}/>
                <ToggleBarItem text='ระบบยืนยันตัวตน' value={2}/>
                <ToggleBarItem text='โปรไฟล์' value={5}/>
                <ToggleBarSeparator text='ทดสอบระบบ'/>
                <ToggleBarItem text='ทดสอบระบบ API' value={3}/>
                <ToggleBarItem text='ทดสอบระบบ UI' value={4}/>
            </ToggleBar>
        </div>
    </div>
}
function Content ({selection})
{
    return <div className="content">
        <div className="content-inner">
            {
                selection == 1 ? <ContentDashboard/> :
                selection == 2 ? <ContentAuthentication/> :
                selection == 3 ? <ContentTestAPI/> :
                selection == 4 ? <ContentTestUI/> :
                ""
            }
        </div>
    </div>
}
function ContentDashboard ()
{
    return <div>
        <div>
            <h1>แดชบอร์ด</h1>
            <hr></hr>
            <br></br>
        </div>
    </div>
}
function ContentAuthentication ()
{
    return <div>
        <div>
            <h1>การยืนยันตัวตน</h1>
            <hr></hr>
            <br></br>
        </div>
        <div>
            <ToggleBox name='เปิดใช้งาน การสมัครบัญชี' description='อนุญาตให้ผู้ที่ต้องการสามารถสมัครสมาชิกเพื่อเข้าถึงแพลตฟอร์มได้'/>
            <ToggleBox name='เปิดใช้งาน การเข้าสู่ระบบ' description='อนุญาตให้ผู้ใช้ที่สมัครสมาชิกแล้วสามารถเข้าสู่ระบบแพลตฟอร์ม ผู้ดูแลระบบยังสามารถเข้าถึงแพลตฟอร์มได้แม้ว่าตั้งค่านี้จะถูกปิดใช้งาน'/>
            <ToggleBox name='เปิดใช้งาน การลบบัญชี' description='อนุญาตให้ผู้ใช้ที่สมัครสมาชิกแล้วสามารถลบบัญชีของตนเองได้'/>
            
        </div>
    </div>
}
function ContentTestAPI ()
{
    function getPersonal ()
    {
        try { return JSON.stringify (profile.getPersonal ()); }
        catch (ex) { return String(ex); }
    }
    function getSocial ()
    {
        try { return JSON.stringify (profile.getSocial ()); }
        catch (ex) { return String(ex); }
    }
    function getJob ()
    {
        try { return JSON.stringify (profile.getJob ()); }
        catch (ex) { return String(ex); }
    }
    function getPost ()
    {
        try { return JSON.stringify (profile.getPost ()); }
        catch (ex) { return String(ex); }
    }
    function logout ()
    {
        auth.logout ();
        window.location.reload ();
    }
    return <div>
        <div>
            <h1>ทดสอบระบบ API</h1>
            <hr/>
            <br/>
        </div>
        <div>
            <h3>ระบบยืนยันตัวตน</h3>
            <p>
                ระบบ: {auth.stateClient.init ? "กำลังทำงาน" : "ไม่ทำงาน"}<br/>
                รหัสเซสชั่น: {auth.stateClient.session}<br/>
                รหัสเซสชั่น หมดอายุ: {auth.stateClient.sessionExpired == "null" ? "ไม่มีวันหมดอายุ" : auth.stateClient.sessionExpired}<br/>
                รหัสเข้าถึง: {auth.stateClient.access}<br/>
                <br/>
                ชื่อ: {auth.stateClient.name}<br/>
                บทบาท: {
                    auth.stateClient.role == 0 ? "ROLE_UNKNOWN" :
                    auth.stateClient.role == 1 ? "ROLE_USER" :
                    auth.stateClient.role == 2 ? "ROLE_EMPLOYER" :
                    auth.stateClient.role == 3 ? "ROLE_ADMIN" :
                    auth.stateClient.role == 4 ? "ROLE_TESTER" :
                    auth.stateClient.role == 5 ? "ROLE_DEVELOPER" : "<<Unknown>>"
                }
                <br/>
                สถานะ: {
                    auth.stateClient.status == 0 ? "STATUS_UNKNOWN" :
                    auth.stateClient.status == 1 ? "STATUS_ACTIVE" :
                    auth.stateClient.status == 2 ? "STATUS_INACTIVE" :
                    auth.stateClient.status == 3 ? "STATUS_SUSPEND" : "<<Unknown>>"
                }
                <br/>
                <button onClick={() => logout()}>ออกจากระบบ</button>
            </p>
        </div>
        <br/>
        <div>
            <h3>ระบบโปรไฟล์</h3>
            <p>
                ระบบ: {profile.stateClient.client.init ? "กำลังทำงาน" : "ไม่ทำงาน"}<br/>
                ข้อมูลส่วนตัว: 
                <br></br>
                <div style={{border: '1px solid black', wordBreak: 'break-word', padding: '12px'}}>
                    {getPersonal()}
                </div>
                ข้อมูลสังคม: 
                <br></br>
                <div style={{border: '1px solid black', wordBreak: 'break-word', padding: '12px'}}>
                    {getSocial()}
                </div>
                ข้อมูลงาน: 
                <br></br>
                <div style={{border: '1px solid black', wordBreak: 'break-word', padding: '12px'}}>
                    {getJob()}
                </div>
                ข้อมูลโพสต์
                <br></br>
                <div style={{border: '1px solid black', wordBreak: 'break-word', padding: '12px'}}>
                    {getPost()}
                </div>
            </p>
        </div>
    </div>
}
function ContentTestUI ()
{
    return <div>
        <div>
            <h1>ทดสอบระบบ UI</h1>
            <hr></hr>
        </div>
        <div style={{width: '100%', height: '512px', border: '1px solid black'}}>
            <label>Background</label>
        </div>
        <div>
            <button>เริ่มต้น</button>
            <button>ปกติ</button>
            <button>สีเขียว</button>
            <button>สีเหลือง</button>
            <button>สีแดง</button>
            <button>สีฟ้า</button>
        </div>
    </div>
}