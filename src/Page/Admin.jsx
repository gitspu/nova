import { useEffect, useState } from "react"

import { ArrowLeft } from "react-bootstrap-icons";
import { ToggleBar, ToggleBarItem, ToggleBarSeparator, Checkbox, Button } from "./../Component/Common"
import { ProfileCard } from './../Component/Profile';

import IconList from './../Asset/Icon/List.svg'

import * as profile from '../Script/Profile'
import * as auth    from '../Script/Authentication'
import * as navigator from '../Script/Navigator'

import './Style/Admin.css'

export function Admin ()
{
    const [selection, setSelection]         = useState (1);
    const [selectionOpen, setSelectionOpen] = useState (!isNarrow ());
    

    useEffect (() => 
    {
        if (auth.isLogged () == false || auth.isActive() == false)
        {
            // ย้ายผู้ใช้ไปยังหน้าเข้าสู่ระบบ
            navigator.auth ();
            return;
        }
        if (auth.getRole() != auth.ROLE_ADMIN &&
            auth.getRole() != auth.ROLE_TESTER &&
            auth.getRole() != auth.ROLE_DEVELOPER) 
        {
            // สิทธิ์การเข้าถึงไม่เพียงพอ
            return <p>Insufficient permission</p>;
        }

        document.title = "NOVA Administrator Panel";
        window.addEventListener ("resize", onResize);

        return () =>
        {
            window.removeEventListener ("resize", onResize);
        }
    });

    
    return <Viewport>
        {/* ต้องเรียงลำดับย้อนกลับเนื่องจากส่วนที่ล่างสุดจะอยู่ด้านหน้าสุด */}
        <Content selection={selection}/>
        <Menu selectionShow={selectionOpen} selectionState={[selection, setSelection]}/>
        <Header selectionOpen={[selectionOpen, setSelectionOpen]}/>
    </Viewport>

    function Viewport ({children})
    {
        return <div className='page-admin'>{children}</div>
    }
    function Header ()
    {
        return <div className='header'>
            <div className='header-inner'>
                <h2>แผงควบคุมระบบ</h2>
                <div style={{flexGrow: 1}}></div>
                <Button layout='horizontal' icon={IconList} click={() => setSelectionOpen(!selectionOpen)}/>
                <ProfileCard showBorder={!isNarrow()} showName={!isNarrow()}/>
            </div>
        </div>
    }
    function Menu ()
    {
        return <div className="menu" style={{ display: selectionOpen ? 'block' : 'none' }}>
            <div className="menu-inner">
                <ToggleBar type='vertical' state={[selection, setSelection]}>
                    <ToggleBarItem text='แดชบอร์ด' value={1}/>
                    <ToggleBarItem text='ระบบยืนยันตัวตน' value={2}/>
                    <ToggleBarItem text='บัญชี' value={5}/>
                    <ToggleBarSeparator text='ทดสอบระบบ'/>
                    <ToggleBarItem text='ทดสอบระบบ API' value={3}/>
                    <ToggleBarItem text='ทดสอบระบบ UI' value={4}/>
                </ToggleBar>
            </div>
        </div>
    }
    function Content ()
    {
        return <div className="content">
            <div className="content-inner">
                {
                    selection == 1 ? <ContentDashboard/> :
                    selection == 2 ? <ContentAuthentication/> :
                    selection == 3 ? <ContentTestAPI/> :
                    selection == 4 ? <ContentTestUI/> :
                    selection == 5 ? <ContentAccount/> :
                    <></>
                }
            </div>
        </div>
    }

    function onResize ()
    {
        setSelectionOpen (!isNarrow ());
    }

    function isNarrow () { return window.innerWidth <= 512; }
}

