import { useState } from "react";
import "./authStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { signUpEP } from "../api";
import AlertMessage from "../components/handler/AlertMessage";
import { Spin } from "antd";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signUpEP(userName, email, password);
      console.log(res.data);
      if (res) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.username);
        navigate("/home");
      }
    } catch (error) {
      // console.log(error);
      setError("Error in SignUp");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {error && (
        <AlertMessage error={error} handleCloseError={() => setError(null)} />
      )}
      <div className="bodyContainer">
        <div className="authInput">
          <h1>Sign Up {loading && <Spin size="large" />}</h1>
          <form onSubmit={handleSignUp} className="form">
            <div className="inputBox">
              <p>Username</p>
              <input
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="inputBox">
              <p>Email</p>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputBox">
              <p>Password</p>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
