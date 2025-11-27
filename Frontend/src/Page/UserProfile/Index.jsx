import styled from "styled-components";
import { Button, Div, H1, Header, Main, P, Code } from "../../Component/Common";

import ThemeDefault from './ThemeDefault'

import api from '../../Script/Api';
import navigator from "../../Script/Navigator";

// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

export default function Start ()
{
    const auth = api.auth;
    const profileOf = api.profileOf;

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
    // ลองดึงข้อมูลโปรไฟล์
    const state = 
    {
        basic:      new auth.DataBasic (),
        contact:    new profileOf.DataContact (),
        education:  new profileOf.DataEducation (),
        interest:   new profileOf.DataInterest (),
        job:        new profileOf.DataJob (),
        personal:   new profileOf.DataPersonal (),
        skill:      new profileOf.DataSkill (),
        social:     new profileOf.DataSocial (),
        theme:      new profileOf.DataTheme (),
        editable:   (id == auth.getAccess ())
    };
    try
      {
          state.basic     = auth.getBasic (id);
          state.contact   = profileOf.getContact (id);
          state.education = profileOf.getEducation (id);
          state.interest  = profileOf.getInterest (id);
          state.job       = profileOf.getJob (id);
          state.personal  = profileOf.getPersonal (id);
          state.skill     = profileOf.getSkill (id);
          state.social    = profileOf.getSocial (id);
          state.theme     = profileOf.getTheme (id);
      }
      catch (exception)
      {
          console.error (exception);
  
          if (exception instanceof api.auth.ErrorArgument || 
              exception instanceof api.profileOf.ErrorArgument)
          {
              return (<StartNotFound/>);
          }
          return (<StartError message={exception}/>);
      }
  
      switch (state.theme.profileLayout)
      {
          case 0:
          case 1:
        default:    return <ThemeDefault id={id} state={state}/>
          case 2:   return <ThemeDefault id={id} state={state}/>
      }
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
function StartError ()
{
    return <>
      <Viewport> 
        <H1 className="mb-2">🤤 เอ้ ๆ แปลกจัง ๆ</H1>
        <P className="mb-4">ลิงค์โปรไฟล์นี้ไม่ถูกต้อง หรือ ไม่มีอยู่ในระบบ</P>
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