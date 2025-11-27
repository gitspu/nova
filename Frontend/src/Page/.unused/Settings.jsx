import { Activity, useEffect, useReducer, useRef, useState } from 'react'

import Menu         from '../Component/MeunBar'
import SettingsCom from '../Component/Settings'

import api        from './../Script/Api'
import icon       from './../Script/Icon'

import './Style/Settings.css'

const MENU_ACCOUNT = 1;
const MENU_PROFILE = 2;

const MenuAccount = ({stateMenu}) =>
{
    const auth = api.auth;
    const util = api.util;

    const mounted = useRef (false);
    const [, forceUpdate] = useReducer (x => x + 1, 0);
    const basic = useRef (new auth.DataBasic ());

    const onLoad = () =>
    {
        const newBasic = util.ignore (() => auth.getBasic ());
        
        if (newBasic != null) basic.current = newBasic;

        forceUpdate ();
    }
    const onSave = () =>
    {

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

    return (
      <div className={stateMenu == MENU_ACCOUNT ? 'd-block' : 'd-none'}>
         <SettingsCom.MenuAccount ref={basic}/>
      </div>
    );
}
const MenuProfile = ({stateMenu}) =>
{
    const profile = api.profile;
    const util = api.util;

    const mounted = useRef (false);
    const [forceUpdateIdx, forceUpdate] = useReducer (x => x + 1, 0);

    const contact   = useRef (null);
    const education = useRef (null);
    const interest  = useRef (null);
    const job       = useRef (null);
    const personal  = useRef (null);
    const theme     = useRef (null);
    const skill     = useRef (null);

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
        profile.setPersonal (personal.current);
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

    return (
      <div className={stateMenu == MENU_PROFILE ? 'd-block' : 'd-none'}>
        <button className='button-primary' onClick={onSave}>บันทึก</button>
        
        <SettingsCom.ProfileTheme key={`${forceUpdateIdx}-theme`} ref={theme}/>
        <SettingsCom.ProfilePersonal key={`${forceUpdateIdx}-personal`} ref={personal}/>
        <SettingsCom.ProfileContact key={`${forceUpdateIdx}-contact`} ref={contact}/>
        <SettingsCom.ProfileJob key={`${forceUpdateIdx}-job`} ref={job}/>
        <SettingsCom.ProfileEducation key={`${forceUpdateIdx}-education`} ref={job}/>
        <SettingsCom.ProfileInterest key={`${forceUpdateIdx}-interest`} ref={interest}/>
        <SettingsCom.ProfileSkill key={`${forceUpdateIdx}-skill`} ref={skill}/>
      </div>
    );
}
const Root = () =>
{
    const search = new URLSearchParams (window.location.search);
    const jump = search.get ('to');
    
    const mounted = useRef (false);
    const [menu, setMenu] = useState (jump != null ? jump : 1);

    useEffect (() =>
    {
        if (mounted.current)
            return;

        mounted.current = true;

        return () =>
        {
            mounted.current = false;
        }
    },
    []);

    return (
      <div className='page-settings main'>
        <div className="main-menu">
          <div>
            <Menu direction='vertical' state={[menu, setMenu]}>
              <Menu.Child state={MENU_ACCOUNT} icon={icon.person} text='บัญชี'/>
              <Menu.Child state={MENU_PROFILE} icon={icon.briefcase} text='โปรไฟล์'/>
            </Menu>
          </div>
        </div>
        <div className="main-content">
          <MenuAccount stateMenu={menu}/>
          <MenuProfile stateMenu={menu}/>
        </div>
      </div>
    )
}


export default Root;