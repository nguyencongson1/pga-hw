
// import './App.css';
import LoginPage from "./page/login/LoginPage"
import {BrowserRouter as Router ,Routes ,Route } from "react-router-dom"
import SignUpPage from "./page/signup/SignupPage";
function App() {
  return (
    <Router>
      <div className='app' >
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
