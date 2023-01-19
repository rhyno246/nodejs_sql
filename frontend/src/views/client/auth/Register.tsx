import { Box, Button, Grid, TextField, Typography , Avatar } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import {  Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../../components/client/Layout";
import {
  ClearError,
  ClearSuccess,
  registerUser,
  uploadAvatar,
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
  const [avatar, setAvartar] = React.useState(null)
  const [dataCreateUser, setDataCreateUser] = React.useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    setDataCreateUser({
      ...dataCreateUser,
      [e.target.name]: e.target.value,
    });
  };

  

  // const onchangeAvartar = (e : React.ChangeEvent<HTMLInputElement>) : void =>{
  //   if(e.target.name === "cover_pic"){
  //     setAvartar(e?.target?.files[0]);
  //   }else{
  //     setDataCreateUser({ ...dataCreateUser,
  //       [e.target.name]: e.target.value})
  //   }
  // }
 


  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("file", avatar);
    dispatch(uploadAvatar(myForm));

    // myForm.set("first_name", dataCreateUser.first_name);
    // myForm.set("last_name", dataCreateUser.last_name);
    // myForm.set('gender' , dataCreateUser.gender);
    // myForm.set('email', dataCreateUser.email);
    // myForm.set('password', dataCreateUser.password);
    // myForm.set('phone', dataCreateUser.phone)
    // myForm.set("cover_pic", avatar);
    // dispatch(registerUser(myForm));
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
        encType="multipart/form-data"
        onSubmit={handleRegister}
        method ="POST"
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

        <Box sx={{ display : "flex" , alignItems : "center", mt : 2 }}>
          <Button variant="contained" component="label">
            Chọn avatar
            <input
                  type="file"
                  hidden
                  accept="image/*"
                  name="image"
                  onChange={(e) => setAvartar(e?.target?.files[0])}
                />
          </Button>
          { avatar && <Avatar src={URL.createObjectURL(avatar)} sx={{ marginLeft: "10px" }} />} 
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
