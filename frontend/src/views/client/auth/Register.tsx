import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../../components/client/Layout";
import {
  ClearError,
  ClearSuccess,
  registerUser,
} from "../../../redux/reducer/users.slice";
import { RootState, useAppDispatch } from "../../../redux/store";
interface RegisterProps {}

const Register: React.FunctionComponent<RegisterProps> = () => {
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  const { error, success, loading } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [dataCreateUser, setDataCreateUser] = React.useState({
    first_name: "",
    last_name: "",
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

  const handleRegister = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(registerUser(dataCreateUser));
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(ClearError());
    }
    if (success) {
      history("/login");
      dispatch(ClearSuccess());
    }
  }, [error, dispatch, success, history]);
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
        <TextField
          margin="normal"
          fullWidth
          label="Họ"
          name="first_name"
          onChange={handleChangeInputData}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Tên"
          name="last_name"
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
          onChange={handleChangeInputData}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Mật Khẩu"
          type="password"
          onChange={handleChangeInputData}
        />

        <TextField
          margin="normal"
          fullWidth
          name="phone"
          label="Số điện thoại"
          type="number"
          onChange={handleChangeInputData}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading ? true : false}
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
