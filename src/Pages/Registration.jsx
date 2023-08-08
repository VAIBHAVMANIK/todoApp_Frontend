import React, { useContext }  from 'react'
import { useState } from 'react';
import {Context, server} from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

function Registration() {

  const [userInfo, setUserInfo] = useState({
    name:"",
    email: "",
    password: "",
  });

  const{isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

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
       const {data}= await axios.post(`${server}/user/new`,userInfo, {
        header:{
          "Content-Type": "application/json"
        },
        withCredentials:true
       })
       toast.success(data.message);
       setIsAuthenticated(true);
       setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  if(isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Please Enter Your Details</h2>
        <form onSubmit={submiHandler} className='form-login'>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={userInfo.name}
            onChange={formhandler}
            required={true}
          />
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
          <button type="submit" disabled={loading}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Registration
