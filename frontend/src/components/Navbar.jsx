import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

 function Navbar() {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MiniApp
        </Typography>

        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          Profile
          
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
