import React from "react";
import Navbar from "../components/Navbar";
import "../App.css";

function UploadAnalyse() {

  const handleFile = (e) => {
    alert("File Uploaded: " + e.target.files[0].name);
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <h2>File Upload & Analysis</h2>

        <input type="file" onChange={handleFile} />
         
        <button>Analyse File</button>
        <button>Download PDF</button>
      </div>
    </>
  );
}

export default UploadAnalyse;
