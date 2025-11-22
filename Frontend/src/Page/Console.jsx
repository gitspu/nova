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

const MENU_DASHBOARD            = 1;  /* เมนู แดชบอร์ด  */
const MENU_AUTHENTICATION       = 2;  /* เมนู ระบบยืนยันตัวตน */
const MENU_ACCOUNT              = 3;  /* เมนู บัญชี */
const MENU_ADVERTISEMENT        = 4;  /* เมนู โฆษณา */
const MENU_DEBUG_CLIENT_API     = 5;  /* เมนู ทดสอบ API */
const MENU_DEBUG_CLIENT_UI      = 6;  /* เมนู ทดสอบ UI */
const MENU_DEBUG_CLIENT_STORAGE = 7;  /* เมนู ทดสอบ LocalStorage ของผู้ใช้ */

/**
 * ส่วนประกอบสำหรับหน้าแดชบอร์ด
*/
const ViewDashboard = ({stateMenu}) =>
{
    const [menu] = stateMenu;

    /**
     * แสดงผลรายการในรูปแบบข้อความ
    */
    const Text = ({
        head = '' /** หัวข้อใหญ่ */, 
        value = '' /** ค่าของข้อมูล */,
    }) =>
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
      <div className={`dashboard ${menu == MENU_DASHBOARD ? 'd-block' : 'd-none'}`}>
        {/* หัวข้อ */}
        <header className='mb-2'>
          <h1 className='text-primary text-h1 text-bold'>แดชบอร์ด</h1>
          <p className='text-secondary'>ยินดีต้อนรับสู่หน้าต่างแผงควบคุมระบบ</p>
          <hr/>
        </header>
        <main>
          {/* ส่วน: สถิติวันนี้ */}
          <section>
            <h2 className='mb-2 text-primary text-h2'>สถิติวันนี้</h2>
            <span className='mb-2 element'>
              <Text head='จำนวนเข้าสู่ระบบ' value='1.1K'/>
              <Text head='จำนวนสมัครสมาชิก' value='678'/>
              <Text head='จำนวนโพสต์' value='490'/>
            </span>
          </section>
          {/* ส่วน: สถิติทั้งหมด */}
          <section>
            <h2 className='mb-2 text-primary text-h2'>สถิติทั้งหมด</h2>
            <div className='mb-2 element'>
              <Text head='จำนวนเข้าสู่ระบบ' value='11.5K'/>
              <Text head='จำนวนสมัครสมาชิก' value='1.6K'/>
              <Text head='จำนวนโพสต์' value='2.2K'/>
            </div>
          </section>
        </main>
      </div>
    );
}
const ViewAuthentication = ({stateMenu}) =>
{
    const [menu] = stateMenu;

    const mount = useRef (false);

    const config = useRef (new api.auth.DataConfig ());
    const configLast = useRef (new api.auth.DataConfig ());

    const [enableCreation, setEnableRegistration] = useState (false);
    const [enableDeletion, setEnableDeletion] = useState (false);
    const [enableLogin, setEnableLogin] = useState (false);
    const [modified, setModified] = useState (false);

    const onLoad = () =>
    {
        const block = config.current;

        if (block == null)
            return;

        setEnableRegistration (block.enableCreation);
        setEnableDeletion (block.enableDeletion);
        setEnableLogin (block.enableLogin);
    }
    const onSave = () =>
    {
        const block = config.current;

        if (block == null)
            return;

        block.enableCreation = enableCreation;
        block.enableDeletion = enableDeletion;
        block.enableLogin = enableLogin;

    }
    const onModified = () =>
    {
        if (config == null || configLast == null) return;
        if (config.current == null || configLast.current == null) return;

        const first = config.current;
        const second = configLast.current;

        const data = 
          (first.enableCreation !== second.enableCreation) ||
          (first.enableDeletion !== second.enableDeletion) ||
          (first.enableLogin !== second.enableLogin);

        setModified (data);
    }

    //
    // ทำงานแค่ครั้งเดียว (เมื่อหน้าเว็บถูกโหลด)
    //
    useEffect (() =>
    {
        if (mount.current)
            return;

        mount.current = true;
        config.current = api.auth.getConfig ();
        configLast.current = { ... config.current };

        onLoad ();

        return () => { mount.current = false; }
    },
    []);
    //
    // ทำงานทุกครั้งเมื่อ UI มีการเปลี่ยนแปลง
    //
    useEffect (() =>
    {
        if (mount.current == false)
            return;

        onSave ();
        onModified ();
    });

    return (
      <div className={`auth ${menu == MENU_AUTHENTICATION ? 'd-block' : 'd-none'}`}>
        <header>
          <h1 className='text-primary text-h1 text-bold'>การยืนยันตัวตน</h1>
          <p className='text-secondary'>ตั้งค่าเปิดหรือปิดใช้งานตัวเลือกการเข้าสู่ระบบในรูปแบบต่าง ๆ</p>
          <hr/>
        </header>
        <main>
          <Checkbox className='mb-2' state={[enableCreation, setEnableRegistration]} name='เปิดใช้งาน การสมัครบัญชี' description='อนุญาตให้ผู้ที่ต้องการสามารถสมัครสมาชิกเพื่อเข้าถึงแพลตฟอร์มได้'/>
          <Checkbox className='mb-2' state={[enableLogin, setEnableLogin]} name='เปิดใช้งาน การเข้าสู่ระบบ' description='อนุญาตให้ผู้ใช้ที่สมัครสมาชิกแล้วสามารถเข้าสู่ระบบแพลตฟอร์ม ผู้ดูแลระบบยังสามารถเข้าถึงแพลตฟอร์มได้แม้ว่าตั้งค่านี้จะถูกปิดใช้งาน'/>
          <Checkbox className='mb-2' state={[enableDeletion, setEnableDeletion]} name='เปิดใช้งาน การลบบัญชี' description='อนุญาตให้ผู้ใช้ที่สมัครสมาชิกแล้วสามารถลบบัญชีของตนเองได้'/>

          <div>
            <p className='text-warning'>คุณไม่ควรเปลี่ยนตั้งค่านี้ เว้นแต่ว่าจะจำเป็นจริง ๆ ถ้าต้องการโปรดระมัดระวัง</p>
            <button className='button-warning' disabled={!modified} onClick={onSave}>บันทึก</button>
          </div>
        </main>
      </div>
    );
}
const ViewAccount = ({stateMenu}) =>
{
    const [menu] = stateMenu;

    const mounted = useRef (false);
    const database = useRef ({
        key: [],
        keyInfo: []
    });
    
    const [increment, setIncrement] = useState (0);
    const [search, setSearch] = useState ('');
    const [showNew, setShowNew] = useState (false);
    const [showEdit, setShowEdit] = useState (false);
    const [showEditId, setShowEditId] = useState (NaN);

    const ModalNew = () =>
    {
        const [show, setShow] = [showNew, setShowNew];
        const [id, setId] = useState ('');
        const [username, setUsername] = useState ('');
        const [password, setPassword] = useState ('');
        const [role, setRole] = useState (0);

        const onSubmit = (event) =>
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        const onCancel = (event) =>
        {
            event.preventDefault ();
            event.stopPropagation ();

            setShow (false);
            setId ('');
            setUsername ('');
            setPassword ('');
            setRole (0);
        }

        return (
          <Modal show={show}>
            <Modal.Header>
              <h1 className='text-h1 text-bold'>เพิ่มบัญชี</h1>
              <p className='text-p'>กรุณาป้อนข้อมูลเบื้องต้น</p>
            </Modal.Header>
            <Modal.Body>
              <div className='mb-1'>
                <label className='mb-1 w-100'>รหัสประจำตัว</label>
                <input type='text' className="w-100 input" 
                       value={id} 
                       onChange={(event) => setId (event.target.value)}>
                </input>
              </div>
              <div className='mb-1'>
                <label className='mb-1 w-100'>ชื่อบัญชี</label>
                <input type='text' className="w-100 input" 
                       value={username} 
                       onChange={(event) => setUsername (event.target.value)}>
                </input>
              </div>
              <div className='mb-1'>
                <label className='mb-1 w-100'>รหัสผ่าน</label>
                <input type='password' className="w-100 input" 
                       value={password} 
                       onChange={(event) => setPassword (event.target.value)}>
                </input>
              </div>
              <div>
                <label className='mb-1 w-100'>บทบาท</label>
                <Menu direction='vertical' state={[role, setRole]}>
                  <Menu.Child state={api.auth.ROLE_USER} icon={icon.person} text='ผู้ใช้'/>
                  <Menu.Child state={api.auth.ROLE_EMPLOYER} icon={icon.people} text='ผู้จ้าง'/>
                  <Menu.Child state={api.auth.ROLE_ADMIN} icon={icon.newspaper} text='ผู้ดูแลระบบ'/>
                  <Menu.Condition state={api.auth.getRole () == api.auth.ROLE_DEVELOPER}>
                    <Menu.Child state={api.auth.ROLE_TESTER} icon={icon.fileEarmarkPlay} text='ผู้ทดสอบ'/>
                    <Menu.Child state={api.auth.ROLE_DEVELOPER} icon={icon.briefcase} text='ผู้พัฒนา'/>
                  </Menu.Condition>
                </Menu>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className='button-primary me-1' onClick={onSubmit}>เสร็จสิ้น</button>
              <button className='button-caution me-1' onClick={onCancel}>ยกเลิก</button>
            </Modal.Footer>
          </Modal>
        );
    }
    const ModalEdit = () =>
    {
        const EDIT_MENU_ACCOUNT = 1;
        const EDIT_MENU_PROFILE = 2;

        const [show, setShow] = [showEdit, setShowEdit];
        const [showId, setShowId] = [showEditId, setShowEditId];
        const [menu, setMenu] = useState (EDIT_MENU_ACCOUNT);

        const auth = api.auth;
        const profile = api.profile;
        const util = api.util;

        const authBasic = useRef (new auth.DataBasic ());
        const authSecurity = useRef (new auth.DataSecurity ());
        const authRestricted = useRef (new auth.DataRestricted ());

        const profileContact = useRef (new profile.DataContact ());
        const profileEducation = useRef (new profile.DataEducation ());
        const profileInterest = useRef (new profile.DataInterest ());
        const profileJob = useRef (new profile.DataJob ());
        // ข้ามข้อมูลโพสต์ (POST)
        const profilePersonal = useRef (new profile.DataPersonal ());
        const profileSkill = useRef (new profile.DataSkill ());
        const profileSocial = useRef (new profile.DataSocial ());
        const profileTheme = useRef (new profile.DataTheme ());

        const onDbLoad = () =>
        {
            authBasic.current         = util.ignore (() => auth.getBasic (showId));
            authSecurity.current      = util.ignore (() => auth.getSecurity (showId));
            authRestricted.current    = util.ignore (() => auth.getRestricted (showId));

            profileContact.current    = util.ignore (() => profile.getContact (showId));
            profileEducation.current  = util.ignore (() => profile.getEducation (showId));
            profileInterest.current   = util.ignore (() => profile.getInterest (showId));
            profileJob.current        = util.ignore (() => profile.getJob (showId));
            profilePersonal.current   = util.ignore (() => profile.getPersonal (showId));
            profileSkill.current      = util.ignore (() => profile.getSkill (showId));
            profileSocial.current     = util.ignore (() => profile.getSocial (showId));
            profileTheme.current      = util.ignore (() => profile.getTheme (showId));
        }
        const onDbSave = () =>
        {

        }

        const onSubmit = (event) =>
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        const onCancel = (event) =>
        {
            event.preventDefault ();
            event.stopPropagation ();

            setShow (false);
            setShowId (NaN);
            setMenu (EDIT_MENU_ACCOUNT);
        }

        useEffect (() =>
        {
            if (mounted.current == false)
                return;
            if (isNaN (showId))
                return;

            onDbLoad ();
        }, 
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [showId]);

        const MenuAccount = () =>
        {
            const [name, setName] = useState ('');
            const [password, setPassword] = useState ('');
            const [role, setRole] = useState (0);
            const [status, setStatus] = useState (0);

            useEffect (() =>
            {
                if (mounted.current == false)
                    return;
                if (isNaN (showId))
                    return;

                if (authBasic.current != null)
                {
                    const block = authBasic.current;

                    setName (block.name);
                }
                if (authSecurity.current != null)
                {
                    const block = authSecurity.current;

                    // setPassword (block.password);
                }
                if (authRestricted.current != null)
                {
                    const block = authRestricted.current;

                    setRole (block.role);
                    setStatus (block.status);
                }
            },
            []);

            return (
              <div className={menu == EDIT_MENU_ACCOUNT ? 'd-block' : 'd-none'}>
                <div className="d-flex gap-1">
                  <div className='mb-1'>
                    <label className='w-100 mb-1 text-label'>รหัสประจำตัว (อ่านเท่านั้น)</label>
                    <input className='w-100 mb-1 input' readOnly={true} value={''}></input>
                  </div>
                  <div className='mb-1'>
                    <label className='w-100 mb-1 text-label'>รหัสเข้าถึง (อ่านเท่านั้น)</label>
                    <input className='w-100 mb-1 input' readOnly={true} value={showId}></input>
                  </div>
                </div>
                <div className='mb-1'>
                  <label className='w-100 mb-1 text-label'>ชื่อบัญชี</label>
                  <input className='w-100 mb-1 input' value={name}></input>
                </div>
                <div className='mb-1'>
                  <label className='w-100 mb-1 text-label'>รหัสผ่าน</label>
                  <input className='w-100 mb-1 input' placeholder='(ช่องนี้อาจว่างเปล่าหากเข้าสู่ระบบด้วยแพลตฟอร์มอื่น)' value={password}></input>
                </div>
                <div className='mb-1'>
                  <label className='w-100 mb-1 text-label'>บทบาท</label>
                  <Menu direction='horizontal' state={[role, setRole]}>
                    <Menu.Child state={api.auth.ROLE_USER} icon={icon.person} text='ผู้ใช้'/>
                    <Menu.Child state={api.auth.ROLE_EMPLOYER} icon={icon.people} text='ผู้จ้าง'/>
                    <Menu.Child state={api.auth.ROLE_ADMIN} icon={icon.newspaper} text='ผู้ดูแลระบบ'/>
                    <Menu.Condition state={api.auth.getRole () == api.auth.ROLE_DEVELOPER}>
                      <Menu.Child state={api.auth.ROLE_TESTER} icon={icon.fileEarmarkPlay} text='ผู้ทดสอบ'/>
                      <Menu.Child state={api.auth.ROLE_DEVELOPER} icon={icon.briefcase} text='ผู้พัฒนา'/>
                    </Menu.Condition>
                  </Menu>
                </div>
                <div className='mb-1'>
                  <label className='w-100 mb-1 text-label'>สถานะ</label>
                  <Menu direction='horizontal' state={[status, setStatus]}>
                    <Menu.Child state={api.auth.STATUS_ACTIVE} icon={icon.unlock} text='เปิดใช้งาน'/>
                    <Menu.Child state={api.auth.STATUS_INACTIVE} icon={icon.x} text='ปิดใช้งาน'/>
                    <Menu.Child state={api.auth.STATUS_SUSPENDED} icon={icon.ban} text='ถูกระงับ'/>
                  </Menu>
                </div>
              </div>
            );
        }
        const MenuProfile = () =>
        {
            return (
              <div className={menu == EDIT_MENU_PROFILE ? 'd-block' : 'd-none'}>

              </div>
            );
        }

        return (
          <Modal show={show} style={{ width: '1024px', height: '768px' }}>
            <div className="w-100">
              <div className='mb-2 d-flex'>
                <div className="flex-grow-1">
                  <h1 className='text-h1 text-bold'>แก้ไขข้อมูลบัญชี</h1>
                </div>
                <div>
                  <button className='button-caution button-outlined' onClick={onCancel}>
                    <label>
                      <img src={icon.xCircle}/>
                    </label>
                  </button>
                </div>
              </div>
              <div className="mb-2">
                <Menu direction='horizontal' state={[menu, setMenu]} className='bd-primary br-2 p-1'>
                  <Menu.Child state={EDIT_MENU_ACCOUNT} icon={icon.unlock} text='บัญชี'/>
                  <Menu.Child state={EDIT_MENU_PROFILE} icon={icon.person} text='โปรไฟล์'/>
                </Menu>
              </div>
              <div>
                <MenuAccount/>
                <MenuProfile/>
              </div>
              <div>
                <hr/>
                <button className='button-primary' onClick={onSubmit}>บันทึก</button>
              </div>
            </div>
          </Modal>
        );
    }

    const onClickNew = (event) =>
    {
        event.preventDefault ();
        event.stopPropagation ();

        setShowNew (true);
    }
    const onClickRefresh = (event) =>
    {
        event.preventDefault ();
        event.stopPropagation ();

        onLoadData ();
        setSearch ('');
        setIncrement (increment + 1);
    }
    const onSearch = (event) =>
    {
        event.preventDefault ();
        event.stopPropagation ();

        setSearch (event.target.value);
    }
    const onSearchRender = () =>
    {
        const auth = api.auth;
        const key = database.current.key;
        const keyInfo = database.current.keyInfo;

        const onClick = (access = NaN) =>
        {
            setShowEditId (access);
            setShowEdit (true);
        }

        return keyInfo.map ((value, index) =>
        {
            let access = Number(key[index]);
            let username = String (value.name);

            if (search != "")
            {
                if (String(username).toLowerCase().startsWith (search.toLowerCase()) == false && 
                    String(username).toLowerCase().includes (search.toLowerCase()) == false &&
                    String(access).toLowerCase().startsWith (search.toLowerCase()) == false &&
                    String(access).toLowerCase().includes (search.toLowerCase()) == false)
                    return;
            }

            let role = 'ไม่รู้จัก';
            let status = 'ไม่ทราบ';

            switch (Number (value.role))
            {
                case auth.ROLE_USER:      role = 'ผู้ใช้'; break;
                case auth.ROLE_EMPLOYER:  role = 'องค์กร'; break;
                case auth.ROLE_ADMIN:     role = 'ผู้ดูแล'; break;
                case auth.ROLE_TESTER:    role = 'ผู้ทดสอบ'; break;
                case auth.ROLE_DEVELOPER: role = 'ผู้พัฒนา'; break;
            }
            switch (Number (value.status))
            {
                case auth.STATUS_ACTIVE:    status = 'เปิดใช้งาน'; break;
                case auth.STATUS_INACTIVE:  status = 'ปิดใช้งาน'; break;
                case auth.STATUS_SUSPENDED: status = 'ถูกระงับ'; break;
            }

            return (
              <tr key={index} onClick={() => onClick (access)}>
                <td>{username}</td>
                <td>{role}</td>
                <td>{role}</td>
                <td>{status}</td>
              </tr>
            );
        });
    }
    const onLoadData = () =>
    {
        const auth = api.auth;
        const key = auth.getAccessKeyList ();
        const keyInfo = [];

        for (const item of key) 
        {
            keyInfo.push (api.auth.getAccessKeyInfo (item));
        }
        database.current =
        {
            key: key,
            keyInfo: keyInfo
        };
    }

    //
    // ทำงานแค่ครั้งเดียว (เมื่อหน้าเว็บถูกโหลด)
    //
    useEffect (() =>
    {
        if (mounted.current)
            return;

        mounted.current = true;
        onLoadData ();

        return () => { mounted.current = false; }
    },
    []);

    return (
      <>
        <div className={`account ${menu == MENU_ACCOUNT ? 'd-block': 'd-none'}`}>
          <header>
            <h1 className='text-primary text-h1 text-bold'>บัญชี</h1>
            <p className='text-secondary'>จัดการข้อมูลต่าง ๆ ของบัญชีผู้ใช้ในระบบซึ่งรวมไปถึง ข้อมูลการยืนยันตัวตน, ข้อมูลโปรไฟล์, และอื่น ๆ ที่เจาะจงเกี่ยวกับข้อมูลผู้ใช้งาน</p>
          </header>
          <main>
            <section>
              <button className='button-primary me-1' onClick={onClickNew}>เพิ่มบัญชี</button>
              <button className='button-primary me-1' onClick={onClickRefresh}>โหลดข้อมูลใหม่</button>
            </section>
            <section>
              <input type='search' placeholder='ค้นหาบัญชีด้วย ชื่อ (บัญชี/โปรไฟล์) หรือ รหัสประจำตัว' className='w-100' 
                     autoFocus={true} autoComplete='off'
                     value={search} onChange={onSearch}>
              </input>
            </section>
            <section>
              <table className='table'>
                <thead>
                  <tr>
                    <td>ชื่อบัญชี</td>
                    <td>ชื่อโปรไฟล์</td>
                    <td>บทบาท</td>
                    <td>สถานะ</td>
                  </tr>
                </thead>
                <tbody key={increment}>
                  {onSearchRender ()}
                </tbody>
              </table>
            </section>
          </main>
        </div>
        <div className={`account-overlay ${menu == MENU_ACCOUNT ? 'd-block': 'd-none'}`}>
          <ModalNew/>
          <ModalEdit/>
        </div>
      </>
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

            {/* <ViewDebugClientAPI stateMenu={[menu, setMenu]}/> */}
            {/* <ViewDebugClientUI stateMenu={[menu, setMenu]}/> */}
            {/* <ViewDebugClientStorage stateMenu={[menu, setMenu]}/> */}
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