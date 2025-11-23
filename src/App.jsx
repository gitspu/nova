import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/profile/Profile";
import SocialFeed from "./pages/SocialFeed";
import Auth from "./pages/Auth";
import Resume2 from "./components/resume/Resume2";
import ViewProfile from "./pages/ViewProfile";
import Layout from "./admin/adminLayouts/Layout";
import Dashboard from "./admin/adminPages/Dashboard/Dashboard";
import Users from "./admin/adminPages/Users/Users";
import Reports from "./admin/adminPages/Reports/Reports";
import ErrorBoundary from "./shared/ErrorBoundary"; 

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* <Route path="/" element={<Login/>}/> */}
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resume" element={<Resume2 />} />
          <Route path="/socialfeed" element={<SocialFeed />} />
          <Route path="/viewprofile" element={<ViewProfile />} />
          <Route path="/admin/*" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
