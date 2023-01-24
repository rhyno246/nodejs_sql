import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../../components/client/Layout";
import {
  ClearError,
  ClearSuccess,
  registerUser,
  // uploadAvatar,
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
  const [avatar, setAvartar] = React.useState<File>(null);
  const [dataCreateUser, setDataCreateUser] = React.useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
    showpass: "",
    phone: "",
    image: "",
  });
  const handleChangeInputData = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDataCreateUser({
      ...dataCreateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      var file = event.target.files[0];
      setAvartar(file);
    }
  };
  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("first_name", dataCreateUser.first_name);
    formData.set("last_name", dataCreateUser.last_name);
    formData.set("gender", dataCreateUser.gender);
    formData.set("email", dataCreateUser.email);
    formData.set("password", dataCreateUser.password);
    formData.set("showpass", dataCreateUser.showpass);
    formData.set("phone", dataCreateUser.phone);
    formData.set("upload", avatar);
    if (avatar) {
      formData.set("image", avatar.name);
    }
    dispatch(registerUser(formData));
  };
  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(ClearError());
    }
    if (success === true) {
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
        encType="multipart/form-data"
        onSubmit={handleRegister}
        sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
        className="form-auth"
      >
        <TextField
          margin="normal"
          fullWidth
          label="Họ"
          name="first_name"
          onChange={handleChangeInputData}
          autoComplete="first_name"
        />
        <TextField
          margin="normal"
          fullWidth
          label="Tên"
          name="last_name"
          onChange={handleChangeInputData}
          autoComplete="last_name"
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
        <input name="showpass" onChange={handleChangeInputData} hidden />

        <TextField
          margin="normal"
          fullWidth
          name="phone"
          label="Số điện thoại"
          type="number"
          onChange={handleChangeInputData}
        />

        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Button variant="contained" component="label">
            Chọn avatar
            <input
              type="file"
              id="file"
              hidden
              accept="image/*"
              name="image"
              onChange={handleSelectFile}
            />
          </Button>
          {avatar && (
            <Avatar
              src={URL.createObjectURL(avatar)}
              sx={{ marginLeft: "10px" }}
            />
          )}
        </Box>

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
