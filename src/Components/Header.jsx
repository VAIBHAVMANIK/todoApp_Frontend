import React, { useContext, useEffect } from "react";
import { server } from "../main";
import { Link } from "react-router-dom";
import "../Styles/Header.css";
import { Context } from "../main";
import toast  from "react-hot-toast";
import axios from "axios";

function Header() {

  const {isAuthenticated,setIsAuthenticated,setDoRefresh,user,setUser} = useContext(Context);
  useEffect(()=>{
    axios
    .get(`${server}/user/me`, {
      withCredentials: true,
    })
    .then((res) => {
      setUser(res.data.user);
      setIsAuthenticated(true);
    }).catch((err)=>{
      setUser({}); 
    })

  },[]);



  const logoutHandler = async () => {
    try {
       const {data}= await axios.get(`${server}/user/logout`,{
        withCredentials:true
       })
       toast.success("Successfully logged out");
       setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
      setIsAuthenticated(true);
      setDoRefresh(false);
    }
  }

  return (
    <>
      <div className="container">
        <div className="logo">
          <label className="todo">ToDo App</label>
        </div>
        <div className="link-tabs">
          <div><Link to={"/"} className="link">Home</Link></div>
          <div><Link to={"/profile"} className="link">Profile</Link></div>
          {isAuthenticated?<div onClick={logoutHandler} ><Link className="link">Logout</Link></div>:<div><Link to={"/login"} className="link">Login</Link></div>}
        </div>
      </div>
    </>
  );
}

export default Header;
