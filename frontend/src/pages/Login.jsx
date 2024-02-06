import { useState } from "react";
import "./authStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { logInEP } from "../api";
import {Spin} from "antd"
import AlertMessage from "../components/handler/AlertMessage"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await logInEP(email, password);
      console.log(res);
      if (res) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.username);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Something is wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {error && <AlertMessage error={error} handleCloseError={()=>setError(null)}/>}
      <div className="bodyContainer">
        <div className="authInput">
        {/* style={{position:"absolute", top : "50vh" , left : "50vw"}} */}
          <h1>Log in {loading && <Spin size="large"/>}</h1>  
          <form onSubmit={handleLogin} className="form">
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
