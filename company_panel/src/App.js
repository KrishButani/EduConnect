// import logo from "./logo.svg";
// import "./App.css";
import React from "react"; // Import React
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

import Registration from "./pages/registration";
// import Registration from "./registration";

import Login from "./pages/login";
import Company from "./pages/company";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Registration}></Route>
          <Route exact path="/login" Component={Login}></Route>
          <Route exact path="/register" Component={Registration}></Route>
          <Route exact path="/company" Component={Company}></Route>
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
