/**
 * 
 * องค์ประกอบย่อยของหน้าต่าง เข้าสู่ระบบ
 * ใช้สำหรับแสดงตอนป้องข้อมูลเข้าสู่ระบบ
 * 
*/
"use strict";
"use client";
/**
 * 
 * ส่วนประกอบจาก React
 * 
*/
import { useEffect, useRef, useState } from "react";
/**
 * 
 * ส่วนประกอบทั้วไป
 * 
*/
import 
{ 
    A,
    Div, 
    Header, 
    Main, 
    Span, 
    Img, 
    Button, 
    P, 
    Form, 
    Section, 
    Input, 
} 
from "../../Component/Common";

/**
 * 
 * เชื่อมต่อกับ Logic
 * 
*/
import auth from "../../Script/Auth"
import icon from '../../Script/Icon'

/**
 * 
 * พื้นที่สำหรับการแสดงองค์ประกอบ
 * 
*/
export default function Start ({view, username, password, status, blocking, callback})
{
    const [getView, setView] = view;
    const [getUsername, setUsername] = username;
    const [getPassword, setPassword] = password;
    const [getStatus, setStatus] = status;
    const [getBlocking, setBlocking] = blocking;

    const [focused, setFocused] = useState (1);

    const refUsername = useRef (null);
    const refPassword = useRef (null);

    const visible = getView == 2;

    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: ย้อนกลับ
    */
    function onClickBack (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setStatus ("");
        setView (1);
    }
    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: สมัครสมาชิกแทน
    */
    function onClickRegister (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setView (3);
    }
    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: กู้คืนบัญชี
    */
    function onClickRecovery (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setView (4);
    }
    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: ยืนยันการเข้าสู่ระบบ
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
        //
        // จงทำงาน ๆๆ
        //
        auth.login (getUsername, getPassword).then (() =>
        {
            callback.onLogged ();
        })
        .catch ((message) =>
        {
            setBlocking (false);
            setStatus (message);
        });
    }
    function onInputKeyDown (event)
    {
        if (event.key == "Enter" && !event.shiftKey && !event.altKey)
        {
            event.preventDefault ();
            event.stopPropagation ();

            switch (focused)
            {
                case 1:
                  refPassword.current.focus ();
                  break;
                case 2:
                  onClickSubmit (event);
                  break;
            }
        }
    }

    //
    // คำสั่งนี้ทำงานเมื่อองค์ประกอบนี้แสดงผล
    // ซึ่งอาจทำให้ Browser พยายามแสดงหน้าจัดการรหัสผ่าน ทำให้การเข้าสู่ระบบสะดวกมากขึ้น
    //
    useEffect (() =>
    {
        if (visible)
        {
            refUsername.current.focus ();
        }
    },
    [visible]);

    return <>
      <Div style={{
          display: visible ? 'flex' : 'none',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%'
      }}>
        <Header className='mb-4'>
          <Button $align='left' $variant='outlined' onClick={onClickBack}>
            <Img src={icon.arrowLeftCircle}/>
            <Span>ย้อนกลับ</Span>
          </Button>
        </Header>
        <Main className='mb-4'>
          <Form action=''>
            <Section>
              <P className='w-100 mb-2' $weight='bold'>ชื่อผู้ใช้</P>
              <Input className='w-100 mb-2' 
                     type='text'
                     autoComplete='name webauthn'
                     value={getUsername}
                     onChange={(event) => setUsername (event.target.value)}
                     onKeyDown={(event) => onInputKeyDown (event)}
                     onFocus={() => setFocused (1)}
                     onBlur={() => setFocused (0)}
                     ref={refUsername}
              />
            </Section>
            <Section>
              <P className='w-100 mb-2' $weight='bold'>รหัสผ่าน</P>
              <Input className='w-100 mb-2'
                     type='password'
                     autoComplete='current-password webauthn'
                     value={getPassword}
                     onChange={(event) => setPassword (event.target.value)}
                     onFocus={() => setFocused (2)}
                     onBlur={() => setFocused (0)}
                     ref={refPassword}
              />
            </Section>
            <Section className='mt-4 mb-4'>
              <P className='mb-1'>
                <Span>ฉันไม่มีบัญชี</Span>
                <Span> </Span>
                <A onClick={onClickRegister}>สมัครเลย</A>
              </P>
              <P className='mb-1'>
                <Span>ฉันลืมรหัสผ่าน</Span>
                <Span> </Span>
                <A onClick={onClickRecovery}>กู้คืนบัญชี</A>
              </P>
            </Section>
            <Section className='mb-4'>
              <P $variant='caution'>{status}</P>
            </Section>
            <Section>
              <Button type='submit' onClick={onClickSubmit} className='w-100'>
                <Img src={icon.unlock}/>
                <Span>เข้าสู่ระบบ</Span>
              </Button>
            </Section>
          </Form>
        </Main>
      </Div>
    </>
}