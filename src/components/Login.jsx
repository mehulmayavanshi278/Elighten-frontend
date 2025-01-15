import React, { useState } from "react";
import apiService  from "../apiService/apiService";
import { TokenHelper } from "../Helper/TokenHelper";


const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleLogin = async(e)=>{
    e.preventDefault();
    try{
      console.log("formData" , formData);
      const res = await apiService.login(formData);
      if(res.status===200){
        console.log(res.data);
        TokenHelper.create('token' , res.data.token);
        window.location.href = "/user"
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="login-body">

   
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form">
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData?.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a role</option>
            <option value="HR">HR</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button onClick={handleLogin} disabled={!(formData.email && formData.password && formData.role)}  className="login-button">
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
