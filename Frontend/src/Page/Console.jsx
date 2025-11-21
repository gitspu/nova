/**
 * 
 * หน้าต่างผู้ดูแลระบบ (เรียกอีกกว่าหน้าต่าง Administrator)
 * 
*/
import { Activity, useEffect, useRef, useState } from "react"

import Checkbox from '../Component/Checkbox';
import NavBar   from '../Component/NavBar'
import Modal    from '../Component/Modal';
import Menu     from '../Component/MeunBar'
import Settings from '../Component/Settings'
import Error    from './Error'

import api      from '../Script/Api'
import nav      from '../Script/Navigator'
import icon     from '../Script/Icon'

import './Style/Console.css'
import { ROLE_UNKNOWN } from "../Script/Api/Auth";



const MENU_DASHBOARD            = 1;
const MENU_AUTHENTICATION       = 2;
const MENU_ACCOUNT              = 3;
const MENU_ADVERTISEMENT        = 4;
const MENU_DEBUG_CLIENT_API     = 5;
const MENU_DEBUG_CLIENT_UI      = 6;
const MENU_DEBUG_CLIENT_STORAGE = 7;

const ViewDashboard = ({stateMenu}) =>
{
    const [menu] = stateMenu;

    const Text = ({head, value}) =>
    {
        return (
          <div className='element-text'>
            <label className='text-secondary'>{head}</label>
            <hr/>
            <label className='text-primary'>{value}</label>
          </div>
        );
    }

    return (
      <Activity mode={menu == MENU_DASHBOARD ? 'visible' : 'hidden'}>
        <div className="dashboard">
          <div className='mb-2'>
            <h1 className='text-primary text-h1 text-bold'>แดชบอร์ด</h1>
            <p className='text-secondary'>ยินดีต้อนรับสู่หน้าต่างแผงควบคุมระบบ</p>
            <hr/>
          </div>
          <h2 className='mb-2 text-primary text-h2'>สถิติวันนี้</h2>
          <div className='mb-2 element'>
            <Text head='จำนวนเข้าสู่ระบบ' value='1.1K'/>
            <Text head='จำนวนสมัครสมาชิก' value='678'/>
            <Text head='จำนวนโพสต์' value='490'/>
          </div>  
          <h2 className='mb-2 text-primary text-h2'>สถิติทั้งหมด</h2>
          <div className='mb-2 element'>
            <Text head='จำนวนเข้าสู่ระบบ' value='11.5K'/>
            <Text head='จำนวนสมัครสมาชิก' value='1.6K'/>
            <Text head='จำนวนโพสต์' value='2.2K'/>
          </div>
        </div>
      </Activity>
    );
}
const ViewAuthentication = ({stateMenu}) =>
{
    const config = api.auth.getConfigInfo ();

    const [menu] = stateMenu;
    const [modified, setModified]   = useState (false);
    const [enableRegistration, setEnableRegistration] = useState (config.enableCreation);
    const [enableDeletion, setEnableDeletion] = useState (config.enableDeletion);
    const [enableLogin, setEnableLogin] = useState (config.enableLogin);

    return (
      <Activity mode={menu == MENU_AUTHENTICATION ? 'visible' : 'hidden'}>
        <div className='auth'>
           <div className='mb-2'>
            <h1 className='text-primary text-h1 text-bold'>การยืนยันตัวตน</h1>
            <p className='text-secondary'>ตั้งค่าเปิดหรือปิดใช้งานตัวเลือกการเข้าสู่ระบบในรูปแบบต่าง ๆ</p>
            <hr/>
          </div>
          <div>
            <Checkbox className='mb-2' onChange={() => setModified(true)} state={[enableRegistration, setEnableRegistration]} name='เปิดใช้งาน การสมัครบัญชี' description='อนุญาตให้ผู้ที่ต้องการสามารถสมัครสมาชิกเพื่อเข้าถึงแพลตฟอร์มได้'/>
            <Checkbox className='mb-2' onChange={() => setModified(true)} state={[enableLogin, setEnableLogin]} name='เปิดใช้งาน การเข้าสู่ระบบ' description='อนุญาตให้ผู้ใช้ที่สมัครสมาชิกแล้วสามารถเข้าสู่ระบบแพลตฟอร์ม ผู้ดูแลระบบยังสามารถเข้าถึงแพลตฟอร์มได้แม้ว่าตั้งค่านี้จะถูกปิดใช้งาน'/>
            <Checkbox className='mb-2' onChange={() => setModified(true)} state={[enableDeletion, setEnableDeletion]} name='เปิดใช้งาน การลบบัญชี' description='อนุญาตให้ผู้ใช้ที่สมัครสมาชิกแล้วสามารถลบบัญชีของตนเองได้'/>
          </div>
          <div>
            <p className='text-warning'>คุณไม่ควรเปลี่ยนตั้งค่านี้ เว้นแต่ว่าจะจำเป็นจริง ๆ ถ้าต้องการโปรดระมัดระวัง</p>
            <button className='button-warning' disabled={!modified}>บันทึก</button>
          </div>
        </div>
      </Activity>
    );
}
const ViewAccount = ({stateMenu}) =>
{
    const [menu] = stateMenu;
    const [search, setSearch] = useState ('');
    const [account, setAccount] = useState ([]);
    const network = useRef ({
        key: [],
        keyInfo: []
    });

    const [addShow, setAddShow] = useState (false);
    const [addId, setAddId] = useState ('');
    const [addName, setAddName] = useState ('');
    const [addPwd, setAddPwd] = useState ('');
    const [addRole, setAddRole] = useState (0);

    const EDIT_MENU_ACCOUNT = 1;
    const EDIT_MENU_PROFILE = 2;

    const [editShow, setEditShow] = useState (false);
    const [editMenu, setEditMenu] = useState (1);
    const [editRender, setEditRender] = useState (<></>);
    const editData = useRef ({
        authBasic: new api.auth.DataBasic (),
        authSecurity: new api.auth.DataSecurity (),
        authRestricted: new api.auth.DataRestricted (),

        profileContact: new api.profile.DataContact (),
        profileEducation: new api.profile.DataEducation (),
        profileInterest: new api.profile.DataInterest (),
    });


    const onAddShow = () =>
    {
        setAddShow (true);
        setAddId ('');
        setAddName ('');
        setAddPwd ('');
        setAddRole (api.auth.ROLE_USER);
    }
    const onAddHide = () =>
    {
        setAddShow (false);
    }
    const onAddSubmit = () =>
    {
        try
        {
            api.auth.create (addId, addPwd, false);

            refreshAccount ();
            renderAccount ();
            setAddShow (false);
        }
        catch (ex)
        {
            alert (ex);
        }
    }

    const refreshAccount = () => 
    {
        const newKey = api.auth.getAccessKeyList ();
        const newKeyInfo = [];

        for (const item of newKey) {
            newKeyInfo.push (api.auth.getAccessKeyInfo (item));
        }

        network.current = 
        {
            key: newKey,
            keyInfo: newKeyInfo
        };
    };
    const renderAccount = (filter) =>
    {
        if (filter == null)
            filter = search;

        const collectKey = network.current.key;
        const collectInfo = network.current.keyInfo;

        const children = collectInfo.map ((value, index) =>
        {
            const access = Number(collectKey[index]);
            const name = String(value.name);
            const role = Number(value.role) == 1 ? "ผู้ใช้" :
                         Number(value.role) == 2 ? "ผู้จ้าง" :
                         Number(value.role) == 3 ? "ผู้ดูแล" :
                         Number(value.role) == 4 ? "ผู้ทดสอบ" :
                         Number(value.role) == 5 ? "ผู้พัฒนา" : "ไม่รู้จัก";

            const status = Number(value.status) == 1 ? "เปิดใช้งาน" :
                           Number(value.status) == 2 ? "ปิดใช้งาน" :
                           Number(value.status) == 3 ? "ถูกระงับ" : "ไม่รู้จัก";

            if (filter != "")
            {
                if (String(name).toLowerCase().startsWith (filter.toLowerCase()) == false && 
                    String(name).toLowerCase().includes (filter.toLowerCase()) == false &&
                    String(access).toLowerCase().startsWith (filter.toLowerCase()) == false &&
                    String(access).toLowerCase().includes (filter.toLowerCase()) == false)
                    return;
            }
            return (
              <tr key={index} onClick={() => onEditShow(access)}>
                <td>{name}</td>
                <td>{role}</td>
                <td>{role}</td>
                <td>{status}</td>
              </tr>
            );
        });
        setAccount (children);
    }

    const onEditShow = (access) =>
    {
        setEditShow (true);
        setEditMenu (EDIT_MENU_ACCOUNT);

        try
        {
            refreshEdit (access);
            renderEdit ();
        }
        catch (ex)
        {
            console.error (ex);
            alert (ex);

            setEditShow (false);
        }
    }
    const onEditHide = () =>
    {
        setEditShow (false);
    }
    const onEditSubmit = () =>
    {
      
    }
    const refreshEdit = (access) =>
    {
        // ดูข้อมูล
        let authBasic = new api.auth.DataBasic ();
        let authSecurity = new api.auth.DataSecurity ();
        let authRestricted = new api.auth.DataRestricted ();

        let profileContact = new api.profile.DataContact ();
        let profileEducation = new api.profile.DataEducation ();
        let profileInterest = new api.profile.DataInterest ();
        let profilePersonal = new api.profile.DataPersonal ();

        authBasic = api.auth.getBasic (access);
        authSecurity = api.auth.getSecurity (access);
        authRestricted = api.auth.getRestricted (access);

        try { profileContact = api.profile.getContact (access); } catch { profileContact = undefined; }
        try { profileEducation = api.profile.getEducation (access); } catch { profileEducation = undefined; }
        try { profileInterest = api.profile.getEducation (access); } catch { profileInterest = undefined; }
        try { profilePersonal = api.profile.getPersonal (access); } catch { profileInterest = undefined; }

        editData.current.authBasic = authBasic;
        editData.current.authSecurity = authSecurity;
        editData.current.authRestricted = authRestricted;

        editData.current.profileContact = profileContact;
        editData.current.profileEducation = profileEducation;
        editData.current.profileInterest = profileInterest;
        editData.current.profilePersonal = profilePersonal;
    }
    const renderEdit = (currentMenu = editMenu) =>
    {
        const basic = editData.current.authBasic;
        const contact = editData.current.profileContact;
        const personal = editData.current.profilePersonal;
        const interaction = (
          <>
            <Activity mode={currentMenu == EDIT_MENU_ACCOUNT ? 'visible' : 'hidden'}>
              <div className="d-flex gap-1">
                <div className='mb-1'>
                  <label className='w-100 mb-1 text-label'>รหัสประจำตัว (อ่านเท่านั้น)</label>
                  <input className='w-100 mb-1 input' readOnly={true} value={''}></input>
                </div>
                <div className='mb-1'>
                  <label className='w-100 mb-1 text-label'>รหัสเข้าถึง (อ่านเท่านั้น)</label>
                  <input className='w-100 mb-1 input' readOnly={true} value={''}></input>
                </div>
              </div>
              <div className='mb-1'>
                <label className='w-100 mb-1 text-label'>ชื่อบัญชี</label>
                <input className='w-100 mb-1 input' value={basic.name}></input>
              </div>
              <div className='mb-1'>
                <label className='w-100 mb-1 text-label'>รหัสผ่าน</label>
                <input className='w-100 mb-1 input'></input>
              </div>
              <div className='mb-1'>
                <label className='w-100 mb-1 text-label'>บทบาท</label>
                <input className='w-100 mb-1 input'></input>
              </div>
              <div className='mb-1'>
                <label className='w-100 mb-1 text-label'>สถานะ</label>
                <input className='w-100 mb-1 input'></input>
              </div>
            </Activity>
            <Activity mode={currentMenu == EDIT_MENU_PROFILE ? 'visible' : 'hidden'}>
              {contact == undefined ? <p className="text-p text-italic">(บัญชีนี้ไม่มีข้อมูลโปรไฟล์)</p> : <></>}
              <Settings.ProfilePersonal ref={personal}/>
            </Activity>
          </>
        );
        console.log (editMenu);

        setEditRender (interaction);
    }

    useEffect (() =>
    {
        refreshAccount ();
        renderAccount ();
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);


    return (
      <Activity mode={menu == MENU_ACCOUNT ? 'visible' : 'hidden'}>
        <div className='account'>
          <div className='mb-2'>
            <h1 className='text-primary text-h1 text-bold'>บัญชี</h1>
            <p className='text-secondary'>จัดการข้อมูลต่าง ๆ ของบัญชีผู้ใช้ในระบบซึ่งรวมไปถึง ข้อมูลการยืนยันตัวตน, ข้อมูลโปรไฟล์, และอื่น ๆ ที่เจาะจงเกี่ยวกับข้อมูลผู้ใช้งาน</p>
            <hr/>
          </div>
          <div className='mb-2'>
            <button className='button-primary me-1' onClick={onAddShow}>เพิ่มบัญชี</button>
            <button className='button-primary me-1' onClick={() => {refreshAccount(); renderAccount(); }}>โหลดข้อมูลใหม่</button>
          </div>
          <div className='mb-2'>
            <input type='search' placeholder='ค้นหาบัญชีด้วย ชื่อ (บัญชี/โปรไฟล์) หรือ รหัสประจำตัว' className='w-100' value={search} onChange={(event) => { setSearch (event.target.value); renderAccount (event.target.value); }}/>
          </div>
          <div>
            <table className='table'>
              <thead>
                <tr>
                  <td>ชื่อบัญชี</td>
                  <td>ชื่อโปรไฟล์</td>
                  <td>บทบาท</td>
                  <td>สถานะ</td>
                </tr>
              </thead>
              <tbody>
                {account}
              </tbody>
            </table>
          </div>
        </div>
        <div className="account-overlay">
          <Modal show={addShow}>
            <div className='mb-3'>
              <h1 className='text-h1 text-bold'>เพิ่มบัญชี</h1>
              <p className='text-p'>กรุณาป้อนข้อมูลเบื้องต้น</p>
              <div className='mb-1'>
                <label className='mb-1 w-100'>รหัสประจำตัว</label>
                <input type='text' className="w-100 input" value={addId} onChange={(e) => setAddId(e.target.value)}/>
              </div>
              <div className='mb-1'>
                <label className='mb-1 w-100'>ชื่อบัญชี</label>
                <input type='text' className="w-100 input" value={addName} onChange={(e) => setAddName(e.target.value)}/>
              </div>
              <div className='mb-1'>
                <label className='mb-1 w-100'>รหัสผ่าน</label>
                <input type='password' className="w-100 input" value={addPwd} onChange={(e) => setAddPwd(e.target.value)} autoComplete="off"/>
              </div>
              <div>
                <label className='mb-1 w-100'>บทบาท</label>
                <Menu direction='vertical' state={[addRole, setAddRole]}>
                  <Menu.Child state={api.auth.ROLE_USER} icon={icon.person} text='ผู้ใช้'/>
                  <Menu.Child state={api.auth.ROLE_EMPLOYER} icon={icon.people} text='ผู้จ้าง'/>
                  <Menu.Child state={api.auth.ROLE_ADMIN} icon={icon.newspaper} text='ผู้ดูแลระบบ'/>
                  <Menu.Condition state={api.auth.getRole () == api.auth.ROLE_DEVELOPER}>
                    <Menu.Child state={api.auth.ROLE_TESTER} icon={icon.fileEarmarkPlay} text='ผู้ทดสอบ'/>
                    <Menu.Child state={api.auth.ROLE_DEVELOPER} icon={icon.briefcase} text='ผู้พัฒนา'/>
                  </Menu.Condition>
                </Menu>
              </div>
            </div>
            <div>
              <button className='button-primary me-1' onClick={onAddSubmit}>เสร็จสิ้น</button>
              <button className='button-caution me-1' onClick={onAddHide}>ยกเลิก</button>
            </div>
          </Modal>
          <Modal show={editShow}>
            <div className="w-100">
              <div className='mb-2 d-flex'>
                <div className="flex-grow-1">
                  <h1 className='text-h1 text-bold'>แก้ไขข้อมูลบัญชี</h1>
                  {/* <p className='text-p'>กรุณาป้อนข้อมูลเบื้องต้น</p> */}
                </div>
                <div>
                  <button className='button-caution button-outlined' onClick={() => onEditHide()}>
                    <label>
                      <img src={icon.xCircle}/>
                    </label>
                  </button>
                </div>
              </div>
              <div className="mb-2">
                <Menu direction='horizontal' state={[editMenu, setEditMenu]} className='bd-primary br-2 p-1'>
                  <Menu.Child state={EDIT_MENU_ACCOUNT} icon={icon.unlock} text='บัญชี' onClick={() => renderEdit(EDIT_MENU_ACCOUNT)}/>
                  <Menu.Child state={EDIT_MENU_PROFILE} icon={icon.person} text='โปรไฟล์' onClick={() => renderEdit(EDIT_MENU_PROFILE)}/>
                </Menu>
              </div>
              <div>
                {editRender}
              </div>
              <div>
                <hr/>
                <button className='button-primary' onClick={() => onEditSubmit()}>บันทึก</button>
              </div>
            </div>
          </Modal>
        </div>
      </Activity>
    );
}
const ViewAdvertisement = ({stateMenu}) =>
{
    const [menu] = stateMenu;
    const [search, setSearch] = useState ('');

    return (
      <Activity mode={menu == MENU_ADVERTISEMENT ? 'visible' : 'hidden'}>
        <div className='advertisement'>
           <div className='mb-2'>
            <h1 className='text-primary text-h1 text-bold'>โฆษณา</h1>
            <p className='text-secondary'>จัดการวิธีการแสดงผล เพิ่มและลบข้อมูลต่าง ๆ ที่เกี่ยวข้องการโฆษณา</p>
            <hr/>
            <div className="mb-2">
              <button className='button-primary me-1'>เพิ่มโฆษณา</button>
              <button className='button-primary me-1'>โหลดข้อมูลใหม่</button>
            </div>
            <div className='mb-2'>
              <input type='search' placeholder='ค้นหาโฆษณาโดย ชื่อ/คำอธิบาย หรือ รหัสเฉพาะ' className='w-100' value={search} onChange={(event) => { setSearch (event.target.value); }}/>
            </div>
          </div>
        </div>
      </Activity>
    );
}
const ViewDebugClientAPI = ({stateMenu}) =>
{
    const [menu] = stateMenu;

    const SectionAuth = () =>
    {
        const util = api.util;
        const state = api.auth.state;

        const init              = util.ignore (() => String (state.init ? 'กำลังทำงาน' : 'ไม่ทำงาน'), 'ไม่ทราบ');
        const session           = util.ignore (() => String (state.session));
        const sessionExpired    = util.ignore (() => String (state.sessionExpired != null ?
                                                             isFinite (state.sessionExpired.getDate ()) ? state.sessionExpired.toLocaleString () :
                                                             'ไม่มีวันหมดอายุ' : 'ไม่มีข้อมูล'), 'ไม่ทราบ');

        const access            = util.ignore (() => String (state.access));
        const name              = String (state.name);
        const role              = String (
            state.role == 0 ? "ROLE_UNKNOWN" :
            state.role == 1 ? "ROLE_USER" :
            state.role == 2 ? "ROLE_EMPLOYER" :
            state.role == 3 ? "ROLE_ADMIN" :
            state.role == 4 ? "ROLE_TESTER" :
            state.role == 5 ? "ROLE_DEVELOPER" : "<<Unknown>>"
        );
        const status            = String (
            state.status == 0 ? "STATUS_UNKNOWN" :
            state.status == 1 ? "STATUS_ACTIVE" :
            state.status == 2 ? "STATUS_INACTIVE" :
            state.status == 3 ? "STATUS_SUSPEND" : "<<Unknown>>"
        );
      
        return (
          <div className='mb-2'>
            <h2 className='text-primary text-h2 text-bold'>ระบบยืนยันตัวตน</h2>
            <div>
              <p className='text-p m-0'>ระบบ: {init}</p>
              <p className='text-p m-0'>รหัสเซสชั่น: {session}</p>
              <p className='text-p m-0'>รหัสเซสชั่น หมดอายุ: {sessionExpired}</p>
              <p className='text-p m-0'>รหัสเข้าถึง: {access}</p>
              <b className='text-p m-0'r/>
              <p className='text-p m-0'>ชื่อ: {name}</p>
              <p className='text-p m-0'>บทบาท: {role}</p>
              <p className='text-p m-0'>สถานะ: {status}</p>
            </div>
          </div>
        );
    }
    const SectionProfile = () =>
    {
        const state = api.profile.state;
        const profile = api.profile;
        const util = api.util;

        const init = String (state.init ? "กำลังทำงาน" : "ไม่ทำงาน");
    
        const contact     = util.ignore (() => JSON.stringify (profile.getContact ()), 'ไม่ทราบ');
        const education   = util.ignore (() => JSON.stringify (profile.getEducation ()), 'ไม่ทราบ');
        const interest    = util.ignore (() => JSON.stringify (profile.getInterest ()), 'ไม่ทราบ');
        const personal    = util.ignore (() => JSON.stringify (profile.getPersonal ()), 'ไม่ทราบ');
        const skill       = util.ignore (() => JSON.stringify (profile.getSkill ()), 'ไม่ทราบ');
        const social      = util.ignore (() => JSON.stringify (profile.getSocial ()), 'ไม่ทราบ');
        const job         = util.ignore (() => JSON.stringify (profile.getJob ()), 'ไม่ทราบ');
        const post        = util.ignore (() => JSON.stringify (profile.getPost ()), 'ไม่ทราบ');

        return (
          <div>
            <h2 className='text-h2 text-bold'>ระบบโปรไฟล์</h2>
            <div>
              <p>ระบบ: {init}</p>
            </div>

            <p>
              <span>ข้อมูลติดต่อ:</span>
              <br/>
              <code>{contact}</code>
            </p>
            <p>
              <span>ข้อมูลการศึกษา:</span>
              <br/>
              <code>{education}</code>
            </p>
            <p>
              <span>ข้อมูลความสนใจ:</span>
              <br/>
              <code>{interest}</code>
            </p>
            <p>
              <span>ข้อมูลงาน:</span>
              <br/>
              <code>{job}</code>
            </p>
            <p>
              <span>ข้อมูลส่วนตัว:</span>
              <br/>
              <code>{personal}</code>
            </p>
            <p>
              <span>ข้อมูลทักษะ:</span>
              <br/>
              <code>{skill}</code>
            </p>
            <p>
              <span>ข้อมูลสังคม:</span>
              <br/>
              <code>{social}</code>
            </p>
            <p>
              <span>ข้อมูลโพสต์:</span>
              <br/>
              <code>{post}</code>
            </p>
          </div>
        );
    }

    return (
      <Activity mode={menu == MENU_DEBUG_CLIENT_API ? 'visible' : 'hidden'}>
        <div>
          <div className='mb-2'>
            <h1 className='text-primary text-h1 text-bold'>ดีบัค API</h1>
            <p className='text-secondary'>สังเกต และ ทดสอบการทำงานของระบบ API</p>
            <hr/>
          </div>
          <div>
            <SectionAuth/>
            <SectionProfile/>
          </div>
        </div>
      </Activity>
    );
}
const ViewDebugClientUI = ({stateMenu}) =>
{
    const [menu] = stateMenu;

    return (
      <Activity mode={menu == MENU_DEBUG_CLIENT_UI ? 'visible' : 'hidden'}>
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
            <h1 className="text-h1">หัวเรื่อง 1</h1>
            <h2 className="text-h2">หัวเรื่อง 2</h2>
            <h3 className="text-h3">หัวเรื่อง 3</h3>
            <h4 className="text-h4">หัวเรื่อง 4</h4>
            <h5 className="text-h5">หัวเรื่อง 5</h5>
            <h6 className="text-h6">หัวเรื่อง 6</h6>
            <hr/>
        </div>
        <div className="mb-4">
            <h3>ข้อความลิงค์</h3>
            <hr/>
            <a href="#" className="me-4 text-a">พลวัต</a>
            <a href="#" className="me-4 text-a">ปกติ</a>
            <a href="#" className="me-4 text-a">วาง</a>
            <a href="#" className="me-4 text-a">ทำงาน</a>
            <a href="#" className="me-4 text-a" disabled={true}>ปิดใช้งาน</a>
            <hr/>
        </div>
        <div className="mb-4">
            <p>สีเริ่มต้น</p>
            <p className="text-normal">สีปกติ</p>
            <p className="text-link">สีลิงค์</p>
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
            <Checkbox name="ทำงาน" description="คำอธิบาย" state={[true, null]}></Checkbox>
        </div>
        <div className="mb-4">
            <h3 className="pb-3">ปุ่มกด</h3>
            <button className="me-1">เริ่มต้น</button>
            <button className="me-1">ปกติ</button>
            <button className="me-1">สีเขียว</button>
            <button className="me-1">สีเหลือง</button>
            <button className="me-1">สีแดง</button>
            <button className="me-1">สีฟ้า</button>
            <button className="me-1 button-normal" disabled={true}>ปิดใช้งาน</button>
        </div>
      </Activity>
    );
}
const ViewDebugClientStorage = ({stateMenu}) =>
{
    const [menu] = stateMenu;

    return (
      <Activity mode={menu == MENU_DEBUG_CLIENT_UI ? 'visible' : 'hidden'}>
      </Activity>
    );
}

const RootNav = ({stateSelector, stateContext }) =>
{
    const [selector, setSelector] = stateSelector;
    const [context, setContext] = stateContext;

    const onLogout = () =>
    {
        try { api.auth.logout (); }
        finally { nav.auth ('/', '/'); }
    }

    return (
      <div className='navbar'>
        <NavBar>
          <NavBar.Flex grow={1} justify='start'>
            <NavBar.Branding text="NOVA แผงควบคุมระบบ"/>
          </NavBar.Flex>
          <NavBar.Flex>
            <NavBar.Menu onClick={() => setSelector (!selector)}/>
            <NavBar.Profile onClick={() => setContext (!context)}/>
            <NavBar.ContextMenu className={context ? 'd-block': 'd-none'}>
              <button className='button-caution' onClick={onLogout}>ออกจากระบบ</button>
            </NavBar.ContextMenu>
          </NavBar.Flex>
        </NavBar>
      </div>
    );
}
const Root = () =>
{
    //                                 //
    // ------------------------------- //
    //              STATE              //
    // ------------------------------- //
    //                                 //
    const accessible = api.auth.isLogged () && [
        api.auth.ROLE_ADMIN, 
        api.auth.ROLE_TESTER, 
        api.auth.ROLE_DEVELOPER
    ].indexOf (api.auth.getRole()) != -1;

    const [menu, setMenu] = useState (MENU_DASHBOARD);
    const [selector, setSelector] = useState (true);
    const [context, setContext] = useState (false);

    //                                 //
    // ------------------------------- //
    //              EFFECT             //
    // ------------------------------- //
    //                                 //
    useEffect (() => 
    {
        if (accessible == false) {
            return;
        }
        document.title = "NOVA Console";  
    }, 
    [accessible]);


    //                                 //
    // ------------------------------- //
    //           RENDERING             //
    // ------------------------------- //
    //                                 //
    if (accessible == false) 
        return (<Error/>);

    return (
      <div className='page-console'>
        <RootNav 
          stateSelector={[selector, setSelector]} 
          stateContext={[context, setContext]}/>
        <div className='body'>
          <div className='content'>
            <ViewDashboard stateMenu={[menu, setMenu]}/>
            <ViewAuthentication stateMenu={[menu, setMenu]}/>
            <ViewAccount stateMenu={[menu, setMenu]}/>
            <ViewAdvertisement stateMenu={[menu, setMenu]}/>

            <ViewDebugClientAPI stateMenu={[menu, setMenu]}/>
            <ViewDebugClientUI stateMenu={[menu, setMenu]}/>
            <ViewDebugClientStorage stateMenu={[menu, setMenu]}/>
          </div>
          <div className='menu'>
            <div className='pivot'>
              <Menu direction='vertical' className='bd-primary br-2 p-1' state={[menu, setMenu]}>
                <Menu.Child state={MENU_DASHBOARD} icon={icon.house} text='แดชบอร์ด'/>
                <Menu.Child state={MENU_AUTHENTICATION} icon={icon.unlock} text='การยืนยันตัวตน'/>
                <Menu.Child state={MENU_ACCOUNT} icon={icon.person} text='บัญชี'/>
                <Menu.Child state={MENU_ADVERTISEMENT} icon={icon.send} text='โฆษณา'/>
                <Menu.Condition state={api.auth.getRole () == api.auth.ROLE_TESTER || api.auth.getRole () == api.auth.ROLE_DEVELOPER}>
                    <Menu.Separator/>
                    <Menu.Child state={MENU_DEBUG_CLIENT_API} icon={icon.fileEarmarkPlay} text='ดีบัค API'/>
                    <Menu.Child state={MENU_DEBUG_CLIENT_UI} icon={icon.chat} text='ดีบัค UI'/>
                    <Menu.Child state={MENU_DEBUG_CLIENT_STORAGE} icon={icon.sticky} text='ดีบัค Storage'/>
                </Menu.Condition>
              </Menu>
            </div>
          </div>
        </div>
        <div className='overlay'>
        </div>
      </div>
    )
}
export default Root;