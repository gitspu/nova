/**
 * 
 * หน้าต่างผู้ดูแลระบบ (เรียกอีกกว่าหน้าต่าง Administrator)
 * 
*/
"use strict";
"use client";

/**
 * 
 * ส่วนประกอบจาก React
 * 
*/
import { useEffect, useRef, useState } from 'react';
/**
 * 
 * ส่วนประกอบทั้วไป
 * 
*/
import 
{ 
    Button, 
    Img, 
    MenuBar, 
    NavBar, 
    Span 
} 
from '../../Component/Common';
/**
 * 
 * ตกแต่ง CSS
 * 
*/
import styled       from 'styled-components'
/**
 * 
 * เชื่อมต่อกับ Logic
 * 
*/
import api          from '../../Script/Api'
import nav          from '../../Script/Navigator'
import icon         from '../../Script/Icon'
/**
 * 
 * องค์ประกอบย่อยของหน้าต่างเข้าสู่ระบบ
 * 
*/
// import ViewAccount      from './ViewAccount'
import ViewAccount      from '../../Component/admin_pages/UserManagement'
import ViewAds          from './ViewAds'
import ViewAuth         from './ViewAuth'
// import ViewDashboard    from './ViewDashboard'
import ViewDashboard    from '../../Component/admin_pages/Dashboard'
import ViewJob          from '../../Component/admin_pages/JobManagement'
import ViewResume       from '../../Component/admin_pages/ResumeManagement'
import ViewError        from '../Error'


/**
 * 
 * จุดเริ่มต้นของการแสดงผลเพจ
 * 
*/
export default function Start ()
{
    const auth = api.auth;
    const accessible = api.auth.isLogged () && 
    [
        auth.ROLE_ADMIN, 
        auth.ROLE_TESTER, 
        auth.ROLE_DEVELOPER
    ]
    .indexOf (api.auth.getRole()) != -1;

    if (accessible) 
    {
        return <StartResolve/>;
    }
    return <StartRejected/>;
}
/**
 * 
 * จุดเริ่มต้นของการแสดงผลเพจ
 * (ผ่านการยืนยันตัวตน)
 * 
*/
function StartResolve ()
{
    const mounted = useRef (false);
    const [menu, setMenu] = useState (1);
    const [menuShow, setMenuShow] = useState (true);
    const [menuShowButton, setMenuShowButton] = useState (window.innerWidth < 512);

    const [viewWidth, setViewWidth] = useState (window.innerWidth);
    const [viewHeight, setViewHeight] = useState (window.innerHeight);

    /**
     * คำสั่งที่ทำงานต่อเมื่อขนาดของหน้าต่างมีการเปลี่ยนแปลง
    */
    function onWindowResize ()
    {      
        setViewWidth (window.innerWidth);
        setViewHeight (window.innerHeight);
    }

    useEffect (() =>
    {
        if (mounted == null)
            return;
        if (mounted.current)
            return;

        mounted.current = true;
        window.addEventListener ("resize", onWindowResize);
        
        return () => 
          { 
            mounted.current = false;
            window.removeEventListener ("resize", onWindowResize);
        }
    },
    []);

    useEffect (() =>
    {
        if (mounted == null)
            return;
        if (mounted.current == false)
            return;

        if (viewWidth >= 512)
        {
            setMenuShow (true);
            setMenuShowButton (false);
        }
        else
        {
            setMenuShowButton (true);
        }
    },
    [viewWidth, viewHeight]);

    return <>
        <Background/>
        <Content menu={[menu, setMenu]}/>
        <Menu menu={[menu, setMenu]} menuShow={[menuShow, setMenuShow]}/>
        <Header menuShow={[menuShow, setMenuShow]} menuShowButton={[menuShowButton, setMenuShowButton]}/>
    </>
}
/**
 * 
 * จุดเริ่มต้นของการแสดงผลเพจ
 * (ไม่ผ่านการยืนยันตัวตน)
 * 
*/
function StartRejected ()
{
    return <ViewError/>
}

// ==================================================================================================== //
//                                                                                                      //
// COMPONENT                                                                                            //
//                                                                                                      //
// ==================================================================================================== //

