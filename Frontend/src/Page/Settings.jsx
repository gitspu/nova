import { Activity, useEffect, useRef, useState } from 'react'

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
    const basic = useRef (new auth.DataBasic ());

    const onLoad = () =>
    {
        const newBasic = util.ignore (() => auth.getBasic ());
        
        if (newBasic != null) basic.current = newBasic;
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
    const contact = useRef (new profile.DataContact ());
    const education = useRef (new profile.DataEducation ());
    const personal = useRef (new profile.DataPersonal ());
    const theme = useRef (new profile.DataTheme ());

    const onLoad = () =>
    {
        const newContact = util.ignore (() => profile.getContact ());
        const newEducation = util.ignore (() => profile.getEducation ());
        const newPersonal = util.ignore (() => profile.getPersonal ());
        const newTheme = util.ignore (() => profile.getTheme ());

        if (newContact != null)   contact.current = newContact;
        if (newEducation != null) education.current = newEducation;
        if (newPersonal != null)  personal.current = newPersonal;
        if (newTheme != null)  theme.current = newTheme;
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
        
        <SettingsCom.ProfileTheme ref={theme}/>
        <SettingsCom.ProfilePersonal ref={personal}/>
        <SettingsCom.ProfileContact ref={contact}/>
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
      <div className='page-settings'>
        <div className="menu">
          <div>
            <Menu direction='vertical' state={[menu, setMenu]}>
              <Menu.Child state={1} icon={icon.person} text='บัญชี'/>
              <Menu.Child state={2} icon={icon.briefcase} text='โปรไฟล์'/>
            </Menu>
          </div>
        </div>
        <div className="content">
          <MenuAccount stateMenu={menu}/>
          <MenuProfile stateMenu={menu}/>
        </div>
      </div>
    )
}


export default Root;