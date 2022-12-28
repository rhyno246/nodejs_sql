import * as React from "react";
import Layout from "../../../components/client/Layout";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
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
      >
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
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
                color: "#000",
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
                color: "#000",
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
