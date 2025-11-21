/**
 * 
 * ไฟล์ที่จัดเก็บส่วนประกอบ การตั้งค่าโปรไฟล์ และ อื่น ๆ
 * 
*/
import { useState, useEffect, useRef, useCallback } from "react";

import VisOpt       from '../Component/VisOpt'

import api from '../Script/Api'
import nav from '../Script/Navigator'

import './Style/Settings.css'



const MenuAccount = ({ref}) =>
{
    const mounted = useRef (false);
    const [name, setName] = useState ('');

    const onLoad = () =>
    {
        const block = ref != null ? ref.current : null;

        if (block == null)
            return;

        setName (block.name);
    }
    const onSave = () =>
    {
        const block = ref != null ? ref.current : null;

        if (block == null)
            return;

        block.name = name;
    }

    const onLogout = (event) =>
    {
        event.preventDefault ();

        try { api.auth.logout (); }
        finally
        {
            nav.auth ('/', undefined);
        }
        return;
    }
    const onDisable = (event) =>
    {
        event.preventDefault ();
        return;
    }
    const onDelete = (event) =>
    {
        event.preventDefault ();
        return;
    }

    useEffect (() =>
    {
        if (mounted.current)
            return;

        mounted.current = true;
        onLoad ();

        return () => { mounted.current = false; }
    });

    return (
      <>
        <div className='menu-common menu-account'>
          <header>
            <h1>บัญชี</h1>
            <p>ตั้งค่าข้อมูลพื้นฐาน และความปลอดภัย</p>
            <hr/>
          </header>
          <main>
            <div className='class-input'>
              <p>ชื่อ</p>
              <input type='text' 
                    value={name} 
                    onChange={(event) => setName(event.target.value)}>      
              </input>
            </div>
            <div className='class-input'>
              <p>รหัสผ่าน</p>
              <button className='button-primary'>
                <label>ตั้งค่าใหม่</label>
              </button>
            </div>
            <div>
              <button className='button-primary' onClick={(event) => onLogout(event)}>
                <label>ออกจากระบบ</label>
              </button>
            </div>
            <div className="my-3 d-none">
              <button className='button-warning me-1' onClick={(event) => onDisable (event)}>ปิดใช้งาน</button>
              <button className='button-caution me-1' onClick={(event) => onDelete (event)}>ลบบัญชี</button>
            </div>
          </main>
        </div>
      </>
    );
}

