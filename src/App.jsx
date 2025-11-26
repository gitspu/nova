import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from './pages/Auth'
import ViewProfile from "./pages/ViewProfile";
import Profile from "./components/comProfile/Profile";

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
       <Route path="/" element={<Auth/>}/>
       <Route path="/viewprofile" element ={<ViewProfile/>}/>
       <Route path="/profile" element ={<Profile/>}/>

       <Route path="/dashboardpage" element={<DashboardPage />} >
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
