/**
 * 
 * หน้าต่างสำหรับการแสดงโปรไฟล์ของผู้ใช้ (ผู้หางาน)
 * 
*/
"use strict";
"use client";

/**
 * 
 * ส่วนประกอบจาก React
 * 
*/
import { useEffect, useReducer, useRef, useState } from "react";
/**
 * 
 * ส่วนประกอบทั้วไป
 * 
*/
import 
{ 
    Button, 
    Div, 
    H1, 
    Header, 
    Main, 
    P, 
    Code, 
    Br 
} 
from "../../Component/Common";
/**
 * 
 * ตกแต่ง CSS
 * 
*/
import styled from "styled-components";
/**
 * 
 * เชื่อมต่อกับ Logic
 * 
*/
import api from '../../Script/Api';
import navigator from "../../Script/Navigator";
/**
 * 
 * องค์ประกอบย่อยของหน้าต่างเข้าสู่ระบบ
 * 
*/
import ThemeDefault     from './ThemeDefault'
import ThemeDefault2    from './ThemeDefault_v2'


/**
 * 
 * จุดเริ่มต้นของการแสดงผลเพจ
 * 
*/
export default function Start ()
{
    const auth = api.auth;
    const url = new URL (window.location.toString ());
    const urlSearch = url.searchParams;

    let id = urlSearch.get ("id");
  
    if (id == null || id == "")
    {
        // ลิงค์อาจไม่ถูกต้อง
        id = auth.getAccess ();

        if (isNaN (id) || id == null)
        {
            // ต้องเข้าสู่ระบบ
            navigator.auth (window.location.pathname, undefined);
            return;
        }
    }
    if (id == null || id == undefined || isNaN (id))
    {
        return <StartError/>;
    }
    return <StartResolve userId={id}/>;
}
function StartResolve ({userId})
{
    const auth = api.auth;
    const profile = api.profile;
    const profileOf = api.profileOf;

    const mounted = useRef (false);
    const exception = useRef (null);
    const dataset = useRef ({
        basic:      new auth.DataBasic (),
        contact:    new profileOf.DataContact (),
        education:  new profileOf.DataEducation (),
        interest:   new profileOf.DataInterest (),
        job:        new profileOf.DataJob (),
        language:   new profileOf.DataLanguage (),
        personal:   new profileOf.DataPersonal (),
        skill:      new profileOf.DataSkill (),
        social:     new profileOf.DataSocial (),
        theme:      new profileOf.DataTheme (),
        editable:   (userId == auth.getAccess ())
    });

    const [,forceUpdate] = useReducer (x => x + 1);
    const [view, setView] = useState (0);

    function onRefreshData ()
    {
        return new Promise ((resolve, reject) =>
        {
            const asyncBasic      = auth.getBasic (userId).then ((x) => dataset.current.basic = x);
            const asyncContact    = profileOf.getContact (userId).then ((x) => dataset.current.contact = x);
            const asyncEducation  = profileOf.getEducation (userId).then ((x) => dataset.current.education = x);
            const asyncInterest   = profileOf.getInterest (userId).then ((x) => dataset.current.interest = x);
            const asyncJob        = profileOf.getJob (userId).then ((x) => dataset.current.job = x);
            const asyncLanguage   = profileOf.getLanguage (userId).then ((x) => dataset.current.language = x);
            const asyncPersonal   = profileOf.getPersonal (userId).then ((x) => dataset.current.personal = x);
            const asyncSkill      = profileOf.getSkill (userId).then ((x) => dataset.current.skill = x);
            const asyncSocial     = profileOf.getSocial (userId).then ((x) => dataset.current.social = x);
            const asyncTheme      = profileOf.getTheme (userId).then ((x) => dataset.current.theme = x);
    
            Promise.all ([
              asyncBasic,
              asyncContact,
              asyncEducation,
              asyncInterest,
              asyncJob,
              asyncLanguage,
              asyncPersonal,
              asyncSkill,
              asyncSocial,
              asyncTheme,
            ])
            .then (() => resolve ())
            .catch ((exception) => reject (exception));
        });
    }
    function onRefreshUI ()
    {
        forceUpdate ();
    }

    //
    // ทำงานแค่ครั้งเดียวคือตอนเว็บโหลด
    //
    useEffect (() =>
    {
        if (mounted == null)
            return;
        if (mounted.current)
            return;

        onRefreshData ()
          .then (() =>
          {
              if (userId != auth.getAccess ())
              {
                  if (dataset.current.personal.visibility == profile.VISIBILITY_RESTRICTED)
                  {
                        if (!auth.isRole (auth.ROLE_ADMIN) && !auth.isRole (auth.ROLE_DEVELOPER) && !auth.isRole (auth.ROLE_EMPLOYER))
                        {
                            setView (2);
                            return;
                        }
                  }
                  if (dataset.current.personal.visibility == profile.VISIBILITY_PRIVATE)
                  {
                        if (!auth.isRole (auth.ROLE_ADMIN) && !auth.isRole (auth.ROLE_DEVELOPER))
                        {
                            setView (2);
                            return;
                        }
                  }                  
              }

              onRefreshUI ();
              setView (1);
          })
          .catch ((except) => 
          {
              console.error (except);
              exception.current = except;

              if (exception.current instanceof auth.ErrorArgument)
              {
                  setView (2);
              }
              else
              {
                  setView (3);
              }
          });

        return () => { mounted.current = false; }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    return <>
      {view == 0 && (<ThemeDefault2 oId={userId} oLoading={view == 0} rData={dataset}/>)}
      {view == 1 && (<ThemeDefault2 oId={userId} oLoading={view == 0} rData={dataset}/>)}
      {view == 2 && (<StartNotFound/>)}
      {view == 3 && (<StartError message={exception.current}/>)}
    </>
}

// ==================================================================================================== //
//                                                                                                      //
// COMPONENT                                                                                            //
//                                                                                                      //
// ==================================================================================================== //

const Viewport = styled.div `

    position: absolute;
    inset: 0;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    align-items: center;
    justify-content: center;

    background-color: var(--app-bg-1);
`;

function StartLoading ()
{
    return <Viewport style={{ zIndex: 100000 }}>

    </Viewport>
}
function StartNotFound ()
{
    return <>
      <Viewport> 
        <H1 className="mb-2">🤤 เอ้ ๆ แปลกจัง ๆ</H1>
        <P className="mb-4">ลิงค์โปรไฟล์นี้ไม่ถูกต้อง หรือ ไม่มีอยู่ในระบบ</P>
        <Button onClick={() => navigator.home ()}>กลับหน้าแรก</Button>
      </Viewport>
    </>
}
function StartError ({message})
{
    return <>
      <Viewport> 
        <H1 className="mb-2">😭 โอ้ ๆๆ แย่แล้ว</H1>
        <P className="mb-4">เกิดข้อผิดพลาดในขณะที่ระบบกำลังโหลดข้อมูล</P>
        <Br/>
        <Code>{String (message)}</Code>
        <Br/>
        <Button onClick={() => navigator.home ()}>กลับหน้าแรก</Button>
      </Viewport>
    </>
}

function NotFound ({message})
{
   return <>
      <Viewport> 
        <H1 className="mb-2">😭 ระบบเกิดข้อขัดข้อง</H1>
        <P className="mb-4">นี้คือรายละเอียดทางเทคนิค (ถ้าคุณต้องการ)</P>
        <Code className="mb-4">{String(message)}</Code>

        <Button onClick={() => navigator.home ()}>กลับหน้าแรก</Button>
      </Viewport>
    </>
}