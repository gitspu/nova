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
import * as auth      from './Script/Authentication'
import * as profile   from './Script/Profile'
import * as api       from './Script/Api'
import * as navigator from './Script/Navigator'
/*
    นำเข้าหน้าเว็บ (page)
*/
import {Admin}    from "./Page/Admin";
import {Auth}     from "./Page/Auth";
import {Home}     from "./Page/Home";
import {Profile}  from "./Page/Profile";
import {Job}      from './Page/Job'
import {NavBar}   from './Component/NarBar';

/*
    เริ่มต้นการทำงานแต่ละระบบ
*/
api.init ();

auth.init ();
profile.init ();    

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
    return <BrowserRouter>
      <Routes>
        <Route element={<MainRoute/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/job" element={<Job/>}/>
        </Route>
        <Route element={<SystemRoute/>}>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
}
/**
 * เส้นทางหลักที่ผู้ใช้จะถูกนำไป 
 * เส้นทางนี้จะมี NavBar (ระบบนำทางที่อยู่ด้านบน)
 * และ Outlet ที่แสดงผลตามบริบท
*/
function MainRoute ()
{
    if (auth.isLogged () == false || auth.isActive () == false)
    {
        navigator.auth ();
        return;
    }
    return <>
      <div className='outlet'>
        <Outlet/>
      </div>
      <div className='navigation'>
        <NavBar/>
      </div>
    </>
}
function SystemRoute ()
{
    return <>
      <Outlet/>
    </>;
}