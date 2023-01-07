import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import SwitchButton from "../SwitchButton";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";
import { LogoutUser } from "../../redux/reducer/users.slice";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutUser = () => {
    dispatch(LogoutUser());
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Toolbar disableGutters sx={{ padding: "0 20px" }}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Admin Panel
        </Typography>
        <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <div className="auth-login" style={{ display: "flex" }}>
          <SwitchButton />
          <Box sx={{ flexGrow: 0 }}>
            <Box
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://cafebiz.cafebizcdn.vn/2019/1/2/photo-1-15464020829431420592113.png"
              />
              <Typography
                sx={{ color: "#fff", marginLeft: 1 }}
              >{`${user?.user?.firstName} ${user?.user?.lastName}`}</Typography>
            </Box>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      textTransform: "capitalize",
                      color: switchTheme ? "#e5e5e5" : "#222",
                    }}
                  >
                    View My Site
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    textTransform: "capitalize",
                    color: switchTheme ? "#e5e5e5" : "#222",
                  }}
                >
                  Settings
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    textTransform: "capitalize",
                    color: switchTheme ? "#e5e5e5" : "#222",
                  }}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogoutUser}>Logout</MenuItem>
            </Menu>
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
