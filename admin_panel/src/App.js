// import logo from "./logo.svg";
// import "./App.css";
import React from "react"; // Import React
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Course2 from "./pages/course2";
import Subject2 from "./pages/subject2";
import College2 from "./pages/college2";
import Tutor2 from "./pages/tutor2";
import Field2 from "./pages/field2";
import Student2 from "./pages/student2";
import Registration from "./pages/registration";
// import Registration from "./registration";
import admin_dashboard from "./pages/admin_dashboard";
import Login from "./pages/login";
import Video2 from "./pages/video2";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Registration}></Route>
          <Route exact path="/tutor" Component={Tutor2}></Route>
          <Route exact path="/student2" Component={Student2}></Route>
          <Route exact path="/field2" Component={Field2}></Route>
          <Route exact path="/college2" Component={College2}></Route>
          <Route exact path="/Subject2" Component={Subject2}></Route>
          <Route exact path="/Course2" Component={Course2}></Route>
          <Route exact path="/admin" Component={admin_dashboard}></Route>
          <Route exact path="/login" Component={Login}></Route>
          <Route exact path="/register" Component={Registration}></Route>
          <Route exact path="/Video" Component={Video2}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