const ProfileContact = ({ref}) =>
{
    const mounted = useRef (false);
    const [email,      setEmail]      = useState ("");
    const [emailVis,   setEmailVis]   = useState (0);
    const [website,    setWebsite]    = useState ("");        
    const [websiteVis, setWebsiteVis] = useState (0);
    const [phone,      setPhone]      = useState ("");
    const [phoneVis,   setPhoneVis]   = useState (0);

    const onLoad = () =>
    {
        const block = ref == null ? null : ref.current;

        if (block == null)
            return;

        setEmail (block.email.value);
        setEmailVis (block.email.visibility);
        setWebsite (block.website.value);
        setWebsiteVis (block.website.visibility);
        setPhone (block.phone.value);
        setPhoneVis (block.phone.visibility);
    }
    const onSave = () =>
    {
        const block = ref == null ? null : ref.current;

        if (block == null)
            return;

        block.email.value = email;
        block.email.visibility = emailVis;
        block.website.value = website;
        block.website.visibility = websiteVis;
        block.phone.value = phone;
        block.phone.visibility = phoneVis;
    }
    useEffect (() => 
    { 
        if (mounted.current)
            return;

        mounted.current = true;
        onLoad(); 

        return () =>
        {
            mounted.current = false;
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

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
}
const ProfilePersonal = ({ref}) =>
{
    const mounted = useRef (false);

    const [icon,        setIcon]        = useState (null); 
    const [background,  setBackground]  = useState (null);

    const [nickname,    setNickname]    = useState ('');
    const [nicknameVis, setNicknameVis] = useState (0);

    const [firstName,   setFirstName]   = useState ('');
    const [firstNameVis, setFirstNameVis] = useState (0);

    const [middleName,  setMiddleName]  = useState ('');
    const [middleNameVis, setMiddleNameVis] = useState (0);

    const [lastName,    setLastName]    = useState ('');
    const [lastNameVis, setLastNameVis] = useState (0);

    const [status,      setStatus]      = useState ('');
    const [statusVis,   setStatusVis]   = useState (0);

    const [bio,         setBio]         = useState ('');
    const [bioVis,      setBioVis]      = useState (0);

    const [location,    setLocation]    = useState ('');
    const [locationVis, setLocationVis] = useState (0);

    const [birthday,    setBirthday]    = useState ('');
    const [birthdayVis, setBirthdayVis] = useState (0);

    const onLoad = () =>
    {
        const block = ref != null ? ref.current : null;

        if (mounted.current == false)
            return;
        if (block == null)
            return;
          
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
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSave = (() =>
    {
        const block = ref != null ? ref.current : null;

        if (mounted.current == false)
            return;
        if (block == null)
            return;

        block.icon = api.encodeContent (icon);
        block.background = api.encodeContent (background);

        block.nickname.value = nickname;
        block.nickname.visibility = nicknameVis;

        block.firstName.value = firstName;
        block.firstName.visibility = firstNameVis;

        block.middleName.value = middleName;
        block.middleName.visibility = middleNameVis;

        block.lastName.value = lastName;
        block.lastName.visibility = lastNameVis;

        block.status.value = status;
        block.status.visibility = statusVis;

        block.bio.value = bio;
        block.bio.visibility = bioVis;

        block.location.value = location;
        block.location.visibility = locationVis;

        block.birthday.value = new Date(birthday);
        block.birthday.visibility = birthdayVis;
    });

    const onChangeIcon = (event) =>
    {
        event.preventDefault ();

        const target = event.target;
        const file = target.files[0];
        const reader = new FileReader ();

        if (file == null) { return; }
        
        reader.onloadend = function ()
        {
            setIcon (reader.result);
        }
        reader.readAsDataURL (file);
    }
    const onChangeBackground = (event) =>
    {
        event.preventDefault ();

        const target = event.target;
        const file = target.files[0];
        const reader = new FileReader ();

        if (file == null) { return; }
        
        reader.onloadend = function ()
        {
            setBackground (reader.result);
        }
        reader.readAsDataURL (file);
    }

    useEffect (() =>
    {
        if (mounted.current)
            return;

        mounted.current = true;
        onLoad ();

        return () =>
        {
            mounted.current = false;
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    useEffect (() =>
    {
        if (mounted.current == false)
            return;

        onSave ();

    }, 
    [
      nickname, nicknameVis,
      firstName, firstNameVis,
      middleName, middleNameVis,
      lastName, lastNameVis,
      status, statusVis,
      bio, bioVis,
      location, locationVis,
      birthday, birthdayVis,
      onSave
    ]);

    return (
      <>
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
            <input type="text" 
                   value={nickname} 
                   onChange={(event) => setNickname(event.target.value)}>
            </input>
            <VisOpt state={[nicknameVis, setNicknameVis]}/>
          </div>
          <div className='w-100 mb-1 input-text'>
            <label>ชื่อจริง</label>
            <input type="text" 
                   value={firstName} 
                   onChange={(event) => setFirstName(event.target.value)}>
            </input>
            <VisOpt state={[firstNameVis, setFirstNameVis]}/>
          </div>
          <div className='w-100 mb-1 input-text'>
            <label>ชื่อกลาง</label>
            <input type="text" 
                   value={middleName} 
                   onChange={(event) => setMiddleName(event.target.value)}>
            </input>
            <VisOpt state={[middleNameVis, setMiddleNameVis]}/>
          </div>
          <div className='w-100 mb-4 input-text'>
            <label>นามสกุล</label>
            <input type="text" 
                   value={lastName} 
                   onChange={(event) => setLastName(event.target.value)}>
            </input>
            <VisOpt state={[lastNameVis, setLastNameVis]}/>
          </div>

          <div className='w-100 mb-1 input-text'>
            <label>สถานะ</label>
            <input type="text" 
                   value={status} 
                   onChange={(event) => setStatus(event.target.value)}>
            </input>

            <VisOpt state={[statusVis, setStatusVis]}/>
          </div>
          <div className='w-100 mb-1 input-text'>
            <label>แนะนำตัว</label>
            <input type="text" 
                   value={bio} 
                   onChange={(event) => setBio(event.target.value)}>
            </input>
            <VisOpt state={[bioVis, setBioVis]}/>
          </div>
          <div className='w-100 mb-1 input-text'>
            <label>ที่อยู่</label>
            <input type="text" 
                   value={location} 
                   onChange={(event) => setLocation(event.target.value)}>
            </input>
            <VisOpt state={[locationVis, setLocationVis]}/>
          </div>
          <div className='w-100 mb-1 input-text'>
            <label>วันเกิด</label>
            <input type="date" 
                   value={birthday} 
                   onChange={(event) => setBirthday(event.target.value)}>
            </input>
            <VisOpt state={[birthdayVis, setBirthdayVis]}/>
          </div>
        </div>
      </> 
    );
}
const ProfileTheme = ({ref}) =>
{
    const mounted = useRef (false);
    const [profileColor, setProfileColor] = useState ('#000000');
    const [profileLayout, setProfileLayout] = useState (0);

    const [resumeColor, setResumeColor] = useState ('#000000');
    const [resumeLayout, setResumeLayout] = useState (0);

    const onLoad = () =>
    {
        const block = ref != null ? ref.current : null;

        if (block == null)
            return;

        setProfileColor ('#' + block.profileColor);
        setProfileLayout (block.profileLayout);

        setResumeColor ('#' + block.resumeColor);
        setResumeLayout (block.resumeLayout);
    }
    const onSave = () =>
    {
        const block = ref != null ? ref.current : null;

        if (block == null)
            return;

        block.profileColor = profileColor.substring (1);
        block.profileLayout = profileLayout;
        block.resumeColor = resumeColor.substring (1);
        block.resumeLayout = resumeLayout;
    }

    useEffect (() =>
    {
        if (mounted.current) 
          return;

        mounted.current = true;
        onLoad ();

        return () =>
        {
            mounted.current = false;
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    useEffect (() => 
    {
        if (mounted.current == false)
            return;

        onSave ();
    })

    return (
      <>
        <div>
          <h2 className='mt-4 mb-4'>ธีม</h2>
        </div>
        <div>
            <label>สี</label>
            <input type='color' 
                   value={profileColor} 
                   onChange={(event) => setProfileColor (event.target.value)}>
            </input>
        </div>
      </>
    );
}

const Root = ({children}) => { return (<>{children}</>); }

Root.MenuAccount = MenuAccount;
Root.ProfileContact = ProfileContact;
Root.ProfilePersonal = ProfilePersonal;
Root.ProfileTheme = ProfileTheme;

export default Root;

