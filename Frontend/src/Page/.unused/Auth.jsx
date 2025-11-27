/**
 * 
 * โค็ดหน้าเว็บ เข้าสู่ระบบ และ สมัครสมาชิก 
 * 
*/
import { Activity, useEffect, useRef, useState } from "react";

import api from "../Script/Api"
import icon from '../Script/Icon'
import background from '../Asset/Background/AuthBackground.webp' 

import './Style/Auth.css'

const VIEW_INTRO      = 1; /* หน้าแรก         */
const VIEW_LOGIN      = 2; /* หน้าเข้าสู่ระบบ     */
const VIEW_REGISTER   = 3; /* หน้าสมัครสมาชิก   */
const VIEW_RECOVERY   = 4; /* หน้ากู้คืน         */
const VIEW_LOGGED     = 5; /* หน้าเข้าสู่ระบบแล้ว  */
const VIEW_INACTIVE   = 6; /* หน้าบัญชีถูกปิด    */
const VIEW_SUSPEND    = 7; /* หน้าบัญชีระงับ     */

/**
 * 
 * พื้นที่หลักการแสดงผลหน้าเข้าสู่ระบบ
 * 
*/
const ViewRoot = ({children /* องค์ประกอบย่อย */}) =>
{
    return (
      <div className='page-auth'>

        {/* พื้นหลัง */}
        <div className='background'>
          {/* <img src={background}/> */}
        </div>
        
        {/* พื้นหลัง */}
        <div className='foreground'>
          {/* พื้นที่รอบใน */}
          <div className='inner'>            
            <img className='image' src={background}/>
            <div className='image-gradient'/>
            <div className='content'>
              {/* หัวเรื่อง */}
              <div className='head'>
                <img className='d-block' src={icon.people} width='48px' height='48px'/>
                <div className='d-block'>
                  <h1 className='text-h2 m-0 text-primary text-bold'>NOVA</h1>
                  <label className='text-h4 m-0 text-secondary'>เริ่มต้นอนาคตเพียงแค่ปลายนิ้ว</label>
                </div>
              </div>
              {/* เนื้อหา */}
              <div className='body'>
                {children}
              </div>
            </div>   
          </div>

        </div>
      </div>
    );
};
/**
 * 
 * พื้นที่สำหรับการแสดงหน้าหลัก
 * 
*/
const ViewIntro = ({stateView, stateStatus, stateStatusAnim, stateCallback }) =>
{
    const [view, setView] = stateView;
    const [status, setStatus] = stateStatus;
    const [statusAnim, setStatusAnim] = stateStatusAnim;
    const [onLogged, onRegistered] = stateCallback;
    const [disabled, setDisabled] = useState (false);

    /**
     * คำสั่งที่ถูกเรียก เมื่อผู้ใช้เลือกเข้าสู่ระบบโดยตรง
    */
    const onClickDirect = (event) => 
    { 
        event.preventDefault (); 

        setStatus ('');
        setView (VIEW_LOGIN);
    }
    /**
     * คำสั่งที่ถูกเรียก เมื่อผู้ใช้เลือกเข้าสู่ระบบด้วย Facebook
    */
    const onClickFacebook = (event) =>
    {
        event.preventDefault ();

        setStatus ('');
        setDisabled (true);

        //
        // โค็ดบรรทัดต่อไปนี้นั้นลึกลับ เพราะ React ไม่มีโค็ดสำหรับเชื่อมต่อกับ Facebook
        //
        const onRegister = (userId = '') =>
        {
            //
            // ดึงข้อมูลโปรไฟล์ของ Facebook
            //
            // eslint-disable-next-line no-undef
            FB.api ('/me', { fields: 'id,name,email,birthday,picture' }, async (me) =>
            {
                if (me == null)
                {
                    setStatus ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                    setStatusAnim (statusAnim + 1);
                    setDisabled (false);
                    return;
                }

                //
                // ประมวลข้อมูล
                //
                const email     = String (me.email);
                const birthday  = String (me.birthday);
                const username  = String (me.name);
                const usernameSplit = username.split (' ');
                const icon      = me.picture != null ? 
                                  me.picture.data != null ?
                                  String (me.picture.data.url) : null : null;

                const newContact  = new api.profile.DataContact ();
                const newPersonal = new api.profile.DataPersonal ();

                if (email != null)    { newContact.email.set(email, api.profile.VISIBILITY_PRIVATE); }
                if (birthday != null) { newPersonal.birthday.set(birthday, api.profile.VISIBILITY_PRIVATE); }
                if (username != null) { newPersonal.nickname.set(username, api.profile.VISIBILITY_PRIVATE); }
                
                switch (usernameSplit.length)
                {
                    case 2:
                      newPersonal.firstName.set (usernameSplit[0],  api.profile.VISIBILITY_PRIVATE);
                      newPersonal.lastName.set (usernameSplit[1],   api.profile.VISIBILITY_PRIVATE);
                      break;
                    case 3:
                      newPersonal.firstName.set (usernameSplit[0],  api.profile.VISIBILITY_PRIVATE);
                      newPersonal.middleName.set (usernameSplit[1], api.profile.VISIBILITY_PRIVATE);
                      newPersonal.lastName.set (usernameSplit[2],   api.profile.VISIBILITY_PRIVATE);
                      break;
                }

                //
                // ดึงข้อมูลรูปภาพโปรไฟล์
                //
                if (icon != null)
                {
                    const request = await fetch (icon);

                    if (request.ok)
                    {
                        const blob = await request.blob ();
                        const data = await new Promise ((resolve, reject) => 
                        {
                            const reader = new FileReader ();
                        
                            reader.onloadend = function () { resolve (reader.result); }
                            reader.onerror = function () { reject (); }
                        
                            reader.readAsDataURL (blob);
                        });
                        newPersonal.icon = api.encodeContent (data);
                    }
                    else
                    {
                        console.warn ("Authentication: Cannot fetch profile image: " + request.statusText);
                    }
                }
                try
                {
                    api.auth.createFacebook (userId);
                    api.auth.loginFacebook (userId);
                    api.profile.create ();
                    api.profile.setContact (newContact);
                    api.profile.setPersonal (newPersonal);

                    if (api.auth.isLogged ())
                    {
                        setStatus ('');
                        setDisabled (false);
                        onRegistered ();
                    }
                }
                catch (ex)
                {
                    console.error (ex);

                    setStatus ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                    setStatusAnim (statusAnim + 1);    
                    setDisabled (false);
                }
            });
        }
        const onLogin = (info) =>
        {
            if (info.status == "not_authorized")
            {
                setStatus ("คุณได้ยกเลิกการเข้าสู่ระบบ");
                setStatusAnim (statusAnim + 1);
                setDisabled (false);
                return;
            }
            if (info.status == "unknown") 
            {
                setStatus ("การเข้าสู่ระบบถูกขัดจังหวะ");
                setStatusAnim (statusAnim + 1);
                setDisabled (false);
                return;
            }
            if (info.status == "connected")
            {
                //
                // ลองพยายามเข้าสู่ระบบก่อน ถ้ามีข้อมูลแล้ว
                //
                try
                {
                    api.auth.loginFacebook (info.authResponse.userID);

                    if (api.auth.isLogged ())
                    {
                        setStatus ('');
                        setDisabled (false);
                        onLogged ();
                    }
                }
                catch (ex)
                {
                    //
                    // สร้างบัญชีใหม่
                    //
                    if (ex instanceof api.auth.ErrorCredential)
                    {
                        onRegister (info.authResponse.userID);
                        return;
                    }
                    //
                    // คงเป็นข้อผิดพลาด
                    //
                    if (ex instanceof api.auth.ErrorConfig)
                    {
                        setStatus ("ขออภัย คุณไม่สามารถเข้าสู่ระบบได้ในขณะนี้");
                        setStatusAnim (statusAnim + 1);
                        setDisabled (false);
                        return;
                    }
                    if (ex instanceof api.auth.ErrorServer)
                    {
                        setStatus ("ขออภัย ระบบปลายทางไม่สามารถประมวลผลได้");
                        setStatusAnim (statusAnim + 1);
                        setDisabled (false);
                        return;
                    }
                    console.error (ex);

                    setStatus ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                    setStatusAnim (statusAnim + 1);
                    setDisabled (false);
                    return;
                }
            }
        }

        // eslint-disable-next-line no-undef
        try { FB.login (onLogin); }
        catch (ex)
        {
            console.error (ex);
            
            setStatus ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
            setStatusAnim (statusAnim + 1);
            setDisabled (false);
            return;
        }
    }
    /**
     * คำสั่งที่ถูกเรียก เมื่อผู้ใช้เลือกเข้าสู่ระบบด้วย Google
    */
    const onClickGoogle = (event) =>
    {
        event.preventDefault ();

        setStatus ('');
        setDisabled (true);
    }

    return (
      <Activity mode={view == VIEW_INTRO ? 'visible' : 'hidden'}>
        <label className='mb-3'>ยินดีต้อนรับ เรามาเริ่มต้นกันเลย เลือกวิธีการเข้าสู่ระบบของคุณ</label>
        <div className='mb-2'>
          <button disabled={disabled} className='w-100 mb-1 button-primary text-align-left' onClick={onClickDirect}>
            <label className='justify-content-start'>
              <img src={icon.arrowRight}/>
              <span>เข้าสู่ระบบ โดยตรง</span>
            </label>
          </button>
          <button disabled={disabled} className='w-100 mb-1 button-primary text-align-left' onClick={onClickFacebook}>
            <label className='justify-content-start'>
              <img src={icon.facebook}/>
              <span>เข้าสู่ระบบ ด้วย Facebook</span>
            </label>
          </button>
          <button disabled={disabled} hidden={true} className='w-100 mb-1 button-primary text-align-left' onClick={onClickGoogle}>
            <label className='justify-content-start'>
              <img src={icon.google}/>
              <span>เข้าสู่ระบบ ด้วย Google</span>
            </label>
          </button>
        </div>
        <div className='mb-2'>
          <p key={statusAnim} className="text-caution status">{status}</p>
        </div>
      </Activity>
    );
};
const ViewLogin = ({stateView, stateUsername, statePassword, stateStatus, stateStatusAnim, stateCallback}) =>
{
    const [view, setView] = stateView;
    const [username, setUsername] = stateUsername;
    const [password, setPassword] = statePassword;
    const [status, setStatus] = stateStatus;
    const [statusAnim, setStatusAnim] = stateStatusAnim;
    const [onLogged] = stateCallback;

    const onClickBack = (event) =>
    {
        event.preventDefault ();

        setView (VIEW_INTRO);
        setStatus ('');
    }
    const onClickRegister = (event) =>
    {
        event.preventDefault ();

        setView (VIEW_REGISTER);
        setStatus ('');
    }
    const onClickRecovery = (event) =>
    {
        event.preventDefault ();

        setView (VIEW_RECOVERY);
        setStatus ('');
    }
    const onSubmit = (event) =>
    {
        event.preventDefault ();

        if (username == "" && password == "")
        {
            setStatus ("โปรดป้อนรหัสประจำตัว และ รหัสผ่าน");
            setStatusAnim (statusAnim + 1);
            return;
        }
        if (username == "")
        {
            setStatus ("โปรดป้อนรหัสประจำตัว");
            setStatusAnim (statusAnim + 1);
            return;
        }
        if (password == "")
        {
            setStatus ("โปรดป้อนรหัสผ่าน");
            setStatusAnim (statusAnim + 1);
            return;
        }
        try
        {
            api.auth.login (username, password);

            if (api.auth.isLogged ()) 
            {
                onLogged ();
            }
        }
        catch (ex)
        {
            console.warn (ex);

            if (ex instanceof api.auth.ErrorCredential)
            {
                setStatus ("ขออภัย รหัสประจำตัวหรือรหัสผ่านของคุณนั้นไม่ถูกต้อง");
                setStatusAnim (statusAnim + 1);
                return;
            }
            if (ex instanceof api.auth.ErrorConfig)
            {
                setStatus ("ขออภัย คุณไม่สามารถเข้าสู่ระบบได้ในขณะนี้");
                setStatusAnim (statusAnim + 1);
                return;
            }
            if (ex instanceof api.auth.ErrorServer)
            {
                setStatus ("ขออภัย ระบบปลายทางไม่สามารถประมวลผลได้");
                setStatusAnim (statusAnim + 1);
                return;
            }

            setStatus ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
            setStatusAnim (statusAnim + 1);
            return;
        }
    }

    return (
      <Activity mode={view == VIEW_LOGIN ? 'visible' : 'hidden'}>
        <div>
          <button className='mb-3 button-primary button-outlined text-align-left' onClick={onClickBack}>
            <label className="justify-content-start">
              <img src={icon.arrowLeftCircle}/>
              <span>ย้อนกลับ</span>
            </label>
          </button>
        </div>
        <form action='#'>
          <div className='mb-1'>
            <label className='w-100 text-bold mb-1'>รหัสประจำตัว</label>
            <input className='w-100' type='text' autoComplete='username webauthn' autoFocus={true}
                  value={username} onChange={(event) => setUsername (event.target.value)}>       
            </input>
          </div>
          <div className='mb-1'>
            <label className='w-100 text-bold mb-1'>รหัสผ่าน</label>
            <input className='w-100' type='password' autoComplete='current-password webauthn' autoFocus={false}
                  value={password} onChange={(event) => setPassword (event.target.value)}>       
            </input>
          </div>
          <div className='mt-3 mb-3'>
            <p className='text-p m-0 mb-1'>
              <span>ฉันไม่มีบัญชี</span>
              <span> </span>
              <span className='text-a' onClick={onClickRegister}>สมัครเลย</span>
            </p>
            <p className='text-p m-0 mb-1'>
              <span>ฉันลืมรหัสผ่าน</span>
              <span> </span>
              <span className='text-a' onClick={onClickRecovery}>กู้คืนบัญชี</span>
            </p>
          </div>
          <div className='mb-2'>
            <p key={statusAnim} className="text-caution status">{status}</p>
          </div>
          <button className='w-100 mb-3 button-primary text-align-left' onClick={onSubmit}>
            <label>
              <img src={icon.unlock}/>
              <span>เข้าสู่ระบบ</span>
            </label>
          </button>
        </form>
      </Activity>
    )
};
const ViewRegister = ({stateView, stateUsername, statePassword, statePasswordConfirm, stateEmail, stateStatus, stateStatusAnim}) =>
{
    const [view, setView] = stateView;
    const [username, setUsername] = stateUsername;
    const [password, setPassword] = statePassword;
    const [passwordConfirm, setPasswordConfirm] = statePasswordConfirm;
    const [email, setEmail] = stateEmail;
    const [status, setStatus] = stateStatus;
    const [statusAnim, setStatusAnim] = stateStatusAnim; 

    const onClickBack = (event) =>
    {
        event.preventDefault ();

        setView (VIEW_LOGIN);
        setStatus ('');
    }
    const onSubmit = (event) =>
    {
        event.preventDefault ();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (username == "")
        {
            setStatus ("โปรดป้อนรหัสประจำตัว");
            setStatusAnim (statusAnim + 1);
            return;
        }
        if (password == "")
        {
            setStatus ("โปรดป้อนรหัสผ่าน");
            setStatusAnim (statusAnim + 1);
            return;
        }
        if (passwordConfirm == "")
        {
            setStatus ("โปรดป้อนรหัสผ่านยืนยัน");
            setStatusAnim (statusAnim + 1);
            return;
        }
        if (password != passwordConfirm)
        {
            setStatus ("รหัสผ่านของคุณไม่ตรงกัน");
            setStatusAnim (statusAnim + 1);
            return;
        }
        if (email == "")
        {
            setStatus ("โปรดป้อนอีเมล");
            setStatusAnim (statusAnim + 1);
            return;
        }
        if (emailRegex.test (email) == false)
        {
            setStatus ("รูปแบบอีเมลที่คุณป้อนไม่ถูกต้อง");
            setStatusAnim (statusAnim + 1);
            return;
        }

        try
        {
            const newContact = new api.profile.DataContact ();
            const newPersonal = new api.profile.DataPersonal ();

            newContact.email = email;
            newPersonal.nickname.value = username;

            api.auth.create (username, password);
            api.auth.login (username, password);
            api.profile.create ();
            api.profile.setContact (newContact);
            api.profile.setPersonal (newPersonal);
        }
        catch (ex)
        {

            if (ex instanceof api.auth.ErrorCredential)
            {
                setStatus ("ขออภัย รหัสประจำตัวนี้ถูกใช้ไปแล้ว โปรดใช้รหัสอื่น");
                setStatusAnim (statusAnim + 1);
                return;
            }
            if (ex instanceof api.auth.ErrorConfig)
            {
                setStatus ("ขออภัย คุณไม่สมัครสมาชิกได้ในขณะนี้");
                setStatusAnim (statusAnim + 1);
                return;  
            }
            if (ex instanceof api.auth.ErrorServer)
            {
                setStatus ("ขออภัย ระบบปลายทางไม่สามารถประมวลผลได้");
                setStatusAnim (statusAnim + 1);
                return;
            }
            console.error (ex);

            setStatus ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
            setStatusAnim (statusAnim + 1);
            return;
        }
    }

    return (
      <Activity mode={view == VIEW_REGISTER ? 'visible' : 'hidden'}>
        <div>
          <button className='mb-3 button-primary button-outlined text-align-left' onClick={onClickBack}>
            <label className="justify-content-start">
              <img src={icon.arrowLeftCircle}/>
              <span>ย้อนกลับ</span>
            </label>
          </button>
        </div>
        <form action='#'>
          <div className='mb-1'>
            <label className='w-100 text-bold mb-1'>รหัสประจำตัว</label>
            <input className='w-100' type='text' autoComplete='username webauthn' autoFocus={true}
                  value={username} onChange={(event) => setUsername (event.target.value)}>       
            </input>
          </div>
          <div className='mb-1'>
            <label className='w-100 text-bold mb-1'>รหัสผ่าน</label>
            <input className='w-100' type='password' autoComplete='new-password webauthn' autoFocus={false}
                  value={password} onChange={(event) => setPassword (event.target.value)}>       
            </input>
          </div>
          <div className='mb-1'>
            <label className='w-100 text-bold mb-1'>รหัสผ่าน (ยืนยัน)</label>
            <input className='w-100' type='password' autoComplete='new-password webauthn' autoFocus={false}
                  value={passwordConfirm} onChange={(event) => setPasswordConfirm (event.target.value)}>       
            </input>
          </div>
          <div className='mb-1'>
            <label className='w-100 text-bold mb-1'>อีเมล (ยืนยัน)</label>
            <input className='w-100' type='email' autoComplete='email webauthn' autoFocus={false}
                  value={email} onChange={(event) => setEmail (event.target.value)}>       
            </input>
          </div>
          <div className='mt-3 mb-3'>
            <p className='text-p m-0 mb-1'>
              <span>ฉันมีบัญชีแล้ว</span>
              <span> </span>
              <span className='text-a' onClick={onClickBack}>เข้าสู่ระบบ</span>
            </p>
          </div>
          <div className='mb-2'>
            <p key={statusAnim} className="text-caution status">{status}</p>
          </div>
          <button className='w-100 mb-3 button-primary text-align-left' onClick={onSubmit}>
            <label>
              <img src={icon.plusCircle}/>
              <span>สมัครสมาชิก</span>
            </label>
          </button>
        </form>
      </Activity>
      
    )
};
const ViewRecovery = ({stateView, stateUsername, stateStatus, stateStatusAnim}) =>
{
    const [view, setView] = stateView;
    const [username, setUsername] = stateUsername;
    const [status, setStatus] = stateStatus;
    const [statusAnim, setStatusAnim] = stateStatusAnim; 

    const onClickBack = (event) =>
    {
        event.preventDefault ();

        setView (VIEW_LOGIN);
        setStatus ('');
    }
    const onSubmit = (event) =>
    {
        event.preventDefault ();

        setStatus ('ขออภัย ระบบไม่พร้อมใช้งานในขณะนี้');
        setStatusAnim (statusAnim + 1);
    }

    return (
      <Activity mode={view == VIEW_RECOVERY ? 'visible' : 'hidden'}>
        <div>
          <button className='mb-3 button-primary button-outlined text-align-left' onClick={onClickBack}>
            <label className="justify-content-start">
              <img src={icon.arrowLeftCircle}/>
              <span>ย้อนกลับ</span>
            </label>
          </button>
        </div>
        <form action='#'>
          <div className='mb-1'>
            <label className='w-100 text-bold mb-1'>รหัสประจำตัว</label>
            <input className='w-100' type='text' autoComplete='username webauthn' autoFocus={true}
                  value={username} onChange={(event) => setUsername (event.target.value)}>       
            </input>
          </div>
          <div className='mt-2 mb-2'>
            <p key={statusAnim} className="text-caution status">{status}</p>
          </div>
          <button className='w-100 mb-3 button-primary' onClick={onSubmit}>ดำเนินการต่อ</button>
        </form>
      </Activity>
    );
};

