import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import SocialFeed from "./pages/SocialFeed";
import Admin from "./pages/Admin";
import { NavBar } from "./components/NarBar";

import * as auth from './api/authentication'
import * as authUI from './components/Auth'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main/>}>
          <Route path="/" element ={<SocialFeed/>}/>
          <Route path="/profile" element ={<Profile/>}/>
        </Route>
        <Route>
          <Route path="/auth" element ={<Auth/>}/>
          <Route path="/admin" element ={<Admin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

function Main ()
{
    if (auth.isLogged() && auth.isActive ()) 
    {
        return <div>
          <Outlet/>
          <NavBar/>
        </div>
    }
    authUI.navigate ();
    return;
}

export default App;
