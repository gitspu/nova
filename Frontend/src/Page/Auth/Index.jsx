/**
 * 
 * หน้าต่างเข้าสู่ระบบ
 * 
*/
'use client';

import { useEffect, useRef, useState } from 'react';

import background   from '../../Asset/Background/AuthBackground.webp' 
import styled       from 'styled-components'
import navigator    from '../../Script/Navigator'

import ViewIntro    from './ViewIntro'
import ViewLogin    from './ViewLogin'
import ViewRegister from './ViewRegister'
import ViewRecovery from './ViewRecovery'
import ViewLogout   from './ViewLogout'

import 
{
    Div,
    Header,
    Main,
    Img,
    Label,
    P
} 
from '../../Component/Common'
import { auth } from '../../Script/Api';

// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

/**
 * 
 * พื้นที่หลักการแสดงผลหน้าเข้าสู่ระบบ
 * 
*/
export default function Start ()
{
    const mounted = useRef (false);
    const memory = useRef ({
        afterLogin: "",
        afterRegister: ""
    });
    const callback = useRef ({
        onLogged: onResultLogged,
        onRegistered: onResultRegistered
    });

    const [view, setView] = useState ((auth.isLogged () && auth.isActive ()) ? 5 : 1);           // หน้าปัจบุบันที่ผู้ใช้กำลังอยู่
    const [blocking, setBlocking] = useState (false); // สถานะบอกว่ามีกระบวณพื้นหลังทำงานอยู่ UI จะไม่ตอบสนองในขณะนี้
    const [status, setStatus] = useState ("");        // สถานะล่าสุดของการเข้าสู่ระบบ

    const [username, setUsername] = useState ("");    // ข้อมูลชื่อผู้ใช้
    const [password, setPassword] = useState ("");    // ข้อมูลรหัสผ่าน
    const [email, setEmail] = useState ("");          // ข้อมูลอีเมล

    function onLoadSearch ()
    {
        const search = new URLSearchParams (location.search);
        const key = "context";
        const mem = memory.current;

        //
        // เปลี่ยนรูปของ URL ทำให้สั้นมากขึ้นเพื่อป้องกันความเข้าใจผิดของผู้ใช้
        //
        history.replaceState ({}, document.title, navigator.LINK_AUTH, "");
        //
        // ดึงข้อมูลบริบทจาก URL
        //
        const context = search.get (key);

        try
        {
            if (context != null)
            {
                const contextDecoded = atob (context);
                const contextObj = JSON.parse (contextDecoded);
                const afterLogin = contextObj ["redirectLogin"];
                const afterRegister = contextObj ["redirectRegister"];
                
                //
                // ลิงค์ที่ระบบจะพาไปเมื่อเข้าสู่ระบบเสร็จสิ้น
                //
                mem.afterLogin = afterLogin;
                mem.afterRegister = afterRegister;
    
                if (mem.afterLogin == null) mem.afterLogin = navigator.LINK_HOME;
                if (mem.afterRegister == null) mem.afterRegister = navigator.LINK_HOME;
    
                console.log ("UI/Auth: Redirection is memorized");
                return;
            }
            console.warn ("UI/Auth: Redirection isn't provided, default link will be used");
        }
        catch (ex)
        {
            console.error (ex);
            console.warn ("UI/Auth: Exception has been thrown in context parsing, redirection may won't work")
        }
        mem.afterLogin = navigator.LINK_HOME;
        mem.afterRegister = navigator.LINK_HOME;

        return;
    }
    function onResultLogged ()
    {
        window.location.pathname = memory.current.afterLogin;
    }
    function onResultRegistered ()
    {
        window.location.pathname = memory.current.afterRegister;
    }

    //
    // คำสั่งนี้ทำงานแค่หนึ่งครั้งเท่านั้น (ในขณะที่ส่วนประกอบยังคงอยู่)
    //
    useEffect (() =>
    {
        if (mounted == null)
            return;
        if (mounted.current)
            return;
        
        onLoadSearch ();

        document.title = "NOVA เข้าสู่ระบบ";
        mounted.current = true;

        return () => 
        {
            mounted.current = false;
        }
    },
    []);

    return <>
      <VwRoot>
        <VwBack>
          {/* อะไรสักอย่างแหละ */}
        </VwBack>    
        <VwFront>
          <Window>
            <BGImage src={background} alt=''/>
            <BGImageGradient/>
            <ViewRegion>
              <Header>
                <Label $variant='primary' $size='h1' $weight='bold'>NOVA</Label>
                <P $variant='secondary'>เริ่มต้นอนาคตเพียงแค่ปลายนิ้ว</P>
              </Header>
              <Main>
                <ViewIntro 
                    view={[view, setView]}
                    status={[status, setStatus]}
                    blocking={[blocking, setBlocking]}
                    callback={callback.current}/>
                <ViewLogin 
                    view={[view, setView]} 
                    username={[username, setUsername]}
                    password={[password, setPassword]}
                    status={[status, setStatus]}
                    blocking={[blocking, setBlocking]}
                    callback={callback.current}/>
                <ViewRegister 
                    view={[view, setView]}
                    username={[username, setUsername]}
                    password={[password, setPassword]}
                    email={[email, setEmail]}
                    status={[status, setStatus]}
                    blocking={[blocking, setBlocking]}
                    callback={callback.current}/>
                <ViewRecovery 
                    view={[view, setView]}
                    username={[username, setUsername]}
                    status={[status, setStatus]}
                    blocking={[blocking, setBlocking]}/>
                <ViewLogout view={[view, setView]}>
                </ViewLogout>
              </Main>
            </ViewRegion>
          </Window>
        </VwFront>
      </VwRoot>
    </>
}