function ContentDashboard ()
{
    return <div className="content-dashboard">
        <div>
            <h1>แดชบอร์ด</h1>
            <hr></hr>
            <br></br>
        </div>
        <div>
            <button>รีเฟรชข้อมูล</button>
        </div>
        <Item>
            <ItemChild title='สมัครสมาชิก' value='0'></ItemChild>
            <ItemChild title='เข้าสู่ระบบ' value='0'></ItemChild>
            <ItemChild title='ประกาศงาน' value='0'></ItemChild>
        </Item>
    </div>

    function Item ({children})
    {
        return <div className="item">{children}</div>
    }
    function ItemChild ({title, value})
    {
        return <div className="item-child">
            <label className="value">{value}</label>
            <label className="title">{title}</label>
        </div>
    }
}
function ContentAuthentication ()
{
    const [register, setRegister] = useState (auth.stateServer.config.enableCreation);
    const [login, setLogin] = useState (auth.stateServer.config.enableLogin);
    const [deletion, setDeletion] = useState (auth.stateServer.config.enableDeletion);

    return <div>
        <div>
            <h1>การยืนยันตัวตน</h1>
            <hr></hr>
            <br></br>
        </div>
        <div>
            <Checkbox state={[register, setRegister]} name='เปิดใช้งาน การสมัครบัญชี' description='อนุญาตให้ผู้ที่ต้องการสามารถสมัครสมาชิกเพื่อเข้าถึงแพลตฟอร์มได้'/>
            <Checkbox state={[login, setLogin]} name='เปิดใช้งาน การเข้าสู่ระบบ' description='อนุญาตให้ผู้ใช้ที่สมัครสมาชิกแล้วสามารถเข้าสู่ระบบแพลตฟอร์ม ผู้ดูแลระบบยังสามารถเข้าถึงแพลตฟอร์มได้แม้ว่าตั้งค่านี้จะถูกปิดใช้งาน'/>
            <Checkbox state={[deletion, setDeletion]} name='เปิดใช้งาน การลบบัญชี' description='อนุญาตให้ผู้ใช้ที่สมัครสมาชิกแล้วสามารถลบบัญชีของตนเองได้'/>
            
        </div>
    </div>
}
function ContentAccount ()
{
    const [view, setView] = useState (1);
    const [search, setSearch] = useState ("");

    return <div>
        <div className={view == 1 ? "account-content d-block" : "d-none"}>
            <div> { /* ส่วนหัว */ }
                <h1>บัญชี</h1>
                <hr></hr>
                <br></br>
            </div>
            <div className="mb-2"> {/* ตัวเลือก */}
                <button>รีเฟรชข้อมูล</button>
                <button>เพิ่มบัญชี</button>
            </div>
            <div> {/* ช่องค้นหา */}
                <input type='search' placeholder="ค้นหาบัญชีด้วย ชื่อ หรือ รหัสเฉพาะ" value={search} onChange={(e) => setSearch(e.target.value)} style={{width: '100%'}}></input>
            </div>
            <Table/>
        </div>
        <div className={view == 2 ? "content-account-data d-block" : "d-none"}>
            <div>
                <h1>บัญชี: NAME</h1>
                <hr></hr>
                <br></br>
            </div>
            <div className="mb-4">
                <button onClick={() => setView(1)}>
                    <ArrowLeft className="m-2"/>
                    <label>ย้อนกลับ</label>
                </button>
                <button onClick={() => {alert("Saved"); setView(1);}}>บันทึกข้อมูล</button>
            </div>
            <div>
                <h4>ข้อมูลการยืนยันตัวตน</h4>
                <div>
                    <label>ชื่อประจำตัว</label>
                    <input type="text" readOnly></input>
                </div>
                <div>
                    <label>ชื่อผู้ใช้</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>รหัสผ่าน</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>บทบาท</label>
                    <ToggleBar type='vertical'>
                        <ToggleBarItem text='ผู้ใช้'/>
                        <ToggleBarItem text='ผู้จ้าง'/>
                        <ToggleBarItem text='ผู้ดูแลระบบ'/>
                        <ToggleBarItem text='ผู้ทดสอบ'/>
                        <ToggleBarItem text='ผู้พัฒนา'/>
                    </ToggleBar>
                </div>
                <div>
                    <label>สถานะ</label>
                    <ToggleBar type='vertical'>
                        <ToggleBarItem text='เปิดใช้งาน'/>
                        <ToggleBarItem text='ปิดใช้งาน'/>
                        <ToggleBarItem text='ถูกระงับ'/>
                    </ToggleBar>
                </div>
            </div>
            <div>
                <h4>ข้อมูลโปรไฟล์</h4>
            </div>
        </div>
    </div>

    function User ()
    {
        return 
    }
    function Table ()
    {
        const children = [];
        let index = 0;

        for (const key of Object.keys (auth.stateServer.access))
        {
            index += 1;

            const value = auth.stateServer.access[key];
            const name = value.name;
            const role = value.role == 1 ? "ผู้ใช้" :
                         value.role == 2 ? "ผู้จ้าง" :
                         value.role == 3 ? "ผู้ดูแล" :
                         value.role == 4 ? "ผู้ทดสอบ" :
                         value.role == 5 ? "ผู้พัฒนา" : "ไม่รู้จัก";

            const status = value.status == 1 ? "เปิดใช้งาน" :
                           value.status == 2 ? "ปิดใช้งาน" :
                           value.status == 3 ? "ถูกระงับ" : "ไม่รู้จัก";

            if (search != "")
            {
                if (name.toLowerCase().startsWith (search.toLowerCase()) == false && 
                    name.toLowerCase().includes (search.toLowerCase()) == false &&
                    key.toLowerCase().startsWith (search.toLowerCase()) == false &&
                    key.toLowerCase().includes (search.toLowerCase()) == false)
                    continue;
            }

            children.push (<tr key={index} onClick={() => setView(2)}>
                <td>{name}</td>
                <td>{role}</td>
                <td>{status}</td>
                <td>{key}</td>
            </tr>)
        }

        return <div>
            <table>
                <thead>
                    <tr>
                        <td>ชื่อ</td>
                        <td>บทบาท</td>
                        <td>สถานะ</td>
                        <td>รหัสเฉพาะ</td>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    }
}
function ContentTestAPI ()
{
    return <>
        <Header/> 
        <ContentAuth/>
        <ContentProfile/>
    </>

    function Header ()
    {
        return <div>
            <h1>ทดสอบระบบ API</h1>
            <hr/>
            <br/>
        </div>
    }
    function ContentAuth ()
    {
        const init              = String (auth.stateClient.init ? "กำลังทำงาน" : "ไม่ทำงาน");
        const session           = String (auth.stateClient.session);
        const sessionExpired    = String (auth.stateClient.sessionExpired == "null" ? "ไม่มีวันหมดอายุ" : auth.stateClient.sessionExpired);
        const access            = String (auth.stateClient.access);

        const name              = String (auth.stateClient.name);
        const role              = String (
            auth.stateClient.role == 0 ? "ROLE_UNKNOWN" :
            auth.stateClient.role == 1 ? "ROLE_USER" :
            auth.stateClient.role == 2 ? "ROLE_EMPLOYER" :
            auth.stateClient.role == 3 ? "ROLE_ADMIN" :
            auth.stateClient.role == 4 ? "ROLE_TESTER" :
            auth.stateClient.role == 5 ? "ROLE_DEVELOPER" : "<<Unknown>>"
        );
        const status            = String (
            auth.stateClient.status == 0 ? "STATUS_UNKNOWN" :
            auth.stateClient.status == 1 ? "STATUS_ACTIVE" :
            auth.stateClient.status == 2 ? "STATUS_INACTIVE" :
            auth.stateClient.status == 3 ? "STATUS_SUSPEND" : "<<Unknown>>"
        );

        return <div>
            <h3>ระบบยืนยันตัวตน</h3>
            <p>ระบบ: {init}</p>
            <p>รหัสเซสชั่น: {session}</p>
            <p>รหัสเซสชั่น หมดอายุ: {sessionExpired}</p>
            <p>รหัสเข้าถึง: {access}</p>
            <br/>
            <p>ชื่อ: {name}</p>
            <p>บทบาท: {role}</p>
            <p>สถานะ: {status}</p>
        </div>
    }
    function ContentProfile ()
    {
        const init = String (profile.stateClient.client.init ? "กำลังทำงาน" : "ไม่ทำงาน");
        let personal = "";
        let social = "";
        let job = "";
        let post = "";

        try { personal = JSON.stringify (profile.getPersonal ()); }
        catch (ex) { return String(ex); }

        try { social = JSON.stringify (profile.getSocial ()); }
        catch (ex) { return String(ex); }

        try { job = JSON.stringify (profile.getJob ()); }
        catch (ex) { return String(ex); }

        try { post = JSON.stringify (profile.getPost ()); }
        catch (ex) { return String(ex); }

        return <div>
            <h3>ระบบโปรไฟล์</h3>
            <p>ระบบ: {init}</p>
            <p>
                <span>ข้อมูลส่วนตัว:</span>
                <br/>
                <code>{personal}</code>
            </p>
            <p>
                <span>ข้อมูลสังคม:</span>
                <br/>
                <code>{social}</code>
            </p>
            <p>
                <span>ข้อมูลงาน:</span>
                <br/>
                <code>{job}</code>
            </p>
            <p>
                <span>ข้อมูลโพสต์:</span>
                <br/>
                <code>{post}</code>
            </p>
        </div>
    }
}
function ContentTestUI ()
{
    return <div>
        <div>
            <h1>ทดสอบระบบ UI</h1>
            <hr></hr>
        </div>
        <div>
            <div className="mb-4">
                <h3>พื้นหลัง</h3>
                <div style={{ border: '1px solid black', backgroundColor: 'black', position: 'relative', height: '512px', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: '0px 0px 0px 0px', width: '256px', height: '256px', backgroundColor: 'var(--bg-primary)'}}></div>
                    <div style={{ position: 'absolute', inset: '128px 0px 0px 128px', width: '256px', height: '256px', backgroundColor: 'var(--bg-secondary)'}}></div>
                </div>
            </div>
            <div className="mb-4">
                <h3>ข้อความ</h3>
                <hr/>
                <h1>หัวเรื่อง 1</h1>
                <h2>หัวเรื่อง 2</h2>
                <h3>หัวเรื่อง 3</h3>
                <h4>หัวเรื่อง 4</h4>
                <h5>หัวเรื่อง 5</h5>
                <h6>หัวเรื่อง 6</h6>
                <hr/>
                <p>สีเริ่มต้น</p>
                <p>สีลิงค์</p>
                <br/>
                <p>สีเขียว</p>
                <p>สีเหลือง</p>
                <p>สีแดง</p>
                <p>สีฟ้า</p>
                <hr/>
            </div>
            <div className="mb-4">
                <h3 className="pb-3">กล่องตัวเลือก</h3>
                <Checkbox name="ปกติ" description="คำอธิบาย"></Checkbox>
            </div>
            <div className="mb-4">
                <h3 className="pb-3">ปุ่มกด</h3>
                <button>เริ่มต้น</button>
                <button>ปกติ</button>
                <button>สีเขียว</button>
                <button>สีเหลือง</button>
                <button>สีแดง</button>
                <button>สีฟ้า</button>
            </div>
        </div>
    </div>
}