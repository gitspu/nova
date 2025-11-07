import { useState } from "react";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

import * as auth from "../Script/Authentication"
import './Style/Auth.css'


export function Auth () 
{
    const [view, setView] = useState (1);
    const [email, setEmail] = useState ("");
    const [username, setUsername] = useState ("");
    const [password, setPassword] = useState ("");
    const [passwordConfirm, setPasswordConfirm] = useState ("");
    const [status, setStatus] = useState ("");

    document.title = "NOVA Authentication";

    if (auth.isLogged () && auth.isActive ())
    {
        console.warn ("Already logged in, redirecting");
        redirect ();
        return;
    }
    
    function redirect ()
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
  
    function clickLogin ()
    {
        if (username == "" && password == "")
        {
            setStatus ("โปรดป้อนชื่อผู้ใช้ และ รหัสผ่าน");
            return;
        }
        if (username == "")
        {
            setStatus ("โปรดป้อนชื่อผู้ใช้");
            return;
        }
        if (password == "")
        {
            setStatus ("โปรดป้อนรหัสผ่าน");
            return;
        }
        try
        {
            auth.login (username, password);
            setStatus ("เข้าสู่ระบบสำเร็จ กำลังย้ายคุณไปหน้าที่ต้องการ");
            redirect ();
        }
        catch (e)
        {
            if (e instanceof auth.ErrorCredential)
            {
                setStatus ("ขออภัย ชื่อผู้ใช้หรือรหัสผ่านของคุณนั้นไม่ถูกต้อง");
                return;
            }
            if (e instanceof auth.ErrorConfig)
            {
                setStatus ("ขออภัย คุณไม่สามารถเข้าสู่ระบบได้ในขณะนี้");
                return;
            }
            if (e instanceof auth.ErrorServer)
            {
                setStatus ("ขออภัย ระบบปลายทางไม่สามารถประมวลผลได้");
                return;
            }
            setStatus ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
        }
    }
    function clickRegister ()
    {
        setStatus ("ขออภัย ชื่อผู้ใช้นี้ได้ถูกใช้ไปแล้ว โปรดใช้ชื่ออื่น");
    }
    function clickForgot ()
    {
        setStatus ("ขออภัย ระบบไม่พร้อบใช้งานในขณะนี้");
    }

   
    
    return <div className="position-absolute w-100 h-100">
      <PageBackground/>
      <PageForeground>
        <div className={view == 1 ? "d-block" : "d-none"}>
          <FormHead/>
          <FormInput text='ชื่อผู้ใช้' value={[username, setUsername]} change={() => setStatus("")} type='text' autoComplete='username webauthn'/>
          <FormInput text='รหัสผ่าน' value={[password, setPassword]} change={() => setStatus("")} type='password' autoComplete='current-password webauthn'/>
          <div className="mt-4 mb-4">
            <FormLink text='ฉันไม่มีบัญชี' highlight='สมัครเลย' click={() => setView(2)}/>
            <FormLink text='ฉันลืมรหัสผ่าน' highlight='กู้คืนบัญชี' click={() => setView(3)}/>
          </div>
          <FormStatus text={status}/>
          <FormButton text='เข้าสู่ระบบ' click={() => clickLogin()}/>
        </div>
        <div className={view == 2 ? "d-block" : "d-none"}>
          <FormHead/>
          <FormInput text='ชื่อผู้ใช้' value={[username, setUsername]} change={() => setStatus("")} type='text' autoComplete='username webauthn'/>
          <FormInput text='รหัสผ่าน' value={[password, setPassword]} change={() => setStatus("")} type='password' autoComplete='new-password webauthn'/>
          <FormInput text='รหัสผ่าน (ยืนยัน)' value={[passwordConfirm, setPasswordConfirm]} change={() => setStatus("")} type='password' autoComplete='new-password webauthn'/>
          <FormInput text='อีเมล' value={[email, setEmail]} change={() => setStatus("")} type='email' autoComplete='email webauthn'/>
          <div className="mt-4 mb-4">
            <FormLink text='ฉันมีบัญชีแล้ว' highlight='เข้าสู่ระบบ' click={() => setView(1)}/>
          </div>
          <FormStatus text={status}/>
          <FormButton text='สร้างบัญชี' click={() => clickRegister()}/>
        </div>
        <div className={view == 3 ? "d-block" : "d-none"}>
          <FormHead/>
          <div className="mb-4" onClick={() => setView(1)}>
            <ArrowLeft className="m-2"/>
            <label>ย้อนกลับ</label>
          </div>
          <div className="mb-4">
            <FormInput text='ชื่อผู้ใช้' value={[username, setUsername]} change={() => setStatus("")} type='text' autoComplete='username webauthn'/>
          </div>
          <FormStatus text={status}/>
          <FormButton text='ดำเนินการต่อ' click={() => clickForgot()}/>
        </div>
      </PageForeground>
    </div>
} 
  
function PageBackground ()
{
  return <div className="position-absolute top-0 bottom-0 left-0 right-0 w-100 h-100 bg-light"/>
}
function PageForeground ({children})
{
  return <div className="position-absolute top-0 bottom-0 left-0 right-0 w-100 h-100 d-flex align-items-center justify-content-center p-4">
    <div
      className="border border-1 border-black rounded-4 shadow p-4 overflow-hidden overflow-y-auto" 
      style={{height: '100%', width: '100%', maxWidth: '384px'}}>
      {children}
    </div>
  </div>
}
function FormHead ()
{
  return <div>
    <img 
      className="align-items-center bg-secondary rounded-circle m-auto mt-4 mb-4 d-block"
      style={{ width: '180px', height: '180px'}}
      src={null}
    />
  </div>
}

function FormInput ({text, value, type,  autoComplete, change})
{
  const [getValue, setValue] = value;

  return <div className="mb-2">
    <p className="form-label">{text}</p>
    <input 
      type={type} autoComplete={autoComplete} 
      className="form-control border-black bg-secondary-subtle rounded-4 px-3"
      value={getValue} onChange={(e) => { setValue(e.target.value); change(); }}/>
  </div>
}
function FormLink ({text, highlight, click})
{
  return <p className="m-0 text-primary">
      <span>{text}</span>
      <span> </span>
      <span
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={click}>{highlight}</span>
  </p>
}
function FormButton ({text, click})
{
  return <Button
      variant={"success"}
      className="py-3 w-100 fs-5 rounded-5 px-5"
      onClick={click}>{text}</Button>
}
function FormStatus ({text})
{
  return <p className="mt-4 mb-4 text-warning h-2">{text}</p>
}

export default Auth;
