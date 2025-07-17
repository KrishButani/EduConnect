import logo from './logo.svg';
import './App.css';
// import Head from "./components/Head"
import Sidebar from "./components/sidebar"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Registration  from './pages/registration';
import Course from './pages/course';
import Subject from './pages/subject'
import Field from './pages/field'
import Tutor from './pages/tutor';
import College from './pages/college';
import Student from './pages/student'

function App() {
  return (
    <div className="App">      
      {/* <Registration/> */}
      <Field/>
      {/* <Course/> */}
      {/* <Subject/> */}
      {/* <Tutor/> */}
      {/* <College/> */}
      {/* <Student/> */}
    </div>
  );
}

export default App;
