/**
 * 
 * หน้าต่างผู้ดูแลระบบ (เรียกอีกกว่าหน้าต่าง Administrator)
 * 
*/
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Img, MenuBar, NavBar, Span } from '../../Component/Common';

import SecAccount   from './SecAccount'
import SecAuth      from './SecAuth'
import SecAds       from './SecAds'
import SecDashboard from './SecDashboard'
import Error        from '../Error'

import api          from '../../Script/Api'
import nav          from '../../Script/Navigator'
import icon         from '../../Script/Icon'
import styled       from 'styled-components'


// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

export default Start;

/**
 * จุดเริ่มต้นของการแสดงผลเพจ
*/
function Start ()
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
function StartResolve ()
{
    const mounted = useRef (false);
    const [menu, setMenu] = useState (1);
    const [menuShow, setMenuShow] = useState (true);
    const [menuShowButton, setMenuShowButton] = useState (window.innerWidth < 512);

    const [viewWidth, setViewWidth] = useState (window.innerWidth);
    const [viewHeight, setViewHeight] = useState (window.innerHeight);

    useEffect (() =>
    {
        if (mounted == null)
            return;
        if (mounted.current)
            return;

        function onWindowResize ()
        {      
            setViewWidth (window.innerWidth);
            setViewHeight (window.innerHeight);
        }
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
function StartRejected ()
{
    return <Error/>
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
          <MenuBar.Child state={1} icon={icon.house} text='แดชบอร์ด'/>
          <MenuBar.Child state={2} icon={icon.unlock} text='การยืนยันตัวตน'/>
          <MenuBar.Child state={3} icon={icon.person} text='บัญชี'/>
          <MenuBar.Child state={4} icon={icon.send} text='โฆษณา'/>
          <MenuBar.Condition state={api.auth.getRole () == api.auth.ROLE_TESTER || api.auth.getRole () == api.auth.ROLE_DEVELOPER}>
            <MenuBar.Separator/>
            <MenuBar.Child state={5} icon={icon.fileEarmarkPlay} text='ดีบัค API'/>
            <MenuBar.Child state={6} icon={icon.chat} text='ดีบัค UI'/>
            <MenuBar.Child state={7} icon={icon.sticky} text='ดีบัค Storage'/>
          </MenuBar.Condition>
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
        <SecDashboard menu={menu}/>
        <SecAuth menu={menu}/>
        <SecAccount menu={menu}/>
        <SecAds menu={menu}/>
      </ContentViewport>
    </>
}