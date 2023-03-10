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
    const form = new FormData();
    form.append("first_name", dataCreateUser.first_name);
    form.append("last_name", dataCreateUser.last_name);
    form.append("gender", dataCreateUser.gender);
    form.append("email", dataCreateUser.email);
    form.append("password", dataCreateUser.password);
    form.append("showpass", dataCreateUser.showpass);
    form.append("phone", dataCreateUser.phone);
    if (avatar) {
      form.append("file", avatar);
      form.append("image", avatar.name);
    }
    dispatch(registerUser(form));
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
        ????ng k??
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
          label="H???"
          name="first_name"
          onChange={handleChangeInputData}
          autoComplete="first_name"
        />
        <TextField
          margin="normal"
          fullWidth
          label="T??n"
          name="last_name"
          onChange={handleChangeInputData}
          autoComplete="last_name"
        />

        <TextField
          margin="normal"
          fullWidth
          label="Gi???i t??nh"
          name="gender"
          autoComplete="gender"
          onChange={handleChangeInputData}
        />

        <TextField
          margin="normal"
          fullWidth
          label="?????a ch??? email"
          name="email"
          autoComplete="email"
          onChange={handleChangeInputData}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="M???t Kh???u"
          type="password"
          autoComplete="current-password"
          onChange={handleChangeInputData}
        />
        <input name="showpass" onChange={handleChangeInputData} hidden />

        <TextField
          margin="normal"
          fullWidth
          name="phone"
          label="S??? ??i???n tho???i"
          type="number"
          onChange={handleChangeInputData}
        />

        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Button variant="contained" component="label">
            Ch???n avatar
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
          ????ng k?? t??i kho???n
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
              B???n mu???n ????ng nh???p ?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Register;
