import * as React from "react";
import Layout from "../../../components/client/Layout";
import { Typography, Box, TextField, Button } from "@mui/material";
import { RootState, useAppDispatch } from "../../../redux/store";
import {
  ClearSuccess,
  forgotPassword,
} from "../../../redux/reducer/users.slice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface ForgotPassProps {}

const ForgotPass: React.FunctionComponent<ForgotPassProps> = () => {
  const [email, setEmail] = React.useState({
    email: "",
  });

  const { success } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  React.useEffect(() => {
    if (success?.success === true) {
      toast.success(success?.message);
      history("/");
    } else {
      toast.error(success?.message);
    }
    dispatch(ClearSuccess());
  }, [success, history, dispatch]);

  return (
    <Layout>
      <Typography
        variant="h4"
        align="center"
        sx={{ textTransform: "uppercase" }}
      >
        Quên Mật Khẩu
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
          label="Nhập địa chỉ email để lấy lại mật khẩu"
          name="email"
          autoComplete="email"
          onChange={handleChangeInputData}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Lấy lại mật khẩu
        </Button>
      </Box>
    </Layout>
  );
};

export default ForgotPass;
