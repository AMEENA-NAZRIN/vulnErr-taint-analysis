import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../auth";

function Signup() {
  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = () => {
    signupUser({username,password,email});
    alert("Account Created Successfully");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🛡 CREATE ACCOUNT</h2>

        <input style={styles.input} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
        <input style={styles.input} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input style={styles.input} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button style={styles.button} onClick={handleSignup}>
          REGISTER
        </button>

        <p style={styles.link} onClick={()=>navigate("/")}>
          Already Registered? Login
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
  title:{ marginBottom:"30px" },
  input:{
    width:"100%",
    padding:"12px",
    marginBottom:"15px",
    background:"#111",
    border:"1px solid #00ffff",
    color:"#00ffff",
    borderRadius:"8px"
  },
  button:{
    width:"100%",
    padding:"12px",
    background:"#00ffff",
    color:"#000",
    border:"none",
    borderRadius:"8px",
    cursor:"pointer",
    fontWeight:"bold"
  },
  link:{ marginTop:"15px", cursor:"pointer" }
};

export default Signup;
