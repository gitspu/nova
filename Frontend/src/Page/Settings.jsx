import { useEffect, useState } from 'react'

import api        from './../Script/Api'
import icon       from './../Script/Icon'
import navigator  from './../Script/Navigator'

import Menu       from '../Component/MeunBar'
import VisOpt     from '../Component/VisOpt'

import './Style/Settings.css'

export function Settings ({inset = '0px 0px 0px 0px'})
{
    const [category, setCategory] = useState (1);

    return <div className="page-settings" style={{ inset: inset }}>
      <div className="content pt-4">
        {category == 1 ? <CategoryAccount/> : <></>}
        {category == 2 ? <CategoryProfile/> : <></>}
      </div>
      <div className="menu pt-4">
        <div>
          <Menu direction='vertical' state={[category, setCategory]}>
            <Menu.Child state={1} icon={icon.person} text='บัญชี'/>
            <Menu.Child state={2} icon={icon.briefcase} text='โปรไฟล์'/>
          </Menu>
        </div>
      </div>
    </div>   
}
export function CategoryAccount ()
{
    const auth = api.auth;
    const [name, setName] = useState ("");

    useEffect (() =>
    {
        doLoad ();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    return <>
      <div className='w-100 mb-4'>
        <h1>บัญชี</h1>
        <p>ตั้งค่าข้อมูลพื้นฐาน และความปลอดภัย</p>
      </div>
      <div className='w-100 mb-1 input-text'>
        <label>ชื่อ</label>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
      </div>
      <div className='w100 mb-5 input-text'>
        <label>รหัสผ่าน</label>
        <button>ตั้งค่าใหม่</button>
      </div>
      <div className='w-100 mb-5'>
        <button onClick={(event) => doLogout(event)}>ออกจากระบบ</button>
      </div>
      <div className='w-100 mb-5'>
        <button className='me-2' onClick={(event) => doDisable(event)}>ปิดใช้งาน</button>
        <button className='me-2' onClick={(event) => doDelete(event)}>ลบบัญชี</button>
      </div>
    </>

    function doLoad ()
    {
        const basic = auth.getBasic ();

        setName (basic.name);
    }
    function doLogout (event)
    {
        event.preventDefault ();

        try { auth.logout (); }
        catch (ex) { console.error (ex); }

        navigator.auth ("/", "/");
    }
    function doDisable (event)
    {
        event.preventDefault ();
    }
    function doDelete (event)
    {
        event.preventDefault ();
    }
}
export function CategoryProfile ()
{
    const profile = api.profile;

    return <>
      <h1>โปรไฟล์</h1>
      <p>ปรับแต่งข้อมูล ความสวยงาม</p>
      
      <SectionTheme/>
      <SectionPersonal/>
      <SectionContact/>
    </>

    function SectionTheme ()
    {
        return <>
          <div>
            <h2 className='mt-4 mb-4'>ธีม</h2>
          </div>
          <div>
            <label>สี</label>
            <input type='color'></input>
          </div>
        </>
    }

    function SectionPersonal ()
    {      
        const [icon,        setIcon]        = useState (null); 
        const [background,  setBackground]  = useState (null);

        const [nickname,    setNickname]    = useState ("");
        const [nicknameVis, setNicknameVis] = useState (0);

        const [firstName,   setFirstName]   = useState ("");
        const [firstNameVis, setFirstNameVis] = useState (0);

        const [middleName,  setMiddleName]  = useState ("");
        const [middleNameVis, setMiddleNameVis] = useState (0);

        const [lastName,    setLastName]    = useState ("");
        const [lastNameVis, setLastNameVis] = useState (0);

        const [status,      setStatus]      = useState ("");
        const [statusVis,   setStatusVis]   = useState (0);

        const [bio,         setBio]         = useState ("");
        const [bioVis,      setBioVis]      = useState (0);

        const [location,    setLocation]    = useState ("");
        const [locationVis, setLocationVis] = useState (0);

        const [birthday,    setBirthday]    = useState ("");
        const [birthdayVis, setBirthdayVis] = useState (0);

        useEffect (() =>
        {
            doLoad ();
        }, 
        []);

        return <>
        <div>
          <h2 className='mt-4 mb-4'>ข้อมูลส่วนตัว</h2>
          <div className='w-100 mb-4 input-image-profile'>
            <img src={background} alt="" width='100%' height='100%'/>
            <img src={icon} alt="" width='128px' height='128px'/>
          </div>
          <div className='w-100 mb-4 input-image-profile-upload'>
              <input id='upload-icon' type='file' accept='image/*' className='d-none' onChange={(e) => onChangeIcon (e)}/>
              <input id='upload-background' type='file' accept='image/*' className='d-none' onChange={(e) => onChangeBackground (e)}/>
              <button className='button-primary'>
                <label htmlFor='upload-icon'>เปลี่ยนรูปโปรไฟล์</label>
              </button>
              <button className='button-primary'>
                <label htmlFor='upload-background'>เปลี่ยนรูปพื้นหลัง</label>
              </button>
          </div>

          <div className='w-100 mb-4 input-text'>
            <label>ชื่อเล่น</label>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
            <VisOpt state={[nicknameVis, setNicknameVis]}/>
          </div>
          <div className='w-100 mb-1 input-text'>
            <label>ชื่อจริง</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
            <VisOpt state={[firstNameVis, setFirstNameVis]}/>
          </div>
          <div className='w-100 mb-1 input-text'>
            <label>ชื่อกลาง</label>
            <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)}></input>
            <VisOpt state={[middleNameVis, setMiddleNameVis]}/>
          </div>
          <div className='w-100 mb-4 input-text'>
            <label>นามสกุล</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
            <VisOpt state={[lastNameVis, setLastNameVis]}/>
          </div>

          <div className='w-100 mb-1 input-text'>
            <label>สถานะ</label>
            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}></input>
            <VisOpt state={[statusVis, setStatusVis]}/>
          </div>
          <div className='w-100 mb-1 input-text'>
            <label>แนะนำตัว</label>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)}></input>
            <VisOpt state={[bioVis, setBioVis]}/>
          </div>
          <div className='w-100 mb-1 input-text'>
            <label>ที่อยู่</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}></input>
            <VisOpt state={[locationVis, setLocationVis]}/>
          </div>
          <div className='w-100 mb-1 input-text'>
            <label>วันเกิด</label>
            <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)}></input>
            <VisOpt state={[birthdayVis, setBirthdayVis]}/>
          </div>
        </div>
        </> 

        function doLoad ()
        {
            const block = profile.getPersonal ();
            
            setIcon (api.decodeContent (block.icon));
            setBackground (api.decodeContent (block.background));

            setNickname (block.nickname.value);
            setNicknameVis (block.nickname.visibility);

            setFirstName (block.firstName.value);
            setFirstNameVis (block.firstName.visibility);

            setMiddleName (block.middleName.value);
            setMiddleNameVis (block.middleName.visibility);

            setLastName (block.lastName.value);
            setLastNameVis (block.lastName.visibility);

            setStatus (block.status.value);
            setStatusVis (block.status.visibility);

            setBio (block.bio.value);
            setBioVis (block.bio.visibility);

            setLocation (block.location.value);
            setLocationVis (block.location.visibility);

            setBirthday (`${block.birthday.value.getFullYear()}-${String(block.birthday.value.getMonth()).padStart(2, '0')}-${String(block.birthday.value.getDate()).padStart(2, '0')}`);
            setBirthdayVis (block.birthday.visibility);
        }
        function doSave ()
        {

        }

        function onChangeIcon (e)
        {
            e.preventDefault ();

            const target = e.target;
            const file = target.files[0];

            if (file == null) { return; }

            var reader = new FileReader ();
            
            reader.onloadend = function ()
            {
              setIcon (reader.result);
            }
            reader.readAsDataURL (file);
        }
        function onChangeBackground (e)
        {
            e.preventDefault ();

            const target = e.target;
            const file = target.files[0];

            if (file == null) { return; }

            var reader = new FileReader ();
            
            reader.onloadend = function ()
            {
              setBackground (reader.result);
            }
            reader.readAsDataURL (file);
        }
    }
    function SectionContact ()
    {
        const [email,      setEmail]      = useState ("");
        const [emailVis,   setEmailVis]   = useState (0);
        const [website,    setWebsite]    = useState ("");        
        const [websiteVis, setWebsiteVis] = useState (0);
        const [phone,      setPhone]      = useState ("");
        const [phoneVis,   setPhoneVis]   = useState (0);

        useEffect (() => { doLoad(); }, []);

        return <>
          <div>
            <h2 className='mt-4 mb-4'>ข้อมูลติดต่อ</h2>
            <div className='w-100 mb-1 input-text'>
              <label>อีเมล</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              <VisOpt state={[emailVis, setEmailVis]}/>
            </div>
            <div className='w-100 mb-1 input-text'>
              <label>เว็บไซต์</label>
              <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)}></input>
              <VisOpt state={[websiteVis, setWebsiteVis]}/>
            </div>
            <div className='w-100 mb-1 input-text'>
              <label>เบอร์โทรศัพท์</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
              <VisOpt state={[phoneVis, setPhoneVis]}/>
            </div>
          </div>
        </>

        function doLoad ()
        {
            const block = profile.getContact ();

            setEmail (block.email.value);
            setEmailVis (block.email.visibility);
            setWebsite (block.website.value);
            setWebsiteVis (block.website.visibility);
            setPhone (block.phone.value);
            setPhoneVis (block.phone.visibility);
        }
    }
}