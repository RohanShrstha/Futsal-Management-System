import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/user/login/login";
import Signup from "./components/user/signup/signup";
import Home from "./components/user/home/home";
import About from "./components/user/about/about";
import Futsal from "./components/user/futsal/futsal";
import Contact from "./components/user/contact/contact";
import Profile from "./components/user/profile/profile";
import EditProfile from "./components/user/profile/editprofile";
import ChangePassword from "./components/user/profile/changepassword";
import MyFutsal from "./components/user/futsalcontent/myfutsal";
import FutsalContent from "./components/user/futsalcontent/futsalcontent";
import EditFutsal from "./components/user/futsalcontent/editfutsal";
import CreateFutsal from "./components/user/futsalcontent/createfutsal";

import SideBar from "./components/admin/Sidebar/SideBar";
import ManageUsers from "./components/admin/manageUsers/manageUsers";
import Dashboard from "./components/admin/dashboard/dashboard";
import Managefutsal from "./components/admin/manageFutsal/manageFutsal";
import ManageReserve from "./components/admin/manageReserve/manageReserve";
import ManagePayment from "./components/admin/managePayment/managePayment";
import ManageMessage from "./components/admin/manageMeassge/manageMessage";

// import RequireAuth from "./globalComponents/auth/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/futsal" element={<Futsal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/myfutsal/:futsal_id" element={<MyFutsal />} />
        <Route path="/editfutsal" element={<EditFutsal />} />
        <Route path="/futsalcontent/:futsal_id" element={<FutsalContent />} />
        <Route path="/createfutsal" element={<CreateFutsal />} />

        {/* Admin Routes */}
        {/* <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<SideBar />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route> */}

        <Route path="/admin" element={<SideBar />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="managefutsal" element={<Managefutsal />} />
          <Route path="manageUsers" element={<ManageUsers />} />
          <Route path="managePayment" element={<ManagePayment />} />
          <Route path="manageReserve" element={<ManageReserve />} />
          <Route path="manageMessage" element={<ManageMessage />} />
        </Route>
        {/* 404 Not Found */}
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
