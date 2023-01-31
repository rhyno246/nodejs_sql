import * as React from "react";
import Layout from "../../../components/client/Layout";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { ClearError, loginUser } from "../../../redux/reducer/users.slice";
import { toast } from "react-toastify";
interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  const error = useSelector((state: RootState) => state.users.error);
  const dispatch = useAppDispatch();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  React.useLayoutEffect(() => {
    if (error) {
      toast.error(error.data);
      dispatch(ClearError());
    }
  }, [error, dispatch]);

  return (
    <Layout>
      <Typography
        variant="h4"
        align="center"
        sx={{ textTransform: "uppercase" }}
      >
        Đăng Nhập
      </Typography>
      <Box
        component="form"
        sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
        className="form-auth"
        onSubmit={handleLogin}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Địa chỉ email"
          name="email"
          autoComplete="email"
          onChange={handleChangeInputData}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Mật khẩu"
          type="password"
          autoComplete="current-password"
          onChange={handleChangeInputData}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Đăng nhập
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              to="/forgot-pass"
              style={{
                textDecoration: "none",
                color: `${switchTheme ? "#e5e5e5" : "#222"}`,
                fontSize: "12px",
              }}
            >
              Quên mật khẩu?
            </Link>
          </Grid>
          <Grid item>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: `${switchTheme ? "#e5e5e5" : "#222"}`,
                fontSize: "12px",
              }}
            >
              Tôi chưa có tài khoản ? tôi muốn đăng ký
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Login;
