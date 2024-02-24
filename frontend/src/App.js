import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/LoginComponent";
import Signup from "./Components/SignupComponent";
import Homepage from "./Components/HomePage";
import AccountInfo from "./Components/AccountComponent";
import { isAuthenticated } from "./Auth/UserAuth"; // Import the isAuthenticated function
import Customers from "./Components/CustomerComponent";
import ComplaintForm from "./Components/TicketComponent";
import Employees from "./Components/EmployeeComponent";
import Company from "./Components/CompanyComponent";
import Dialer from "./Components/DialerComponent";

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />

        {/* if token exists in local storage redirect user to home page otherwise redirect to login page */}
        <Route
          path="/homepage"
          element={<PrivateRoute element={<Homepage />} />}
        />
        <Route
          path="/accountinfo"
          element={<PrivateRoute element={<AccountInfo />} />}
        />
        <Route
          path="/employee"
          element={<PrivateRoute element={<Employees />} />}
        />
        <Route
          path="/companies"
          element={<PrivateRoute element={<Company />} />}
        />
        <Route
          path="/dialer"
          element={<PrivateRoute element={<Dialer />} />}
        />
        <Route
          path="/clients"
          element={<PrivateRoute element={<Customers />} />}
        />
        <Route
          path="/ticket"
          element={<PrivateRoute element={<ComplaintForm />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
