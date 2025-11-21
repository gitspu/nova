import { StrictMode, useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css'

/*
    นำเข้าระบบ (script/logic)
*/
import api       from './Script/Api'
import icon      from './Script/Icon'
import navigator from './Script/Navigator'
/*
    นำเข้าหน้าเว็บ (page)
*/
import Auth       from './Page/Auth';
import Console    from './Page/Console'
import Error      from './Page/Error'
import Home       from './Page/Home'
import Profile    from './Page/Profile'
import Job        from './Page/Job'
import Settings   from './Page/Settings'

import NavBar     from './Component/NavBar'

/**
 *  ส่วนประกอบหลักที่ react ต้องใช้แสดงผล
 */
export function App ()
{
    /*
    เริ่มต้นการทำงานแต่ละระบบ
    */
    api.init ();

    if (api.auth.isLogged () == false || api.auth.isActive ()   == false)
    {
        if (navigator.is (navigator.LINK_AUTH) == false) 
        {
            navigator.auth ();
            return (<></>);
        }
    }
    else
    {
        if (api.auth.getRole () == api.auth.ROLE_ADMIN)
        {
            if (navigator.is (navigator.LINK_AUTH) == false)
            {
                // ...
                if (navigator.is (navigator.LINK_CONSOLE) == false)
                {
                    navigator.console ();
                    return (<></>);
                }
            }
        }
    }
    
    const Overlay = () =>
    {
        const [show, setShow] = useState (false);

        const onHome = () =>
        {
            navigator.home ();
        }
        const onProfile = () =>
        {
            navigator.profile ();
        }
        const onSettings = () =>
        {
            navigator.settings ();
        }
        const onLogout = () =>
        {
            try { api.auth.logout (); }
            finally { navigator.auth ('/', undefined); }
        }

        return (
          <>
            <div className='header'>
              <NavBar>
                <NavBar.Flex justify='start' grow={1}>
                  <NavBar.Branding onClick={onHome}/>
                </NavBar.Flex>
                <NavBar.Flex justify='center' grow={2}>
                  <NavBar.Search placeholder='ค้นหางาน'/>
                </NavBar.Flex>
                <NavBar.Flex justify='end' grow={1}>
                  <NavBar.Menu className='d-none'/>
                  <NavBar.Profile onClick={() => setShow (!show)}/>
                  <NavBar.ContextMenu className={show ? 'd-block' : 'd-none'}>
                    <button className='button-primary' onClick={onProfile}>
                      <label className='justify-content-start'>
                        <img src={icon.person}/>
                        <span>โปรไฟล์</span>
                      </label>
                    </button>
                    <button className='button-primary' onClick={onSettings}>
                      <label className='justify-content-start'>
                        <img src={icon.gear}/>
                        <span>การตั้งค่า</span>
                      </label>
                    </button>
                    <button className='button-caution' onClick={onLogout}>
                      <label className='justify-content-start'>
                        <img src={icon.arrowRight}/>
                        <span>ออกจากระบบ</span>
                      </label>
                    </button>
                  </NavBar.ContextMenu>
                </NavBar.Flex>
              </NavBar>
            </div>
            <div className='overlay'>

            </div>
            <div className='body'>
              <Outlet/>
            </div>
          </>
        );
    }

    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Overlay/>}>
            <Route path='/'         element={<Home/>} index={true}/>
            <Route path='/profile'  element={<Profile/>}/>
            <Route path='/job'      element={<Job/>}/>
            <Route path='/settings' element={<Settings/>}/>
          </Route>
          <Route element={null}>
            <Route path='/console'  element={<Console/>}/>
            <Route path='/auth'     element={<Auth/>}/>
            <Route path='*' element={<Error/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    );
}
/*
    ให้ react ประมวลและแสดงหน้าเว็บ
*/
const root = document.getElementById ("app");
const react = createRoot (root);

react.render (
  <StrictMode>
    <App/>
  </StrictMode>
);