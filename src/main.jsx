import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { EmployeeProvider } from "./context/EmployeeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <UserProvider>
          <EmployeeProvider>
            <App />
          </EmployeeProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
