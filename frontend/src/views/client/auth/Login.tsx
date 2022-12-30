import * as React from "react";
import Layout from "../../../components/client/Layout";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
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
    console.log(user);
  };

  return (
    <Layout>
      <Typography
        variant="h4"
        align="center"
        sx={{ textTransform: "uppercase" }}
      >
        Login
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
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={handleChangeInputData}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
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
          LogIn
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: `${switchTheme ? "#e5e5e5" : "#222"}`,
                fontSize: "12px",
              }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: `${switchTheme ? "#e5e5e5" : "#222"}`,
                fontSize: "12px",
              }}
            >
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Login;
