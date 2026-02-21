import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../auth";

function Login() {
  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = () => {
    if(loginUser(username,password)){
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 VULNERR LOGIN</h2>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          ACCESS SYSTEM
        </button>

        <p style={styles.link} onClick={()=>navigate("/signup")}>
          Create New Account
        </p>
      </div>
    </div>
  );
}

const styles = {
  container:{
    height:"100vh",
    background:"radial-gradient(circle at top, #0f0f1b, #050510)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontFamily:"monospace"
  },
  card:{
    background:"rgba(0,255,255,0.05)",
    border:"1px solid #00ffff",
    backdropFilter:"blur(15px)",
    padding:"40px",
    borderRadius:"15px",
    width:"340px",
    textAlign:"center",
    color:"#00ffff",
    boxShadow:"0 0 25px #00ffff50"
  },
  title:{
    marginBottom:"30px",
    letterSpacing:"2px"
  },
  input:{
    width:"100%",
    padding:"12px",
    marginBottom:"15px",
    background:"#111",
    border:"1px solid #00ffff",
    color:"#00ffff",
    borderRadius:"8px",
    outline:"none"
  },
  button:{
    width:"100%",
    padding:"12px",
    background:"#00ffff",
    color:"#000",
    border:"none",
    borderRadius:"8px",
    cursor:"pointer",
    fontWeight:"bold",
    transition:"0.3s"
  },
  link:{
    marginTop:"15px",
    cursor:"pointer",
    color:"#00ffff"
  }
};

export default Login;
