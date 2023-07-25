import React, { useState } from 'react'
import './Login.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login",{username,password},{withCredentials:true})
      setError(null);
      localStorage.setItem("currentUser",JSON.stringify(res.data))
      navigate("/")
    } catch (error) {
      setError(error.response.data)
    }
  }
  return (
    <div className="login">
      <form onSubmit={handleSubmit} >
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <span style={{color:"red",fontSize:"16px",display:error ? "inline" : "none"}} >{error}</span>
      </form>
    </div>
  )
}

export default Login