import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../../components/client/Layout";
import { registerUser } from "../../../redux/reducer/users.slice";
import { RootState, useAppDispatch } from "../../../redux/store";
interface RegisterProps {}

const Register: React.FunctionComponent<RegisterProps> = () => {
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  const error = useSelector((state: RootState) => state.users.error);
  const dispatch = useAppDispatch();
  const [dataCreateUser, setDataCreateUser] = React.useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataCreateUser({
      ...dataCreateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(registerUser(dataCreateUser));
  };

  console.log(error);
  return (
    <Layout>
      <Typography
        variant="h4"
        align="center"
        sx={{ textTransform: "uppercase" }}
      >
        Đăng ký
      </Typography>
      <Box
        component="form"
        sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
        className="form-auth"
        onSubmit={handleRegister}
      >
        {error?.success === false ? (
          <Alert severity="error" color="error" sx={{ margin: "10px 0" }}>
            {error?.message}
          </Alert>
        ) : (
          ""
        )}
        <TextField
          margin="normal"
          fullWidth
          label="Họ"
          name="first_name"
          autoComplete="first_name"
          onChange={handleChangeInputData}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Tên"
          name="last_name"
          autoComplete="last_name"
          onChange={handleChangeInputData}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Giới tính"
          name="gender"
          autoComplete="gender"
          onChange={handleChangeInputData}
        />

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
          label="Mật Khẩu"
          type="password"
          autoComplete="current-password"
          onChange={handleChangeInputData}
        />

        <TextField
          margin="normal"
          fullWidth
          name="phone"
          label="Số điện thoại"
          type="number"
          autoComplete="number"
          onChange={handleChangeInputData}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Đăng ký tài khoản
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: `${switchTheme ? "#e5e5e5" : "#222"}`,
                fontSize: "12px",
              }}
            >
              Bạn muốn đăng nhập ?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Register;
