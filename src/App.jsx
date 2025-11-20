import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/profile/Profile";
import SocialFeed from "./pages/SocialFeed";
import Auth from './pages/Auth'
import Resume2 from "./components/resume/Resume2"
// ** Dashboard **
import DashboardPage from "./pages/DashboardPage";
import Dashboard from "./components/comDashboard/Dashboard";
import B from "./components/comDashboard/B";
import C from "./components/comDashboard/C";
import D from "./components/comDashboard/D";
import E from "./components/comDashboard/E";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       {/* <Route path="/" element={<Login/>}/> */}
       <Route path="/" element={<Auth/>}/>
       <Route path="/profile" element ={<Profile/>}/>
       <Route path="/resume" element ={<Resume2/>}/>
       <Route path="/socialfeed" element ={<SocialFeed/>}/>
       <Route path="/dashboardpage" element={<DashboardPage />}>
          {/* Path ที่เป็น 'index' คือหน้า default */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="b" element={<B />} />
          <Route path="c" element={<C />} />
          <Route path="d" element={<D />} />
          <Route path="e" element={<E />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