const ViewLogged = ({stateView}) =>
{
    const [view] = stateView;

    const onClickLogout = (event) =>
    {
        event.preventDefault ();

        try { api.auth.logout (); }
        finally { location.reload (); }
    }
    const onClickCancel = (event) =>
    {
        event.preventDefault ();
        history.back ();
    }

    return (
      <Activity mode={view == VIEW_LOGGED ? 'visible' : 'hidden'}>
        <div className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
          <div className='mb-3'>
            <h1 className='text-h1 text-bold'>คุณได้ทำการเข้าสู่ระบบเรียบร้อยแล้ว</h1>
            <p className='text-p'>หากคุณต้องการที่จะออกจากระบบ ให้กดปุ่มด้านล่าง</p>
          </div>
          <div className='mb-3'>
            <button className='button-caution' onClick={onClickLogout}>ออกจากระบบ</button>
            <button className='button-primary ms-1' onClick={onClickCancel}>ยกเลิก</button>
          </div>
        </div>
      </Activity>
    )
}
const ViewSuspended = ({stateView}) =>
{
    const [view] = stateView;

    const onClickLogout = (event) =>
    {
        event.preventDefault ();

        try { api.auth.logout (); }
        finally { location.reload (); }
    }

    return (
      <div className={view == VIEW_SUSPEND ? 'd-flex' : 'd-none'}>
        <div className='mb-4'>
          <h1 className='text-h1 text-bold'>บัญชีของคุณถูกระงับ</h1>
          <p className='text-p'>ผู้ดูแลระบบของแพลตฟอร์มได้ทำการระงับการใช้งานบัญชีของคุณ ซึ่งอาจมีสาเหตุจากการที่คุณได้ละเมิดข้อตกลงระหว่างแพลตฟอร์ม</p>
          <br/>
          <p className='text-p'>หากนี้เป็นข้อผิดพลาดหรือมีข้อสงสัย โปรดติดต่อผู้ดูแลระบบ</p>
          <br/>
        </div>
        <div className="d-flex gap-2">
          <button onClick={onClickLogout}>ออกจากระบบ</button>
        </div>
      </div>
    )
}

