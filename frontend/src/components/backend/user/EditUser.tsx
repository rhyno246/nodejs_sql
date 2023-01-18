import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import * as React from "react";
interface EditUserProps {
  setOpen: any;
}

const EditUser: React.FunctionComponent<EditUserProps> = ({
  setOpen,
}: EditUserProps) => {
  const [dataCreateUser, setDataCreateUser] = React.useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
    role: "content",
  });
  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataCreateUser({
      ...dataCreateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditUser = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      sx={{ width: "100%", minWidth: "500px", margin: "0 auto" }}
      className="form-auth"
      onSubmit={handleEditUser}
    >
      <TextField
        margin="normal"
        fullWidth
        label="first_name"
        name="first_name"
        onChange={handleChangeInputData}
      />
      <TextField
        margin="normal"
        fullWidth
        label="last_name"
        name="last_name"
        onChange={handleChangeInputData}
      />

      <TextField
        margin="normal"
        fullWidth
        label="gender"
        name="gender"
        value={dataCreateUser.gender}
        onChange={handleChangeInputData}
      />

      <TextField
        margin="normal"
        fullWidth
        label="email"
        name="email"
        onChange={handleChangeInputData}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="password"
        type="password"
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

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="content"
          name="role"
          onChange={handleChangeInputData}
        >
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          <FormControlLabel
            value="content"
            control={<Radio />}
            label="Content"
          />
          <FormControlLabel value="user" control={<Radio />} label="User" />
        </RadioGroup>
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        //   disabled={loading ? true : false}
      >
        Create User
      </Button>
    </Box>
  );
};

export default EditUser;
