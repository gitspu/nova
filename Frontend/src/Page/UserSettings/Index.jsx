/**
 * 
 * หน้าต่างผู้ดูแลระบบ (เรียกอีกกว่าหน้าต่าง Administrator)
 * 
*/
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Div, Label, MenuBar, Span } from '../../Component/Common';

import SectionAccount from './IndexAccount';
import SectionProfile from './IndexProfile'

import api from '../../Script/Api'
import icon from '../../Script/Icon'
import styled from 'styled-components'
import { Toast, ToastContainer } from 'react-bootstrap';


// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

/**
 * จุดเริ่มต้นของการแสดงผลเพจ
*/
export default function Start ()
{
    const search = new URLSearchParams (window.location.search);
    const jump = search.get ('to');

    const mounted = useRef (false);
    const [menu, setMenu] = useState (jump != null ? jump : 1);
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
    </>
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
    top: 56px;
`;
const HeaderViewport = styled.div `
    position: absolute;
    inset: 0px 0px auto 0px;
    height: 56px;
`;

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
        padding-right: 12px;
    }
    @media (max-width: 512px) 
    {
        pointer-events: all;
        background-color: #ffffff;
        margin: 0;
    }
`;
const Menu = ({menu, menuShow}) =>
{
    const [getMenuShow] = menuShow;

    return <>
      <MenuViewport style={{ display: getMenuShow ? 'block' : 'none' }}>
        <MenuBar direction='vertical' state={menu}>
          <MenuBar.Child state={1} icon={icon.unlock} text='บัญชี'/>
          <MenuBar.Child state={2} icon={icon.person} text='โปรไฟล์'/>
          {/* <MenuBar.Condition state={menu[0] == 2 || (menu[0] >= 20 && menu[0] < 30)}>
            <MenuBar.Child state={21} text='ข้อมูลส่วนตัว'/>
            <MenuBar.Child state={22} text='ข้อมูลทำงาน'/>
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
        <SectionAccount visible={menu[0] == 1}/>
        <SectionProfile visible={menu[0] == 2 || (menu[0] >= 20 && menu[0] < 30)}/>
      </ContentViewport>
    </>;
}