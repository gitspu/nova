import { useEffect, useRef, useState } from "react";

import { Button, Div, Header, Main, P, Checkbox, H1, Hr, Span, Section, Img, Label, Br } from "../../Component/Common";

import api from "../../Script/Api"
import icon from "../../Script/Icon"

// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

export default Start;

function Start ({menu})
{
    return <StartResolve menu={menu}/>
}
function StartResolve ({menu})
{
    const mount = useRef (false);

    const auth = api.auth;
    const visible = menu[0] == 2;
    const config = useRef (new auth.ServerConfig ());
    const configLast = useRef (new auth.ServerConfig ());

    const statusInterval = useRef (null);
    const [statusText, setStatusText] = useState ('');

    const [enableCreation, setEnableCreation] = useState (false);
    const [enableDeletion, setEnableDeletion] = useState (false);
    const [enableLogin, setEnableLogin] = useState (false);
    const [modified, setModified] = useState (false);

    function onRead ()
    {
        const block = config.current;

        if (block == null)
            return;

        setEnableCreation (block.enableCreation);
        setEnableDeletion (block.enableDeletion);
        setEnableLogin (block.enableLogin);
    }
    function onWrite ()
    {
        const block = config.current;

        if (block == null)
            return;

        block.enableCreation = enableCreation;
        block.enableDeletion = enableDeletion;
        block.enableLogin = enableLogin;
    }
    function onApply ()
    {
        auth.setServerConfig (config.current).then (() =>
        {
            configLast.current.enableCreation = config.current.enableCreation;
            configLast.current.enableLogin = config.current.enableLogin;
            configLast.current.enableDeletion = config.current.enableDeletion;
    
            setStatusText ('บันทึกการตั้งค่าเรียบร้อยแล้ว');
            setModified (false);
    
            clearInterval (statusInterval.current);
            statusInterval.current = setInterval (() =>
            {
                setStatusText ('');
            },
            2500);
        })
        .catch ((except) =>
        {
            console.error (except);
            setStatusText ('เกิดข้อผิดพลาดในขณะที่โหลดข้อมูล: ' + except);

            clearInterval (statusInterval.current);
            statusInterval.current = setInterval (() =>
            {
                setStatusText ('');
            },
            5000);
        });
    }

    const onModified = () =>
    {
        if (config == null || configLast == null) return;
        if (config.current == null || configLast.current == null) return;

        const first = config.current;
        const second = configLast.current;

        const data = 
          (first.enableCreation !== second.enableCreation) ||
          (first.enableDeletion !== second.enableDeletion) ||
          (first.enableLogin !== second.enableLogin);

        setModified (data);
    }

    //
    // ทำงานแค่ครั้งเดียว (เมื่อหน้าเว็บถูกโหลด)
    //
    useEffect (() =>
    {
        if (mount.current)
            return;

        mount.current = true;
        auth.getServerConfig ().then ((x) =>
        {
            config.current = { ... x };
            configLast.current = { ...  x };

            onRead ();
        });

        return () => { mount.current = false; }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    //
    // ทำงานทุกครั้งเมื่อ UI มีการเปลี่ยนแปลง
    //
    useEffect (() =>
    {
        if (mount.current == false)
            return;

        onWrite ();
        onModified ();
    });

    return (
      <Div style={{ display: visible ? 'block' : 'none' }}>
        <Header className="mb-3">
          <H1>การยืนยันตัวตน</H1>
          <P>ตั้งค่าเปิดหรือปิดใช้งานตัวเลือกการเข้าสู่ระบบในรูปแบบต่าง ๆ</P>
          <Div className="mt-2 mb-2">
            <Hr/>
          </Div>
        </Header>
        <Main className="mb-3">
           <Section className="mb-2">
            {statusText != "" && (
              <Div style={{ 
                backgroundColor: 'var(--app-bg-2)',
                border: 'var(--app-bg-border-2)',
                borderRadius: 'var(--app-bg-radius-2)',
                padding: '8px',
                width: '100%'
              }}>
                <Img className='me-2' src={icon.infoCircle}/>
                <Label>{statusText}</Label>
              </Div>
            )}
          </Section>
          <Section>
            <Checkbox className='mb-2' state={[enableCreation, setEnableCreation]} title='เปิดใช้งาน การสมัครบัญชี' subtitle='อนุญาตให้ผู้ที่ต้องการสามารถสมัครสมาชิกเพื่อเข้าถึงแพลตฟอร์มได้'/>
            <Checkbox className='mb-2' state={[enableLogin, setEnableLogin]} title='เปิดใช้งาน การเข้าสู่ระบบ' subtitle='อนุญาตให้ผู้ใช้ที่สมัครสมาชิกแล้วสามารถเข้าสู่ระบบแพลตฟอร์ม ผู้ดูแลระบบยังสามารถเข้าถึงแพลตฟอร์มได้แม้ว่าตั้งค่านี้จะถูกปิดใช้งาน'/>
            <Checkbox className='mb-2' state={[enableDeletion, setEnableDeletion]} title='เปิดใช้งาน การลบบัญชี' subtitle='อนุญาตให้ผู้ใช้ที่สมัครสมาชิกแล้วสามารถลบบัญชีของตนเองได้'/>
          </Section>
          <Div>
            <P $variant='caution'>คุณไม่ควรเปลี่ยนตั้งค่านี้ เว้นแต่ว่าจะจำเป็นจริง ๆ ถ้าต้องการโปรดระมัดระวัง</P>
            <Br/>
            <Button $variant='caution' disabled={!modified} onClick={onApply}>บันทึก</Button>
          </Div>
        </Main>
      </Div>
    );
}

// ==================================================================================================== //
//                                                                                                      //
// COMPONENT                                                                                            //
//                                                                                                      //
// ==================================================================================================== //
