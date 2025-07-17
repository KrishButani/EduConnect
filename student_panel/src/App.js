import logo from './logo.svg';
// import Quizz from './pages/Quizz';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import Login from './pages/login';
import Registration from './pages/registration';
import Dashboard from './pages/dashboard';
import CourseEnrollmentPage from './pages/CourseEnrollmentPage';
import VideoPlayer from './pages/videoplayer';
import Quiz from './pages/quiz';
import Quiz2 from './pages/quiz2' 

// import VideoPlayer from './pages/videoplayer';

// import Quiz from './pages/quiz';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" Component={Login}></Route>
          <Route exact path="/dashboard" Component={Dashboard}></Route>
          <Route exact path="/login" Component={Login}></Route>
          <Route exact path="/register" Component={Registration}></Route>
          <Route exact path="/course/:id" Component={CourseEnrollmentPage}></Route>
          {/* <Route exact path="/img" Component={img}></Route> */}
          {/* <Route exact path="/video" Component={VideoPlayer}></Route> */}
          <Route exact path="/vidplay" Component={VideoPlayer}></Route>
          <Route exact path="/Quiz" Component={Quiz}></Route>
          <Route exact path="/Quiz2" Component={Quiz2}></Route>
          {/* <Route exact path="/select_test" Component={select_test}></Route> */}
        </Routes>
      </Router>
  );
}

export default App;
