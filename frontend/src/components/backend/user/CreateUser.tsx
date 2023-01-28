import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import {
  ClearError,
  ClearSuccess,
  CreateUsersAdmin,
} from "../../../redux/reducer/users.slice";
import { toast } from "react-toastify";
interface CreateUserProps {
  setOpen: any;
}

const CreateUser: React.FunctionComponent<CreateUserProps> = ({
  setOpen,
}: CreateUserProps) => {
  const [dataCreateUser, setDataCreateUser] = React.useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
    showpass: "",
    role: "content",
  });
  const { error, success, loading } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(ClearError());
    }
    if (success?.success) {
      toast.success(success.message);
      dispatch(ClearSuccess());
      setOpen(false);
    }
    if (success?.warning) {
      toast.warning(success.message);
      dispatch(ClearSuccess());
      setOpen(false);
    }
  }, [success, error, dispatch, setOpen]);

  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataCreateUser({
      ...dataCreateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateUser = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    dispatch(CreateUsersAdmin(dataCreateUser));
    setDataCreateUser({
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      password: "",
      showpass: "",
      phone: "",
      role: "content",
    });
  };
  return (
    <Box
      component="form"
      sx={{ width: "100%", minWidth: "500px", margin: "0 auto" }}
      className="form-auth"
      onSubmit={handleCreateUser}
    >
      <input name="showpass" onChange={handleChangeInputData} hidden />
      <TextField
        margin="normal"
        fullWidth
        label="first_name"
        name="first_name"
        autoComplete="first_name"
        value={dataCreateUser.first_name}
        onChange={handleChangeInputData}
      />
      <TextField
        margin="normal"
        fullWidth
        label="last_name"
        name="last_name"
        autoComplete="last_name"
        value={dataCreateUser.last_name}
        onChange={handleChangeInputData}
      />

      <TextField
        margin="normal"
        fullWidth
        label="gender"
        name="gender"
        autoComplete="gender"
        value={dataCreateUser.gender}
        onChange={handleChangeInputData}
      />

      <TextField
        margin="normal"
        fullWidth
        label="email"
        name="email"
        autoComplete="email"
        value={dataCreateUser.email}
        onChange={handleChangeInputData}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="password"
        type="password"
        autoComplete="current-password"
        value={dataCreateUser.password}
        onChange={handleChangeInputData}
      />

      <TextField
        margin="normal"
        fullWidth
        name="phone"
        label="phone"
        type="number"
        autoComplete="number"
        value={dataCreateUser.phone}
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
        disabled={loading ? true : false}
      >
        Create User
      </Button>
    </Box>
  );
};

export default CreateUser;
