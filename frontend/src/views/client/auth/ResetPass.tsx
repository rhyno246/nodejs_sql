import * as React from "react";
import Layout from "../../../components/client/Layout";
import { Typography, Box, TextField, Button } from "@mui/material";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ClearSuccess,
  resetPassword,
} from "../../../redux/reducer/users.slice";
import { toast } from "react-toastify";
interface ResetPassProps {}

const ResetPass: React.FunctionComponent<ResetPassProps> = () => {
  const { success } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [password, setPassword] = React.useState({
    password: "",
  });
  const url = window.location.href;
  const hash = url.substring(url.indexOf("?") + 1);
  let result = hash.split("&");
  result = result[0].split("=");
  const email = result[1];

  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    dispatch(resetPassword(data));
  };

  React.useEffect(() => {
    if (success?.success === true) {
      toast.success(success?.message);
      history("/");
    } else {
      toast.error(success?.message);
    }
    dispatch(ClearSuccess());
  }, [success, dispatch, history]);
  return (
    <Layout>
      <Typography
        variant="h4"
        align="center"
        sx={{ textTransform: "uppercase" }}
      >
        Reset Mật Khẩu
      </Typography>
      <Box
        component="form"
        sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
        className="form-auth"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Nhập mật khẩu mới"
          name="password"
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
          Reset lại mật khẩu
        </Button>
      </Box>
    </Layout>
  );
};

export default ResetPass;
