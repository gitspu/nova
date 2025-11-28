/**
 * 
 * องค์ประกอบย่อยของหน้าต่าง เข้าสู่ระบบ
 * ใช้สำหรับแสดงการออกจากระบบ (ถ้าต้องการ)
 * 
*/
"use strict";
"use client";

/**
 * 
 * ส่วนประกอบทั้วไป
 * 
*/
import { Button, H1, P } 
from "../../Component/Common";

/**
 * 
 * เชื่อมต่อกับ Logic
 * 
*/
import api from "../../Script/Api";


/**
 * 
 * พื้นที่สำหรับการแสดงองค์ประกอบ
 * 
*/
export default function Start ({view})
{
    const auth = api.auth;
    const [getView, setView] = view;

    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: ออกจากระบบ
    */
    function onClickLogout (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }

        try 
        { 
            // นำผู้ใช้ออกจากระบบ
            auth.logout (); 
        }
        finally 
        { 
            // โหลดหน้าเว็บใหม่อีกครั้ง
            location.reload (); 
        }
    }
    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: ยกเลิกการทำงาน
    */
    function onClickCancel (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        //
        // เราไม่รู้แหละว่าก่อนหน้านี้มีอะไร
        //
        history.back ();
    }

    return <>
      <div className={getView == 5 ? 'd-block' : 'd-none'}>
        <div className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
        <div className='mb-3'>
            <H1 className="mb-3">คุณได้ทำการเข้าสู่ระบบเรียบร้อยแล้ว</H1>
            <P>หากคุณต้องการที่จะออกจากระบบ ให้กดปุ่มด้านล่าง</P>
        </div>
        <div className='mb-3'>
            <Button $variant='caution' onClick={onClickLogout}>ออกจากระบบ</Button>
            <Button $variant='primary' className="ms-1" onClick={onClickCancel}>ยกเลิก</Button>
        </div>
        </div>
      </div>
    </>
}