const Background = styled.div `
    background-color: var(--app-bg-1);
    position: absolute;
    inset: 0;
`;
const HeaderViewport = styled.div `
    position: absolute;
    inset: 0px 0px auto 0px;
    height: 56px;
`;
const Header = ({menuShow, menuShowButton}) =>
{
    const [getMenuShow, setMenuShow] = menuShow;
    const [getMenuShowButton] = menuShowButton;
    const [contextShow, setContextShow] = useState (false);

    function onContextHome (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        nav.home ();
    }
    function onContextLogout (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        try { api.auth.logout (); }
        finally { nav.auth ('/', undefined); }
    }

    return <>
      <HeaderViewport>
        <NavBar>
          <NavBar.Flex grow={1} justify='start'>
            <NavBar.Branding text="NOVA แผงควบคุมระบบ"/>
          </NavBar.Flex>
          <NavBar.Flex>
            <NavBar.Menu 
              onClick={() => setMenuShow (!getMenuShow)}
              style={{ display: getMenuShowButton ? 'block' : 'none' }}
            />
            <NavBar.Profile  onClick={() => setContextShow (!contextShow)}>
            <NavBar.ContextMenu className={contextShow ? 'd-block' : "d-none"}>
                <Button $align="left" onClick={onContextHome}>
                    <Img src={icon.house}/>
                    <Span>หน้าหลัก</Span>
                </Button>
                <Button $align="left" $variant='caution' onClick={onContextLogout}>
                    <Img src={icon.arrowLeft}/>
                    <Span>ออกจากระบบ</Span>
                </Button>
                </NavBar.ContextMenu>
            </NavBar.Profile>
          </NavBar.Flex>
        </NavBar>
      </HeaderViewport>
    </>
}

const MenuViewport = styled.div `
    pointer-events: none;
    position: absolute;
    inset: 56px 0px 0px 0px;
    margin: 0px 70% 0px 0px;

    & > *
    {
        pointer-events: all;
        max-width: 256px;
        margin: 0px 0px 0px auto;

        @media (max-width: 512px) 
        {
            max-width: 100%;
            margin: 0;    
        }
    }
    & > *
    {
        margin-top: 12px;
        padding-left: 12px;
    }
    @media (max-width: 512px) 
    {
        & > *
        {
            padding-left: 0px;
        }
        pointer-events: all;
        background-color: #ffffff;
        margin: 0;
        padding: 0px 12px;
    }
`;
const Menu = ({menu, menuShow}) =>
{
    const [getMenuShow] = menuShow;

    return <>
      <MenuViewport style={{ display: getMenuShow ? 'block' : 'none' }}>
        <MenuBar direction='vertical' state={menu}>
          <MenuBar.Child state={1} icon={icon.house} text='ภาพรวม'/>
          <MenuBar.Child state={3} icon={icon.people} text='จัดการบัญชี'/>
          <MenuBar.Child state={5} icon={icon.briefcase} text='จัดการงาน'/>
          <MenuBar.Child state={6} icon={icon.sticky} text='จัดการเรซูเม่'/>
          {/* <MenuBar.Child state={4} icon={icon.send} text='โฆษณา'/> */}
          <MenuBar.Separator title='อื่น ๆ'/>
          <MenuBar.Child state={2} icon={icon.unlock} text='การยืนยันตัวตน'/>
          {/* <MenuBar.Condition state={api.auth.getRole () == api.auth.ROLE_TESTER || api.auth.getRole () == api.auth.ROLE_DEVELOPER}>
            <MenuBar.Separator/>
            <MenuBar.Child state={5} icon={icon.fileEarmarkPlay} text='ดีบัค API'/>
            <MenuBar.Child state={6} icon={icon.chat} text='ดีบัค UI'/>
            <MenuBar.Child state={7} icon={icon.sticky} text='ดีบัค Storage'/>
          </MenuBar.Condition> */}
        </MenuBar>
      </MenuViewport>
    </>
}

const ContentViewport = styled.div `
    position: absolute;
    inset: 56px 0px 0px 0px;
    margin: 0px 0px 0px 30%;
    overflow: hidden scroll;

    & > *
    {
        width: 100%;
        max-width: 210mm;
        margin: 0px auto 0px 0px;
        padding: 0px 12px;

    } 
    & > *
    {
        margin-top: 12px;
    }
    @media (max-width: 512px) 
    {
        margin: 0;    
    }
`;
const Content = ({menu}) =>
{
    return <>
      <ContentViewport>
        <ViewDashboard menu={menu}/>
        <ViewAuth menu={menu}/>
        <ViewAccount menu={menu}/>
        <ViewAds menu={menu}/>
        <ViewJob menu={menu}/>
        <ViewResume menu={menu}/>
      </ContentViewport>
    </>
}