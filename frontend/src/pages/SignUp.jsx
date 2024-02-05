import { useState } from "react";
import "./authStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { signUpEP } from "../api";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await signUpEP(userName, email, password);
      console.log(res.data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="bodyContainer">
        <div className="authInput">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignUp} className="form">
            <div className="inputBox">
              <p>Username</p>
              <input
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

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
            <input type="submit" value="Sign Up" className="submitButton" />
          </form>
          <h5>
            Already signed up?<Link to="/"> Go to login</Link>
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

export default SignUp;
