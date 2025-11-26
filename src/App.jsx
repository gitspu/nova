import { BrowserRouter, Route, Routes } from "react-router-dom";

import Auth from './pages/Auth'
import ViewProfile from "./pages/ViewProfile";
import Profile from "./components/comProfile/Profile";
import AdminDashboard from './admin/AdminDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/viewprofile" element={<ViewProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
