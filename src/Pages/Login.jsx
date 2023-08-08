import React, { useState, useContext } from "react";
import "../Styles/Login.css";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { isAuthenticated, setIsAuthenticated,loading,setLoading,setDoRefresh } = useContext(Context);

  let name, value;
  const formhandler = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const submiHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/user/login`, userInfo, {
        header: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
      setDoRefresh(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Please Enter Your Credentials</h2>
        <form onSubmit={submiHandler} className="form-login">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userInfo.email}
            onChange={formhandler}
            required={true}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={userInfo.password}
            onChange={formhandler}
            required={true}
          />
          <button type="submit" disabled={loading}>Login</button>
        </form>
        <div className="signup">
          <label>OR</label>
          <label className="link">
            <Link to={"/register"}>Sign Up</Link>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Login;
