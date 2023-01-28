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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ClearSuccess,
  UpdatedAdminUser,
} from "../../../redux/reducer/users.slice";
import { RootState, useAppDispatch } from "../../../redux/store";
interface EditUserProps {
  setOpen: any;
}

const EditUser: React.FunctionComponent<EditUserProps> = ({
  setOpen,
}: EditUserProps) => {
  const { success, userById } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  const role = [
    { label: "Admin", value: "admin" },
    { label: "Content", value: "content" },
    { label: "User", value: "user" },
  ];

  const [dataCreateUser, setDataCreateUser] = React.useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    id: "",
  });
  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataCreateUser({
      ...dataCreateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditUser = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    dispatch(UpdatedAdminUser(dataCreateUser));
  };

  React.useEffect(() => {
    if (userById) {
      setDataCreateUser({
        first_name: userById?.data.firstName,
        last_name: userById?.data?.lastName,
        gender: userById?.data?.gender,
        email: userById?.data?.email,
        password: userById?.data?.showpass,
        phone: userById?.data?.phone,
        role: userById?.data?.role,
        id: userById?.data?.id,
      });
    }
    if (success) {
      toast.success(success);
      dispatch(ClearSuccess());
      setOpen(false);
    }
    if (success?.warning) {
      toast.warning(success.message);
      dispatch(ClearSuccess());
      setOpen(false);
    }
  }, [
    userById,
    userById?.data?.firstName,
    userById?.data?.lastName,
    userById?.data?.gender,
    userById?.data?.email,
    userById?.data?.showpass,
    userById?.data?.phone,
    userById?.data?.role,
    userById?.data?.id,
    dispatch,
    success,
    setOpen,
  ]);

  return (
    <Box
      component="form"
      sx={{ width: "100%", minWidth: "500px", margin: "0 auto" }}
      className="form-auth"
      onSubmit={handleEditUser}
    >
      <>
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
          autoComplete="phone"
          value={dataCreateUser.phone}
          onChange={handleChangeInputData}
        />

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="role"
            onChange={handleChangeInputData}
          >
            {role.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={
                  <Radio
                    checked={dataCreateUser.role === item.value ? true : false}
                  />
                }
                label={item.label}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </>
    </Box>
  );
};

export default EditUser;
