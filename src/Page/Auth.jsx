/**
 * 
 * โค็ดหน้าเว็บ เข้าสู่ระบบ และ สมัครสมาชิก 
 * 
*/
import { useEffect, useState } from "react";
import { ButtonOld, Button } from "../Component/Common";

import {auth, profile} from "../Script/Api"
import * as api from "../Script/Api"
import * as icon from '../Script/Icon'

import './Style/Auth.css'


export function Auth () 
{
    const [view, setView] = useState (0);


    const [email, setEmail] = useState ("");
    const [username, setUsername] = useState ("");
    const [password, setPassword] = useState ("");
    const [passwordConfirm, setPasswordConfirm] = useState ("");
    const [status, setStatus] = useState ("");
    const [statusAnim, setStatusAnim] = useState (0);

    useEffect (() =>
    {
        document.title = "NOVA เข้าสู่ระบบ";

        if (auth.isLogged () && auth.isActive ())
        {
            console.warn ("Already logged in, redirecting");
            finalize (false);
            return;
        }

        window.addEventListener ("keydown", onKeydown);

        return () =>
        {
            window.removeEventListener ("keydown", onKeydown);
        };
    }, 
    [onKeydown]);
    
    return <div className="page-auth">
      <div className="system">
        
      </div>
      <div className="background"/>
      <div className="foreground">
        <div className="foreground-content">
          {/* หน้าแรก */}
          <div className={view == 0 ? "d-flex" : "d-none"}>
            <img className="logo"src={null}/>
            <label className="h3">ยินดีต้อนรับ</label>
            <div className="option">
              <Button layout='horizontal outlined' icon={icon.arrowRight} text='เข้าสู่ระบบ โดยตรง' click={(e) => setViewLogin(e)}/>
              <Button layout='horizontal' icon={icon.facebook} text='เข้าสู่ระบบด้วย Facebook' click={(e) => clickLoginFacebook(e)}/>
              <Button layout='horizontal' icon={icon.google} text='เข้าสู่ระบบด้วย Google' click={(e) => clickLoginGoogle(e)}/>
            </div>
            <div>
              <p key={statusAnim} className="status">{status}</p>
            </div>
          </div>
          {/* หน้าเข้าสู่ระบบ */}
          <form className={view == 1 ? "d-flex" : "d-none"} action="#">
            <img className="logo"src={null}/>
            <div>
              <Button layout='horizontal outlined' icon={icon.arrowLeftCircle} text='ย้อนกลับ' click={(e) => setViewSelect(e)}/>
            </div>
            <div className="input">
              <label>รหัสประจำตัว</label>
              <input type="text" autoComplete="username webauthn" autoFocus={true}
                     value={username} onChange={(e) => setUsername(e.target.value)}>       
              </input>
            </div>
            <div className="input">
              <label>รหัสผ่าน</label>
              <input type="password" autoComplete="current-password webauthn"
                     value={password} onChange={(e) => setPassword(e.target.value)}>
              </input>
            </div>
            <div className="option">
              <p>
                <span>ฉันไม่มีบัญชี</span>
                <span> </span>
                <span className="highlight" onClick={(e) => setViewRegister (e)}>สมัครเลย</span>
              </p>
              <p>
                <span>ฉันลืมรหัสผ่าน</span>
                <span> </span>
                <span className="highlight" onClick={(e) => setViewRecovery (e)}>กู้คืนบัญชี</span>
              </p>
            </div>
            <p key={statusAnim} className="status">{status}</p>
            <Button layout='horizontal' type="submit" icon={icon.unlock} text='เข้าสู่ระบบ' click={(e) => clickLogin(e)}/>
          </form>
          {/* หน้าสมัครสมาชิก */}
          <form className={view == 2 ? "d-flex" : "d-none"} action="#">
            <img className="logo"src={null}/>
            <div className="input">
              <label>รหัสประจำตัว</label>
              <input type="text" autoComplete="username webauthn" autoFocus={true}
                     value={username} onChange={(e) => setUsername(e.target.value)}>       
              </input>
            </div>
            <div className="input">
              <label>รหัสผ่าน</label>
              <input type="password" autoComplete="new-password webauthn"
                     value={password} onChange={(e) => setPassword(e.target.value)}>
              </input>
            </div>
            <div className="input">
              <label>รหัสผ่าน (ยืนยัน)</label>
              <input type="password" autoComplete="new-password webauthn"
                     value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}>
              </input>
            </div>
            <div className="input">
              <label>อีเมล</label>
              <input type="email" autoComplete="email webauthn"
                     value={email} onChange={(e) => setEmail(e.target.value)}>
              </input>
            </div>
            <div className="option">
              <p>
                <span>ฉันมีบัญชีแล้ว</span>
                <span> </span>
                <span className="highlight" onClick={(e) => setViewLogin (e)}>เข้าสู่ระบบ</span>
              </p>
            </div>
            <p key={statusAnim} className="status">{status}</p>

            <ButtonOld layout='horizontal-outlined' type="submit" icon={icon.PlusCircle} text='สมัครสมาชิก' click={(e) => clickRegister(e)}/>
          </form>
          {/* หน้าลืมรหัสผ่าน */}
          <div className={view == 3 ? "d-flex" : "d-none"}>
            <div>
              <Button type='horizontal' icon={icon.arrowLeftCircle} text="ย้อนกลับ" click={(e) => setViewLogin (e)}/>
            </div>
            <div className="input">
              <label>รหัสประจำตัว</label>
              <input type="text" autoComplete="username webauthn" autoFocus={true}
                     value={username} onChange={(e) => setUsername(e.target.value)}>       
              </input>
            </div>
            <div className="option">

            </div>
            <p key={statusAnim} className="status">{status}</p>
            <button className="button" onClick={(e) => clickRecovery (e)}>ดำเนินการต่อ</button>
          </div>
          {/* หน้าบัญชีถูกระงับ หรือ ปิดใช้งาน */}
          <div className={view == 4 ? "d-flex" : "d-none"}>
            <h2>บัญชีของคุณถูกระงับ</h2>
            <p className="mt-4 mb-4">
              บัญชีของคุณถูกระงับการใช้โดยผู้ดูแลระบบ ซึ่งอาจมีสาเหตุจากคุณละเมิดข้อตกลงการให้บริการ
              <br/><br/>
              โปรดติดต่อผู้ดูแลระบบเพื่อรับความช่วยเหลือ
            </p>
            <div className="option">

            </div>
            <button className="button" onClick={(e) => setViewLogin (e)}>ย้อนกลับ</button>
          </div>
        </div>
      </div>
    </div>

    function onKeydown (e)
    {
        setStatus ("");

        if (e.key == "Enter")
        {
            e.preventDefault ();

            switch (view)
            {
                case 1: clickLogin(e); break;
                case 2: clickRegister (e); break;
                case 3: clickRecovery (e); break;
            }
        }
    }


    function setViewSelect (e)
    {
        e.preventDefault ();
      
        setStatus ("");
        setView (0);
    } 
    function setViewLogin (e)
    {
        e.preventDefault ();

        setStatus ("");
        setView (1);
    }
    function setViewRegister (e)
    {
        e.preventDefault ();
      
        setStatus ("");
        setView (2);
    }
    function setViewRecovery (e)
    {
        e.preventDefault ();

        setStatus ("");
        setView (3);
    }

    function clickLogin (e)
    {
        e.preventDefault ();

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
            auth.login (username, password);

            finalize (false);
        }
        catch (ex)
        {
            console.error (ex);

            if (ex instanceof auth.ErrorCredential)
            {
                setStatus ("ขออภัย รหัสประจำตัวหรือรหัสผ่านของคุณนั้นไม่ถูกต้อง");
                setStatusAnim (statusAnim + 1);
                return;
            }
            if (ex instanceof auth.ErrorConfig)
            {
                setStatus ("ขออภัย คุณไม่สามารถเข้าสู่ระบบได้ในขณะนี้");
                setStatusAnim (statusAnim + 1);
                return;
            }
            if (ex instanceof auth.ErrorServer)
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

    function clickLoginFacebook (e)
    {
        e.preventDefault ();

        setStatus ("");

        function onLogin (info)
        {
            if (info.status == "not_authorized")
            {
                setStatus ("คุณได้ยกเลิกการเข้าสู่ระบบ");
                setStatusAnim (statusAnim + 1);
                return;
            }
            if (info.status == "unknown")
            {
                setStatus ("การเข้าสู่ระบบถูกขัดจังหวะ");
                setStatusAnim (statusAnim + 1);
                return;
            }
            if (info.status == "connected")
            {
                try
                {
                    auth.loginFacebook (info.authResponse.userID);
                    finalize (false);
                }
                catch (ex)
                {
                    if (ex instanceof auth.ErrorCredential)
                    {
                        onLoginCreate (info.authResponse.userID);
                        return;
                    }
                    else if (ex instanceof auth.ErrorConfig)
                    {
                        setStatus ("ขออภัย คุณไม่สามารถเข้าสู่ระบบได้ในขณะนี้");
                        setStatusAnim (statusAnim + 1);
                        return;
                    }
                    else if (ex instanceof auth.ErrorServer)
                    {
                        setStatus ("ขออภัย ระบบปลายทางไม่สามารถประมวลผลได้");
                        setStatusAnim (statusAnim + 1);
                        return;
                    }
                    else
                    {
                        setStatus ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                        setStatusAnim (statusAnim + 1);
                        return;
                    }
                }
                
                return;
            }
            setStatus ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
            setStatusAnim (statusAnim + 1);
            return;

        }
        function onLoginCreate (id = "")
        {
            // eslint-disable-next-line no-undef
            FB.api("/me", { fields: "id,name,email,birthday,picture" }, async function (me) 
            {
                if (me == null)
                {
                    setStatus ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                    setStatusAnim (statusAnim + 1);    
                    return;
                }
                const email     = String (me.email);
                const birthday  = String (me.birthday);
                const username  = String (me.name);
                const usernameSplit = username.split (' ');
                const icon      = me.picture != null ? 
                                  me.picture.data != null ?
                                  String (me.picture.data.url) : null : null;

                const newContact = new profile.DataContact ();
                const newPersonal = new profile.DataPersonal ();

                if (email != null)    { newContact.email.set(email, profile.VISIBILITY_PRIVATE); }
                if (birthday != null) { newPersonal.birthday.set(birthday, profile.VISIBILITY_PRIVATE); }
                if (username != null) { newPersonal.nickname.set(username, profile.VISIBILITY_PRIVATE); }
                
                switch (usernameSplit.length)
                {
                    case 2:
                      newPersonal.firstName.set (usernameSplit[0], profile.VISIBILITY_PRIVATE);
                      newPersonal.lastName.set (usernameSplit[1], profile.VISIBILITY_PRIVATE);
                      break;
                    case 3:
                      newPersonal.firstName.set (usernameSplit[0], profile.VISIBILITY_PRIVATE);
                      newPersonal.middleName.set (usernameSplit[1], profile.VISIBILITY_PRIVATE);
                      newPersonal.lastName.set (usernameSplit[2], profile.VISIBILITY_PRIVATE);
                      break;
                }

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
                    auth.createFacebook (id);
                    profile.create ();
                    profile.setContact (newContact);
                    profile.setPersonal (newPersonal);
                    finalize (true);
                }
                catch (ex)
                {
                    console.error (ex);

                    setStatus ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                    setStatusAnim (statusAnim + 1);    
                    return;
                }
            });   
        }
        // eslint-disable-next-line no-undef
        FB.login (onLogin);
    }
    function clickLoginGoogle (e)
    {
        e.preventDefault ();
    }
    function clickRegister (e)
    {
        e.preventDefault ();

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
            auth.create (username, password);
            profile.create ();

            const initialContact = new profile.DataContact ();
            const initialPersonal = new profile.DataPersonal ();
            
            initialContact.email = email;
            initialPersonal.nickname.value = username;

         
        }
        catch (ex)
        {
            console.error (ex);

            // Auth
            if (ex instanceof auth.ErrorCredential)
            {
                setStatus ("ขออภัย รหัสประจำตัวนี้ถูกใช้ไปแล้ว โปรดใช้รหัสอื่น");
                setStatusAnim (statusAnim + 1);
                return;
            }
            if (ex instanceof auth.ErrorConfig)
            {
                setStatus ("ขออภัย คุณไม่สมัครสมาชิกได้ในขณะนี้");
                setStatusAnim (statusAnim + 1);
                return;  
            }
            if (ex instanceof auth.ErrorServer)
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
    function clickRecovery (e)
    {
        e.preventDefault ();

        setStatus ("ขออภัย ระบบไม่พร้อมใช้งานในขณะนี้");
        setStatusAnim (statusAnim + 1);
    }

    function finalize (newAccount = false)
    {
        if (auth.isLogged () && auth.isActive ())
        {
            let param = new URL(document.location.toString()).searchParams;
            let ctx = param.get("context");
        
            if (ctx != null)
            {
                let json = JSON.parse (atob(ctx));
                let redirect = json["redirect"];
                let redirectCreate = json["redirectCreate"];
            
                window.location.href = newAccount ? redirectCreate : redirect;
                return;
            }
            else
            {
                window.location.href = "/";
                return;
            }
        }
    }
} 
