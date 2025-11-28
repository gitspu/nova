/**
 * 
 * องค์ประกอบย่อยของหน้าต่าง เข้าสู่ระบบ
 * ใช้สำหรับแสดงการต้อนรับผู้ใช้งาน
 * 
*/
"use strict";
"use client";

/**
 * 
 * ส่วนประกอบทั้วไป
 * 
*/
import 
{ 
    Div,
    P,
    Button,
    Img,
    Span,
    Header,
    Main,
    Footer,
    A,
} 
from "../../Component/Common";
/**
 * 
 * เชื่อมต่อกับ Logic
 * 
*/
import auth from "../../Script/Auth"
import icon from "../../Script/Icon"

/**
 * 
 * พื้นที่สำหรับการแสดงองค์ประกอบ
 * 
*/
export default function Start ({view, status, blocking, callback})
{
    const [getView, setView] = view;
    const [getStatus, setStatus] = status;
    const [getBlocking, setBlocking] = blocking;

    const visible = getView == 1;

    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: เข้าสู่ระบบ
    */
    function onClickLogin (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        //
        // พาไปหน้าของเข้าสู่ระบบ
        //
        setStatus ("");
        setView (2);
    }
    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: เข้าสู่ระบบด้วย Facebook
    */
    function onClickLoginFb (event)
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
        // พยายามเรียก API ของ Facebook
        //
        auth.loginFacebook ().then ((type) =>
        {
            console.log ("UI/Auth: Logged in (facebook)", type);
            
            switch (type)
            {
                case auth.RESOLVE_LOGGED: callback.onLogged (); break;
                case auth.RESOLVE_CREATED: callback.onRegistered (); break;
            }
        })
        .catch ((message) =>
        {
            setBlocking (false);
            setStatus (message);
        });
    }

    return <>
      <Div style={{
          display: visible ? 'flex' : 'none',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%'
      }}>
        <Header>
          <P className='mb-4'>ยินดีต้อนรับเรามาเริ่มต้นกันเลย เลือกวิธีการเข้าสู่ระบบของคุณ</P>
        </Header>
        <Main>
          <Button $variant='primary' $align='left' className='w-100 mb-1' disabled={getBlocking}
                  onClick={onClickLogin}>
            <Img src={icon.arrowRight}/>
            <Span>เข้าสู่ระบบ</Span>
          </Button>
          <Button $variant='secondary' $align='left' className='w-100 mb-1' disabled={getBlocking}
                  onClick={onClickLoginFb}>
            <Img src={icon.facebook}/>
            <Span>เข้าสู่ระบบด้วย Facebook</Span>
          </Button>
        </Main>

        <P className="mt-4 mb-4" $variant='caution'>{status}</P>
        <Div className='flex-grow-1'/>
        
        <Footer>
          <P $align='center'><A>เงื่อนไขการให้บริการ</A> | <A>นโยบายความเป็นส่วนตัว</A></P>
        </Footer>
      </Div>
    </>;
}