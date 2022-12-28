import * as React from "react";
import logo from "../../logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import SwitchButton from "../SwitchButton";
import { NavLink } from "react-router-dom";
import { Box, Button, FormControl, OutlinedInput } from "@mui/material";
const Header = () => {
  return (
    <div className="client-header">
      <div className="client-header-logo">
        <div className="container">
          <div className="group-logo">
            <NavLink to="/">
              <img src={logo} width={50} height={50} alt="logo" />
            </NavLink>
            <div className="box-search">
              <Box component="form">
                <FormControl sx={{ width : "20rem" }}>
                  <OutlinedInput placeholder="Please enter text" />
                </FormControl>
                <Button variant="text" type="submit" color="primary">
                  <SearchIcon style={{ fontSize: "18px" }} />
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div className="client-header-menu">
        <div className="container">
          <div className="main-menu">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/news">News</NavLink>
              </li>
            </ul>
            <div className="auth-login">
              <SwitchButton />
              <span className="btn-login">Login</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
