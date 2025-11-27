
import { useState } from "react";
import { Br, Button, Div, H1, Header, Hr, Input, Main, Modal, P, Section } from "../../Component/Common";

import api from '../../Script/Api'
import nav from '../../Script/Navigator'

// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //


export default Start;

/**
 * จุดเริ่มต้นของการแสดงผลเพจ
*/
function Start ({ref = null, visible = true, modified })
{
    const [changePwdShow, setChangePwdShow] = useState (false);
    const [changePwdOld, setChangePwdOld] = useState ("");
    const [changePwdNew, setChangePwdNew] = useState ("");
    const [changePwdNewConfirm, setChangePwdNewConfirm] = useState ("");

    function onClickChangePassword (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setChangePwdOld ("");
        setChangePwdNew ("");
        setChangePwdNewConfirm ("");
        setChangePwdShow (true);
    }
    function onClickChangePasswordSubmit (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
    }
    function onClickChangePasswordCancel (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setChangePwdShow (false);
    }
    function onClickLogout (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        try { api.auth.logout (); }
        finally
        {
            nav.auth ('/', undefined);
        }
        return;
    }

    return <>
      <Div className={visible ? 'd-block' : 'd-none'}>
        <Header className="mb-2">
          <H1 $variant='primary'>บัญชี</H1>
          <P $variant='secondary'>ตั้งค่าข้อมูลพื้นฐาน และความปลอดภัย</P>
          <Br/>
          <Hr/>
        </Header>
        <Main>
          <Section className="mb-2">
            <P className='w-100 mb-2'>ชื่อบัญชี</P>
            <Input className='w-100'/>
          </Section>
          <Section className="mb-2">
            <P className='w-100 mb-2'>รหัสผ่าน</P>
            <Button onClick={onClickChangePassword}>ตั้งรหัสผ่าน</Button>
          </Section>
          <Section className="mb-2">
            <Br/>
            <Hr/>
            <Br/>
            <Button $variant='caution'>ออกจากระบบ</Button>
          </Section>
        </Main>
        <Div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000}}>
          <Modal show={changePwdShow}>
            <Modal.Header className="mb-4">
              <H1>ตั้งค่ารหัสผ่านใหม่</H1>
              <Br/>
              <Hr/>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column h-100">
              <Div>
                 <P className="mb-2">รหัสผ่านเก่า</P>
                <Input className="mb-2 w-100" value={changePwdOld} onChange={(event) => setChangePwdOld (event.target.value)}/>
              </Div>
              <Div>
                 <P className="mb-2">รหัสผ่านใหม่</P>
                 <Input className="mb-2 w-100" value={changePwdNew} onChange={(event) => setChangePwdNew (event.target.value)}/>
              </Div>
              <Div>
                 <P className="mb-2">รหัสผ่านใหม่ (ยืนยัน)</P>
                 <Input className="mb-2 w-100" value={changePwdNewConfirm} onChange={(event) => setChangePwdNewConfirm (event.target.value)}/>
              </Div>
              <Div className="mt-4 mb-4">
                <P $variant='secondary' style={{ fontStyle:'italic' }}>รหัสผ่านที่ดีควรมีอย่างน้อย 8 ตัวอักษร</P>
              </Div>
              <Div className="flex-grow-1"></Div>
              <Div>
                <Button $variant="primary" className="me-1" style={{ width: '96px'}} onClick={onClickChangePasswordSubmit}>ยืนยัน</Button>
                <Button $variant="caution" className="me-1" style={{ width: '96px'}} onClick={onClickChangePasswordCancel}>ยกเลิก</Button>
              </Div>
            </Modal.Body>
          </Modal>
        </Div>
      </Div>
    </>;
}