import * as React from "react";
import MetaData from "./Metadata";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import SwitchButton from "../SwitchButton";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LogoutUser } from "../../redux/reducer/users.slice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CategoryIcon from "@mui/icons-material/Category";
import { idolTokuDa } from "../../utils/baseAvartar";
import { backend_Url } from "../../redux/axiosConfig/apiUrl";

interface LayoutProps {
  children: any;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogoutUser = () => {
    dispatch(LogoutUser());
    setAnchorElUser(null);
  };
  const menu = [
    {
      text: "Dashboard",
      link: "/admin",
      icon: <DashboardIcon />,
    },
    {
      text: "Post",
      link: "/admin/post",
      icon: <NewspaperIcon />,
    },
    {
      text: "Video",
      link: "/admin/video",
      icon: <SlowMotionVideoIcon />,
    },
  ];

  const manager = [
    {
      text: "Users",
      link: "/admin/users",
      icon: <ManageAccountsIcon />,
    },
    {
      text: "Category",
      link: "/admin/category",
      icon: <CategoryIcon />,
    },
  ];

  return (
    <div className="layout-admin">
      <MetaData title="Admin Panel" />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/admin"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                marginRight: "auto",
              }}
            >
              Admin Panel
            </Typography>
            <div className="auth-login" style={{ display: "flex" }}>
              <SwitchButton />
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
                    user?.user?.coverPic
                      ? backend_Url + "/" + user?.user?.coverPic
                      : idolTokuDa
                  }
                />
                <Typography
                  sx={{
                    color: "#fff",
                    marginLeft: 1,
                    display: { xs: "none", md: "block" },
                  }}
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
                    to="/admin/settings"
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
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menu.map((menu, index) => (
              <ListItem
                button
                component={Link}
                to={menu.link}
                key={index}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>

                  <Typography component={Link} to={menu.link}></Typography>
                  <ListItemText
                    primary={menu.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {manager.map((manager, index) => (
              <ListItem
                button
                component={Link}
                to={manager.link}
                key={index}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {manager.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={manager.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
