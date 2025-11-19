import { StrictMode } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css'

/*
    นำเข้าระบบ (script/logic)
*/
import * as api       from './Script/Api'
import * as navigator from './Script/Navigator'
/*
    นำเข้าหน้าเว็บ (page)
*/
import Auth       from './Page/Auth';
import Console    from './Page/Console'
import Home       from './Page/Home'
import Profile    from './Page/Profile'
import Job        from './Page/Job'
import {Settings} from './Page/Settings'

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
    
    const Overlay = () =>
    {
        return (
          <>
            <div className='header'>
              <NavBar height={56} width='100%'>
                <NavBar.Flex justify='start' grow={1}>
                  <NavBar.Branding/>
                </NavBar.Flex>
                <NavBar.Flex justify='center' grow={2}>
                  <NavBar.Search placeholder='ค้นหางาน'/>
                </NavBar.Flex>
                <NavBar.Flex justify='end' grow={1}>
                  <NavBar.Profile/>
                </NavBar.Flex>
              </NavBar>
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