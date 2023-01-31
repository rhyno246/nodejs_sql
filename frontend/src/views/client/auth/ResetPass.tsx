import * as React from "react";
import Layout from "../../../components/client/Layout";
import { Typography, Box, TextField, Button } from "@mui/material";
interface ResetPassProps {}

const ResetPass: React.FunctionComponent<ResetPassProps> = () => {
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
      >
        <TextField
          margin="normal"
          fullWidth
          label="Nhập mật khẩu mới"
          name="password"
          type="password"
          autoComplete="current-password"
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