// ==================================================================================================== //
//                                                                                                      //
// COMPONENT                                                                                            //
//                                                                                                      //
// ==================================================================================================== //

const VwRoot = styled.div `
    pointer-events: all;
    position: absolute; 
    inset: 0;
    overflow: hidden;
    background-color: var(--app-bg-1);
`;
const VwBack = styled.div `
    pointer-events: all;
    position: absolute; 
    inset: 0;
    overflow: hidden;
`;
const VwFront = styled.div `
    pointer-events: all;
    position: absolute; 
    inset: 0;
    overflow: hidden;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    align-items: center;
    justify-content: center;
`;


const Window = styled.div `

    position: relative;

    width: 100%;
    height: 80%;

    max-width: 1100px;
    max-height: 840px;

    overflow: clip;

    background-color: var(--app-bg-2);
    border:           var(--app-bg-border-2);
    border-radius:    var(--app-bg-radius-2);
    margin: 48px 48px;

    animation-name: auth-window-show;
    animation-duration: 500ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: forwards;

    @media (max-width: 576px)
    {
        background-color: transparent;
        border: none;
        border-radius: 0px;

        max-width: 100%;
        max-height: 100%;
        margin: 0;
    }
    @keyframes auth-window-show
    {
        from { 
            opacity: 0; 
            transform: scale(0.75)
        }
        to { 
            opacity: 1; 
            transform: scale(1.0)
        }
    }
`;
const BGImage = styled.img `

    display: block;

    position: absolute;
    inset: 0;
    object-fit: cover;

    width: 60%;
    height: 100%;

    @media (max-width: 576px)
    {
        display: none;
    }
`;
const BGImageGradient = styled.div `

    display: block;

    position: absolute;
    inset: 0;
    right: 40%;

    background: linear-gradient(to right, #00000000, var(--app-bg-2));

    @media (max-width: 576px)
    {
        display: none;
    }
`
const ViewRegion = styled.div `

    display: block;

    position: absolute;
    inset: 0;
    left: 60%;

    padding: 24px;

    & > header
    {
        width: 100%;
        height: 15%;
    }
    & > main
    {
        width: 100%;
        height: 85%;
    }

    @media (max-width: 576px)
    {
        left: 0%;
    }

    & > main > *
    {
        animation-name: auth-window-region-show;
        animation-duration: 500ms;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        animation-fill-mode: forwards;

        @keyframes auth-window-region-show
        {
            from { 
                opacity: 0; 
                transform: scale(0.75)
            }
            to { 
                opacity: 1; 
                transform: scale(1.0)
            }
        }
    }


`;