import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>⚡ DASHBOARD</h2>
          <p>System Status: <span style={{color:"#00ff88"}}>SECURE</span></p>

          <button style={styles.button} onClick={()=>navigate("/profile")}>
            VIEW PROFILE
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  container:{
    height:"100vh",
    background:"#050510",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontFamily:"monospace",
    color:"#00ffff"
  },
  card:{
    padding:"50px",
    border:"1px solid #00ffff",
    borderRadius:"15px",
    background:"rgba(0,255,255,0.05)",
    boxShadow:"0 0 30px #00ffff40",
    textAlign:"center"
  },
  button:{
    marginTop:"20px",
    padding:"12px 25px",
    background:"#00ffff",
    border:"none",
    borderRadius:"8px",
    cursor:"pointer",
    fontWeight:"bold"
  }
};

export default Dashboard;
