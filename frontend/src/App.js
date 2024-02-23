import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/LoginComponent";
import Signup from "./Components/SignupComponent";
import Homepage from "./Components/HomePage";
import AccountInfo from "./Components/AccountInfo";
import { isAuthenticated } from "./Auth/UserAuth"; // Import the isAuthenticated function
import Customers from "./Components/CustomerComponent";
import ComplaintForm from "./Components/TicketComponent";
import Employees from "./Components/EmployeeComponent";

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route
          path="/homepage"
          element={<Homepage />}
        />
        <Route
          path="/accountinfo"
          element={<AccountInfo />}
        />
        <Route
          path="/employee" element={<Employees />} />
        <Route
          path="/clients" element={<Customers />} />

        <Route path="/ticket" element={<ComplaintForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;