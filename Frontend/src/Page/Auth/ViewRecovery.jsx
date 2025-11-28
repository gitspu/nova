/**
 * 
 * องค์ประกอบย่อยของหน้าต่าง เข้าสู่ระบบ
 * ใช้สำหรับแสดงการกู้คืนบัญชี
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
    Button,
    Div, 
    Form, 
    Img, 
    Input, 
    Label, 
    P, 
    Span, 
} 
from '../../Component/Common';

/**
 * 
 * เชื่อมต่อกับ Logic
 * 
*/
import icon from '../../Script/Icon'


/**
 * 
 * พื้นที่สำหรับการแสดงองค์ประกอบ
 * 
*/
export default function Start ({view, username, status})
{
    const [getView, setView] = view;
    const [getUsername, setUsername] = username;
    const [getStatus, setStatus] = status;

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
        // พาไปยังหน้าต้อนรับ
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
        // ค่อยข้างจงใจเพราะตอนนี้เรายังไม่มีแผนที่จะรองรับระบบนี้
        //
        setStatus ('ขออภัย ระบบไม่พร้อมใช้งานในขณะนี้');
    }
    return <>
      <Div className={getView == 4 ? 'd-block' : 'd-none'}>
        <Div className='mb-2'>
            <Button $align='left' $variant='outlined' className='mb-3 button-primary button-outlined text-align-left' onClick={onClickBack}>
              <Img src={icon.arrowLeftCircle}/>
              <Span>ย้อนกลับ</Span>
            </Button>
        </Div>
        <Form action='#'>
            <Div className='mb-1'>
              <Label className='w-100 fw-bold mb-2'>ชื่อผู้ใช้</Label>
              <Input className='w-100' type='text' autoComplete='username webauthn' autoFocus={true}
                    value={getUsername} onChange={(event) => setUsername (event.target.value)}>       
              </Input>
            </Div>
            <Div className='mt-4 mb-4'>
              <P $variant="caution">{getStatus}</P>
            </Div>
            <Button className='w-100 mb-3 button-primary' onClick={onClickSubmit}>ดำเนินการต่อ</Button>
        </Form>
      </Div>
    </>
}