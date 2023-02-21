import * as React from "react";
import { Button, Avatar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import {
  GetUserByEmail,
  updateProfile,
} from "../../../redux/reducer/users.slice";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { idolTokuDa } from "../../../utils/baseAvartar";

interface UpdateUserProps {
  data: any;
  setOpenEdit: any;
}

const UpdateUser: React.FunctionComponent<UpdateUserProps> = ({
  data,
  setOpenEdit,
}: UpdateUserProps) => {
  const { success } = useSelector((state: RootState) => state.users);
  const [avatar, setAvartar] = React.useState<File>(null);
  const dispatch = useAppDispatch();
  const [dataCreateUser, setDataCreateUser] = React.useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    id: "",
    image: "",
  });
  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  React.useEffect(() => {
    if (data) {
      setDataCreateUser({
        first_name: data.firstName,
        last_name: data.lastName,
        gender: data.gender,
        email: data.email,
        password: data.showpass,
        phone: data.phone,
        role: data.role,
        id: data.id,
        image: data.coverPic,
      });
    }
    if (success) {
      setOpenEdit(false);
      toast.success(success);
      dispatch(GetUserByEmail(data.email));
    }
  }, [data, success, setOpenEdit, dispatch]);
  const handleEditUser = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    const form = new FormData();
    form.append("id", dataCreateUser.id);
    form.append("first_name", dataCreateUser.first_name);
    form.append("last_name", dataCreateUser.last_name);
    form.append("gender", dataCreateUser.gender);
    form.append("email", dataCreateUser.email);
    form.append("password", dataCreateUser.password);
    form.append("showpass", dataCreateUser.password);
    form.append("phone", dataCreateUser.phone);
    if (avatar) {
      form.append("file", avatar);
      form.append("image", avatar.name);
    } else {
      form.append("image", data.coverPic ? data.coverPic : idolTokuDa);
    }
    dispatch(updateProfile(form));
  };

  return (
    <Box
      encType="multipart/form-data"
      component="form"
      sx={{ width: "100%", minWidth: "500px", margin: "0 auto" }}
      className="form-auth"
      onSubmit={handleEditUser}
    >
      <>
        <TextField
          margin="normal"
          fullWidth
          label="Họ"
          name="first_name"
          autoComplete="first_name"
          value={dataCreateUser.first_name}
          onChange={handleChangeInputData}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Tên"
          name="last_name"
          autoComplete="last_name"
          value={dataCreateUser.last_name}
          onChange={handleChangeInputData}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Giới tính"
          name="gender"
          autoComplete="gender"
          value={dataCreateUser.gender}
          onChange={handleChangeInputData}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          autoComplete="email"
          value={dataCreateUser.email}
          onChange={handleChangeInputData}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Mật khẩu"
          type="password"
          autoComplete="current-password"
          value={dataCreateUser.password}
          onChange={handleChangeInputData}
        />

        <TextField
          margin="normal"
          fullWidth
          name="phone"
          label="Số điện thoại"
          type="number"
          autoComplete="phone"
          value={dataCreateUser.phone}
          onChange={handleChangeInputData}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Button variant="contained" component="label">
            Chọn avatar
            <input
              type="file"
              id="file"
              hidden
              accept="image/*"
              name="image"
              onChange={handleSelectFile}
            />
          </Button>
          {avatar ? (
            <Avatar
              src={URL.createObjectURL(avatar)}
              sx={{ marginLeft: "10px" }}
            />
          ) : (
            <Avatar src={dataCreateUser.image} sx={{ marginLeft: "10px" }} />
          )}
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Cập Nhật Thông Tin
        </Button>
      </>
    </Box>
  );
};

export default UpdateUser;
