import { useState } from "react";
import "./authStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { logInEP } from "../api";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const res = await logInEP(email, password);
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="container">
      <div className="bodyContainer">
        <div className="authInput">
          <h1>Log in</h1>
          <form onSubmit={handleLogin} className="form">
            <div className="inputBox">
              <p>Email</p>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <p>Password</p>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" className="submitButton" />
          </form>
          <h5>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </h5>
        </div>
        <div className="authImage">
          <img
            src="https://todoist.b-cdn.net/assets/images/44245fc51c3e2ab05ee6d92c13e2e08a.png"
            alt="Image"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
