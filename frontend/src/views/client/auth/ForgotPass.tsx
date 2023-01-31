import * as React from "react";
import Layout from "../../../components/client/Layout";
import { Typography, Box, TextField, Button } from "@mui/material";
interface ForgotPassProps {}

const ForgotPass: React.FunctionComponent<ForgotPassProps> = () => {
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
      >
        <TextField
          margin="normal"
          fullWidth
          label="Nhập địa chỉ email để lấy lại mật khẩu"
          name="email"
          autoComplete="email"
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
