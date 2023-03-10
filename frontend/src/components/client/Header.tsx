import * as React from "react";
import logoLight from "../../logo/sabasports.svg";
import logoDark from "../../logo/logo-footer.png";
import SwitchButton from "../SwitchButton";
import { NavLink } from "react-router-dom";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { GetUserByEmail, LogoutUser } from "../../redux/reducer/users.slice";
import { idolTokuDa } from "../../utils/baseAvartar";
import { getMenu } from "../../redux/reducer/category.slice";
const Header = () => {
  const dispatch = useAppDispatch();
  const { user, userByEmail } = useSelector((state: RootState) => state.users);
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  const { category } = useSelector((state: RootState) => state.category);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutUser = () => {
    dispatch(LogoutUser());
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    dispatch(GetUserByEmail(user?.user?.email));
    dispatch(getMenu());
  }, [dispatch, user?.user?.email]);

  return (
    <div className="client-header">
      <div className="client-header-logo">
        <div className="container">
          <div className="group-logo">
            <NavLink to="/">
              <img
                src={switchTheme ? logoDark : logoLight}
                width={100}
                height={45}
                alt="logo"
              />
            </NavLink>
          </div>
        </div>
      </div>
      <div className="client-header-menu">
        <div className="container">
          <div className="main-menu">
            <ul>
              <li>
                <NavLink to="/">Trang ch???</NavLink>
              </li>
              {category?.map((item, i) => (
                <li key={i}>
                  <NavLink to={`/${item.slug}`}>{item.name}</NavLink>
                </li>
              ))}
            </ul>
            <div className="auth-login">
              <SwitchButton />
              {user?.user ? (
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
                      src={
                        userByEmail?.coverPic
                          ? userByEmail?.coverPic
                          : idolTokuDa
                      }
                    />
                    <Typography
                      sx={{ color: "#fff", marginLeft: 1 }}
                    >{`${userByEmail?.firstName} ${userByEmail?.lastName}`}</Typography>
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
                          to="/user"
                          style={{
                            textDecoration: "none",
                            textTransform: "capitalize",
                            color: switchTheme ? "#e5e5e5" : "#222",
                          }}
                        >
                          Trang c?? nh??n
                        </Link>
                      </Typography>
                    </MenuItem>
                    {userByEmail?.role === "admin" ||
                    userByEmail?.role === "content" ? (
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <Link
                            to="/admin"
                            style={{
                              textDecoration: "none",
                              textTransform: "capitalize",
                              color: switchTheme ? "#e5e5e5" : "#222",
                            }}
                          >
                            Admin Panel
                          </Link>
                        </Typography>
                      </MenuItem>
                    ) : (
                      ""
                    )}

                    <MenuItem onClick={handleLogoutUser}>????ng xu???t</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Link to="/login" className="btn-login" color="primary">
                  ????ng nh???p
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
