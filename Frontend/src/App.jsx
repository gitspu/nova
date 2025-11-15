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
import {Admin}    from "./Page/Admin";
import {Auth}     from "./Page/Auth";
import {Console}  from './Page/Console'
import {Home}     from "./Page/Home";
import {Profile}  from "./Page/Profile";
import {Job}      from './Page/Job'
import {Settings} from './Page/Settings';
import {NavBar, NavBarLogo, NavBarProfile, NavBarSearch, NavBarTitle, NavBarWiden, NavBarMenu}   from './Component/NarBar';
import {Notification} from './Component/Notification';

/*
    เริ่มต้นการทำงานแต่ละระบบ
*/
api.init ();

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

/**
 *  ส่วนประกอบหลักที่ react ต้องใช้แสดงผล 
 */
export function App ()
{
    const outletInset = '56px 0px 0px 0px';
    const navInset = '0px 0px 0px auto';
    const navHeight = '56px';

    return <BrowserRouter>
      <Routes>
        <Route element={<MainRoute/>}>
          <Route path="/"         element={<Home      inset={outletInset}/>}/>
          <Route path="/profile"  element={<Profile   inset={outletInset}/>}/>
          <Route path="/job"      element={<Job       inset={outletInset}/>}/>
          <Route path="/settings" element={<Settings  inset={outletInset}/>}/>
        </Route>
        <Route element={<SystemRoute/>}>
          <Route path="/auth"     element={<Auth/>}/>
          <Route path="/console"  element={<Console/>}/>
          <Route path="/admin"    element={<Admin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

    /**
     * เส้นทางหลักที่ผู้ใช้จะถูกนำไป 
     * เส้นทางนี้จะมี NavBar (ระบบนำทางที่อยู่ด้านบน)
     * และ Outlet ที่แสดงผลตามบริบท
    */
    function MainRoute ()
    {
        if (api.auth.isLogged () == false || api.auth.isActive ()   == false)
        {
            navigator.auth ();
            return;
        }
        return <>
          <NavBar inset={navInset} height={navHeight} width='100%'>
            <NavBarWiden justify='start'>
              <NavBarLogo/>
              <NavBarTitle value='NOVA'/>
            </NavBarWiden>
            <NavBarWiden justify='center'>
              <NavBarSearch placeholder='ค้นหางาน'/>
            </NavBarWiden>
            <NavBarWiden justify='end'>
              <NavBarMenu/>
              <NavBarProfile/>
            </NavBarWiden>
          </NavBar>
          <Notification/>
          <Outlet/>
        </>
    }
    function SystemRoute ()
    {
        return <>
          <Outlet/>
        </>;
    }
}