import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SocialFeed from "./pages/SocialFeed";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Login/>}/>
       <Route path="/profile" element ={<Profile/>}/>
       <Route path="/socialfeed" element ={<SocialFeed/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
