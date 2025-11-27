
import { useEffect, useRef, useState, useReducer } from 'react';

import api from '../../Script/Api'
import {profile, util} from '../../Script/Api'
import icon from '../../Script/Icon'
import styled from 'styled-components'

import { Br, Button, Div, H1, Header, Hr, Input, Main, P, Section, Label } from "../../Component/Common";
import { Toast, ToastContainer } from 'react-bootstrap';

import Contact from './SecProfileContact'
import Personal from './SecProfilePersonal'

// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

export default Start;

/**
 * จุดเริ่มต้นของการแสดงผลเพจ
*/
function Start ({visible, modified })
{
    const mounted   = useRef (false);
    const contact   = useRef (null);
    const education = useRef (null);
    const interest  = useRef (null);
    const job       = useRef (null);
    const personal  = useRef (null);
    const theme     = useRef (null);
    const skill     = useRef (null);
    const [forceUpdateIdx, forceUpdate] = useReducer (x => x + 1, 0);


    const onLoad = () =>
    {
        contact.current   = util.ignore (() => profile.getContact ());
        education.current = util.ignore (() => profile.getEducation ());
        interest.current  = util.ignore (() => profile.getInterest ());
        job.current       = util.ignore (() => profile.getJob ());
        personal.current  = util.ignore (() => profile.getPersonal ());
        theme.current     = util.ignore (() => profile.getTheme ());
        skill.current     = util.ignore (() => profile.getSkill ());

        forceUpdate ();
    }
    const onSave = () =>
    {
        profile.setContact (contact.current);
        profile.setEducation (education.current);
        profile.setInterest (interest.current);
        profile.setJob (job.current);
        profile.setPersonal (personal.current);
        profile.setTheme (theme.current);

        alert ("บันทึกข้อมูลเรียบร้อย");
    }

    useEffect (() =>
    {
        if (mounted.current)
            return;

        mounted.current = true;
        onLoad ();

        return () => { mounted.current = false; }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    return <>
      <Div className={visible ? 'd-block' : 'd-none'}>
        <Header className="mb-2">
            <H1 $variant='primary'>โปรไฟล์</H1>
            <P $variant='secondary'>ปรับแต่งข้อมูลเกี่ยวกับตัวคุณ</P>
            <Br/>
            <Hr/>
        </Header>
        <Main key={forceUpdateIdx}>
          <Div id='#profile-personal'>
            <Personal ref={personal}/>
          </Div>
          <Div id='#profile-contact'>
            <Contact ref={contact}/>
          </Div>
        </Main>
        <Div style={{ position: 'fixed', inset: 0, zIndex: 999, pointerEvents: 'none'}}>
          <Div style={{ pointerEvents: 'all', position: 'fixed', inset: 'auto 24px 24px auto'}}>
            <Button style={{ width: '128  px'}} onClick={()=> onSave()}>บันทึกข้อมูล</Button>
          </Div>
        </Div>
      </Div>
    </>;
}