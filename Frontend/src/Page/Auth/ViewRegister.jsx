/**
 * 
 * องค์ประกอบย่อยของหน้าต่าง เข้าสู่ระบบ
 * ใช้สำหรับแสดงการสมัครบัญชี
 * 
*/
"use strict";
"use client";


/**
 * 
 * ส่วนประกอบจาก React
 * 
*/
import { useState } from "react";

/**
 * 
 * ส่วนประกอบทั้วไป
 * 
*/
import 
{ 
    A, 
    Button, 
    Div, 
    Form, 
    Img, 
    Input, 
    Label, 
    MenuBar, 
    P, 
    Span 
}
from "../../Component/Common";
/**
 * 
 * เชื่อมต่อกับ Logic
 * 
*/
import auth from '../../Script/Auth'
import icon from '../../Script/Icon'


/**
 * 
 * พื้นที่สำหรับการแสดงองค์ประกอบ
 * 
*/
export default function Start ({view, username, password, email, status, blocking, callback})
{
    const [getView, setView] = view;
    const [getUsername, setUsername] = username;
    const [getPassword, setPassword] = password;
    const [getEmail, setEmail] = email;
    const [getStatus, setStatus] = status;
    const [getBlocking, setBlocking] = blocking;

    const [getPasswordConfirm, setPasswordConfirm] = useState ("");
    const [getRole, setRole] = useState (1);

    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: ย้อนกลับไปหน้าก่อน
    */
    function onClickBack (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        //
        // พาไปยังหน้าเข้าสู่ระบบ
        //
        setStatus ("");
        setView (2);
    }
    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: ยืนยันการป้อนข้อมูล
    */
    function onClickSubmit (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        //
        // กระบวณนี้ใช้เวลานานจึงต้องมีการบล็อกไว้ก่อน
        //
        setBlocking (true);
        setStatus ("");

        
        auth.create (getUsername, getPassword, getPasswordConfirm, getEmail, getRole).then (() =>
        {
            callback.onRegistered ();
        })
        .catch ((message) =>
        {
            setBlocking (false);
            setStatus (message);
        });
    }
    return <>
      <Div className={getView == 3 ? 'd-block' : 'd-none'}>
        <Div className="mb-4">
          <Button $align="left" $variant='outlined' onClick={onClickBack}>
            <Img src={icon.arrowLeftCircle}/>
            <Span>ย้อนกลับ</Span>
          </Button>
        </Div>
        <Form>
          <Div className='mb-2'>
            <Label className='w-100 fw-bold mb-2'>ชื่อผู้ใช้</Label>
            <Input className='w-100' type='text' autoComplete='username webauthn' autoFocus={true}
                  value={getUsername} onChange={(event) => setUsername (event.target.value)}>       
            </Input>
          </Div>
          <Div className='mb-2'>
            <Label className='w-100 fw-bold mb-2'>รหัสผ่าน</Label>
            <Input className='w-100' type='password' autoComplete='new-password webauthn' autoFocus={false}
                  value={getPassword} onChange={(event) => setPassword (event.target.value)}>       
            </Input>
          </Div>
          <Div className='mb-2'>
            <Label className='w-100 fw-bold mb-2'>รหัสผ่าน (ยืนยัน)</Label>
            <Input className='w-100' type='password' autoComplete='new-password webauthn' autoFocus={false}
                  value={getPasswordConfirm} onChange={(event) => setPasswordConfirm (event.target.value)}>       
            </Input>
          </Div>
          <Div className='mb-2'>
            <Label className='w-100 fw-bold mb-2'>อีเมล</Label>
            <Input className='w-100' type='email' autoComplete='email webauthn' autoFocus={false}
                  value={getEmail} onChange={(event) => setEmail (event.target.value)}>       
            </Input>
          </Div>
          <Div className="mb-2">
            <Label className='w-100 fw-bold mb-2'>คุณคือ</Label>
            <MenuBar direction="horizontal" className='d-flex' state={[getRole, setRole]}>
              <MenuBar.Child state={1} className='w-100' icon={icon.person} text="ผู้ใช้"/>
              <MenuBar.Child state={2} className='w-100' icon={icon.people} text="องค์กร"/>
            </MenuBar>
          </Div>
          <Div className='mt-3 mb-3'>
            <P className='text-p m-0 mb-1'>
              <Span>ฉันมีบัญชีแล้ว</Span>
              <Span> </Span>
              <A className='text-a' onClick={onClickBack}>เข้าสู่ระบบ</A>
            </P>
          </Div>
          <Div className='mb-2'>
            <P $variant="caution">{getStatus}</P>
          </Div>
          <Button className='w-100 mb-3 button-primary text-align-left' onClick={onClickSubmit}>
            <Img src={icon.plusCircle}/>
            <Span>สมัครสมาชิก</Span>
          </Button>
        </Form>
      </Div>
    </>
}