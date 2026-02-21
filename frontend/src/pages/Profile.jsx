/*import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>User Profile</h2>

        <button
          onClick={() => navigate("/uploadanalyse")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Go to Upload Analyse
           
        </button>
          <button
          onClick={() => navigate("/uploadanalyse")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          >
            dowmload pdf 
        </button>

      </div>
    </>
  );
}

export default Profile;*/


import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>👤 USER PROFILE</h2>

          <button style={styles.button} onClick={()=>navigate("/uploadanalyse")}>
            Upload & Analyse
          </button>

          <button style={styles.button} onClick={()=>navigate("/downloadpdf")}>
            Download Security Report
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
    fontFamily:"monospace"
  },
  card:{
    padding:"50px",
    border:"1px solid #00ffff",
    borderRadius:"15px",
    background:"rgba(0,255,255,0.05)",
    boxShadow:"0 0 30px #00ffff40",
    textAlign:"center",
    color:"#00ffff"
  },
  button:{
    display:"block",
    width:"100%",
    marginTop:"15px",
    padding:"12px",
    background:"#00ffff",
    border:"none",
    borderRadius:"8px",
    cursor:"pointer",
    fontWeight:"bold"
  }
};

export default Profile;
