import axios from "axios";


function StartScreen({ numQuestions, dispatch }) {

  const logout = async (e) => {
    e.preventDefault();
    // Update the axios.post URL
    axios.post("http://localhost:4001/logout", {
    })
    };
    
  return (
    <><input
      type="submit" onClick={logout}
      name="submit"
      id="submit"
      className="form-submit"
      value="Logout" /><div className="start">
        <h2>Welcome to The React Quiz!</h2>
        <h3>{numQuestions} questions to test your React mastery</h3>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Let's start
        </button>
      </div></>
  );
}

export default StartScreen;