const Root = () =>
{
    //                                 //
    // ------------------------------- //
    //              STATE              //
    // ------------------------------- //
    //                                 //

    const mounted = useRef (false);
    const [view, setView] = useState (api.auth.isLogged () ? (api.auth.getStatus () == api.auth.STATUS_ACTIVE ? VIEW_LOGGED : 
                                                              api.auth.getStatus () == api.auth.STATUS_INACTIVE ? VIEW_INACTIVE : VIEW_SUSPEND) : VIEW_INTRO);
    const [email, setEmail] = useState ('');
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [passwordConfirm, setPasswordConfirm] = useState ('');
    const [status, setStatus] = useState ('');
    const [statusAnim, setStatusAnim] = useState (0);

    //                                 //
    // ------------------------------- //
    //            CALLBACK             //
    // ------------------------------- //
    //                                 //

    const onLogged = () =>
    {
        const param = new URL(document.location.toString()).searchParams;
        const ctx = param.get("context");
   
        if (ctx != null)
        {
            let json = JSON.parse (atob(ctx));
            let redirect = json["redirectLogin"];

            if (redirect == undefined || redirect == null)
                redirect = '/';
        
            window.location.href = redirect;
            return;
        }
        window.location.href = '/';
        return;
    }
    const onRegistered = () =>
    {
        const param = new URL(document.location.toString()).searchParams;
        const ctx = param.get("context");
   
        if (ctx != null)
        {
            let json = JSON.parse (atob(ctx));
            let redirect = json["redirectRegister"];
        
            if (redirect == undefined || redirect == null)
                redirect = '/';

            window.location.href = redirect;
            return;
        }
        window.location.href = "/";
        return;
    }

    //                                 //
    // ------------------------------- //
    //              EFFECT             //
    // ------------------------------- //
    //                                 //
    useEffect (() => 
    {
        if (mounted.current)
          return;

        document.title = "NOVA เข้าสู่ระบบ";
        mounted.current = true;

    }, []);

    //                                 //
    // ------------------------------- //
    //           RENDERING             //
    // ------------------------------- //
    //                                 //
    return (
      <ViewRoot>
        <ViewIntro 
          stateView={[view, setView]} 
          stateStatus={[status, setStatus]} 
          stateStatusAnim={[statusAnim, setStatusAnim]}
          stateCallback={[onLogged, onRegistered]}>
        </ViewIntro>
        <ViewLogin
          stateView={[view, setView]}
          stateUsername={[username, setUsername]}
          statePassword={[password, setPassword]}
          stateStatus={[status, setStatus]}
          stateStatusAnim={[statusAnim, setStatusAnim]}
          stateCallback={[onLogged, onRegistered]}>
        </ViewLogin>
        <ViewRegister
          stateView={[view, setView]}
          stateUsername={[username, setUsername]}
          statePassword={[password, setPassword]}
          statePasswordConfirm={[passwordConfirm, setPasswordConfirm]}
          stateEmail={[email, setEmail]}
          stateStatus={[status, setStatus]}
          stateStatusAnim={[statusAnim, setStatusAnim]}
          stateCallback={[onLogged, onRegistered]}>
        </ViewRegister>
        <ViewRecovery
          stateView={[view, setView]}
          stateUsername={[username, setUsername]}
          stateStatus={[status, setStatus]}
          stateStatusAnim={[statusAnim, setStatusAnim]}
          stateCallback={[onLogged, onRegistered]}>
        </ViewRecovery>
        <ViewLogged
          stateView={[view, setView]}>
        </ViewLogged>
        <ViewSuspended
          stateView={[view, setView]}
          stateStatus={[status, setStatus]}
          stateCallback={[onLogged, onRegistered]}>
        </ViewSuspended>
      </ViewRoot>
    );
}
export default Root;