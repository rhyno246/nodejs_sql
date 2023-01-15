import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
interface CreateUserProps {}

const CreateUser: React.FunctionComponent<CreateUserProps> = () => {
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
  return (
    <Box
      component="form"
      sx={{ width: "100%", minWidth: "500px", margin: "0 auto" }}
      className="form-auth"
    >
      <TextField
        margin="normal"
        fullWidth
        label="first_name"
        name="first_name"
        autoComplete="first_name"
        onChange={handleChangeInputData}
      />
      <TextField
        margin="normal"
        fullWidth
        label="last_name"
        name="last_name"
        autoComplete="last_name"
        onChange={handleChangeInputData}
      />

      <TextField
        margin="normal"
        fullWidth
        label="gender"
        name="gender"
        autoComplete="gender"
        onChange={handleChangeInputData}
      />

      <TextField
        margin="normal"
        fullWidth
        label="email"
        name="email"
        autoComplete="email"
        onChange={handleChangeInputData}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="password"
        type="password"
        autoComplete="current-password"
        onChange={handleChangeInputData}
      />

      <TextField
        margin="normal"
        fullWidth
        name="phone"
        label="phone"
        type="number"
        autoComplete="number"
        onChange={handleChangeInputData}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        // disabled={loading ? true : false}
      >
        Create User
      </Button>
    </Box>
  );
};

export default CreateUser;
