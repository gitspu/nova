import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/profile/Profile";
import SocialFeed from "./pages/SocialFeed";
import Auth from "./pages/Auth";
import Resume2 from "./components/resume/Resume2";
import ViewProfile from "./pages/ViewProfile";
import AdminDashboard from './admin/AdminDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login/>}/> */}
        <Route path="/" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<Resume2 />} />
        <Route path="/socialfeed" element={<SocialFeed />} />
        <Route path="/viewprofile" element={<ViewProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
