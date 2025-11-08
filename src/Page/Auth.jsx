/**
 * 
 * โค็ดหน้าเว็บ เข้าสู่ระบบ และ สมัครสมาชิก 
 * 
*/
import { useEffect, useState } from "react";
import { Button } from "../Component/Common";

import * as auth from "../Script/Authentication"
import * as icon from '../Script/Icon'

import './Style/Auth.css'


export function Auth () 
{
    const [view, setView] = useState (1);
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
            finalize ();
            return;
        }
        window.addEventListener ("keydown", onKeydown);

        return () =>
        {
            window.removeEventListener ("keydown", onKeydown);
        };
    });
    
    return <div className="page-auth">
      <div className="background"/>
      <div className="foreground">
        <div className="foreground-content">
          {/* หน้าเข้าสู่ระบบ */}
          <form className={view == 1 ? "d-flex" : "d-none"} action="#">
            <img className="logo"src={null}/>
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
                <span className="highlight" onClick={() => setViewRegister ()}>สมัครเลย</span>
              </p>
              <p>
                <span>ฉันลืมรหัสผ่าน</span>
                <span> </span>
                <span className="highlight" onClick={() => setViewRecovery ()}>กู้คืนบัญชี</span>
              </p>
            </div>
            <p key={statusAnim} className="status">{status}</p>
            <Button layout='horizontal-outlined' type="submit" icon={icon.Unlock} text='เข้าสู่ระบบ' click={(e) => clickLogin(e)}/>
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
                <span className="highlight" onClick={() => setViewLogin ()}>เข้าสู่ระบบ</span>
              </p>
            </div>
            <p key={statusAnim} className="status">{status}</p>

            <Button layout='horizontal-outlined' type="submit" icon={icon.PlusCircle} text='สมัครสมาชิก' click={(e) => clickRegister(e)}/>
          </form>
          {/* หน้าลืมรหัสผ่าน */}
          <div className={view == 3 ? "d-flex" : "d-none"}>
            <div>
              <Button layout="horizontal" icon={icon.ArrowLeftCircle} text="ย้อนกลับ" click={(e) => setViewLogin (e)}/>
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
            <button className="button" onClick={() => setViewLogin ()}>ย้อนกลับ</button>
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
            clickLogin (e);
        }
    }


    function setViewLogin ()
    {
        setStatus ("");
        setView (1);
    }
    function setViewRegister ()
    {
        setStatus ("");
        setView (2);
    }
    function setViewRecovery ()
    {
        setStatus ("");
        setView (3);
    }

    function clickLogin (e)
    {
        e.preventDefault ();

        setStatus ("");

        if (username == "" && password == "")
        {
            setStatus ("โปรดป้อนชื่อผู้ใช้ และ รหัสผ่าน");
            setStatusAnim (statusAnim + 1);
            return;
        }
        if (username == "")
        {
            setStatus ("โปรดป้อนชื่อผู้ใช้");
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
            finalize ();
        }
        catch (ex)
        {
            console.error (ex);

            if (ex instanceof auth.ErrorCredential)
            {
                setStatus ("ขออภัย ชื่อผู้ใช้หรือรหัสผ่านของคุณนั้นไม่ถูกต้อง");
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
        }
    }
    function clickRegister (e)
    {
        e.preventDefault ();

        setStatus ("ขออภัย ชื่อผู้ใช้นี้ได้ถูกใช้ไปแล้ว โปรดใช้ชื่ออื่น");
        setStatusAnim (statusAnim + 1);
    }
    function clickRecovery (e)
    {
        e.preventDefault ();

        setStatus ("ขออภัย ระบบไม่พร้อมใช้งานในขณะนี้");
        setStatusAnim (statusAnim + 1);
    }

    function finalize ()
    {
        if (auth.isLogged () && auth.isActive ())
        {
            let param = new URL(document.location.toString()).searchParams;
            let ctx = param.get("context");
        
            if (ctx != null)
            {
                let json = JSON.parse (atob(ctx));
                let redirect = json["redirect"];
            
                window.location.href = redirect;
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
