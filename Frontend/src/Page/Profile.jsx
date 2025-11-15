import * as api from "../Script/Api"

import { ProfileThemeMini } from "./ProfileThemeMini";
import { H1, P } from "../Component/Common2";

import './Style/Profile.css'

export function Profile ({inset})
{
    //
    // มองหาข้อมูลโปรไฟล์ที่ต้องการ
    //
    const url = new URL (window.location.toString ());
    const search = url.searchParams;

    let id = search.get ("id");

    if (id == null || id == "")
    {
        // ลิงค์อาจไม่ถูกต้อง
        id = api.auth.getAccess ();
    }

    // ลองดึงข้อมูลโปรไฟล์
    const state = 
    {
        contact:    new api.profileOf.DataContact (),
        education:  new api.profileOf.DataEducation (),
        interest:   new api.profileOf.DataInterest (),
        job:        new api.profileOf.DataJob (),
        personal:   new api.profileOf.DataPersonal (),
        skill:      new api.profileOf.DataSkill (),
        social:     new api.profileOf.DataSocial (),
        theme:      new api.profileOf.DataTheme (),

        editable:  (id == api.auth.getAccess ())
    };

    try
    {
        state.contact   = api.profileOf.getContact (id);
        state.education = api.profileOf.getEducation (id);
        state.interest  = api.profileOf.getInterest (id);
        state.job       = api.profileOf.getJob (id);
        state.personal  = api.profileOf.getPersonal (id);
        state.skill     = api.profileOf.getSkill (id);
        state.social    = api.profileOf.getSocial (id);
        state.theme     = api.profileOf.getTheme (id);
    }
    catch (exception)
    {
        console.error (exception);

        if (exception instanceof api.profileOf.ErrorArgument)
        {
            return <>
              <ProfileNotFound inset={inset}/>
            </> 
        }
        
        return <>
          <ProfileError inset={inset} message={exception}/>
        </>
    }

    switch (state.theme.layout)
    {
        case 0:
        default:
          return <ProfileThemeMini inset={inset} state={state}/>
    }
}
export function ProfileNotFound ({inset})
{
    return <>
      <div className='page-profile' style={{ inset: inset }}>
        <div className='not-found'>
          <H1 value='🤤 เอ้ ๆ แปลกจัง ๆ'/>
          <br/>
          <P value="ลิงค์โปรไฟล์นี้ไม่ถูกต้อง หรือ ไม่มีอยู่ในระบบ"/>
        </div>
      </div>
    </>
}
export function ProfileError ({inset, message})
{
    return <>
      <div className='page-profile' style={{ inset: inset }}>
        <div className='error'>
          <H1 value='😭 ระบบเกิดข้อขัดข้อง'/>
          <br/>
          <P value={`นี้คือรายละเอียดทางเทคนิค (ถ้าคุณต้องการ)`}/>
          <P value={String(message)}/>
        </div>
      </div>
    </>
}