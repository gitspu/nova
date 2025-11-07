import { StrictMode } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css'

import * as auth      from './API/Authentication'
import * as profile   from './API/Profile'

import {Admin}    from "./Page/Admin";
import {Auth}     from "./Page/Auth";
import {Feed}     from "./Page/Feed";
import {Profile}  from "./Page/Profile";
import {NavBar}   from './Component/NarBar';

auth.init ();
profile.init ();    

const root = document.getElementById ("root");
const react = createRoot (root);

react.render (
  <StrictMode>
    <App/>
  </StrictMode>
);

export function App ()
{
    return <BrowserRouter>
      <Routes>
        <Route element={<MainRoute/>}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route element={<SystemRoute/>}>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
}
function MainRoute ()
{
    if (auth.isLogged () == false || auth.isActive () == false)
    {
        return;
    }
    return <>
      <div style={{
        position: 'absolute', 
        top: '0px', bottom: '0px',
        left: '0px', right: '0px',
        marginTop: '56px',
        overflowX: 'hidden',
        overflowY: 'auto'
      }}>
        <Outlet/>
      </div>
      <NavBar/>
    </>
}
function SystemRoute ()
{
    return <>
      <Outlet/>
    </>;
}