import * as React from "react";
import TextField from "@mui/material/TextField/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import { RootState, useAppDispatch } from "../../../redux/store";
import { createCategory } from "../../../redux/reducer/category.slice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
interface CreateCategoryProps {}

const CreateCategory: React.FunctionComponent<CreateCategoryProps> = () => {
  const dispatch = useAppDispatch();
  const { userByEmail } = useSelector((state: RootState) => state.users);
  const [dataCreateCategory, setDataCreateCategory] = React.useState({
    name: "",
    id: userByEmail?.id,
  });

  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataCreateCategory({
      ...dataCreateCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCategory = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    if (dataCreateCategory.name === "") {
      toast.error("You have not entered data");
      return;
    }
    dispatch(createCategory(dataCreateCategory));
  };

  return (
    <Box
      component="form"
      sx={{ width: "100%", minWidth: "500px", margin: "0 auto" }}
      className="form-auth"
      onSubmit={handleCreateCategory}
    >
      <TextField
        margin="normal"
        fullWidth
        label="Name"
        name="name"
        autoComplete="name"
        value={dataCreateCategory.name}
        onChange={handleChangeInputData}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create Category
      </Button>
    </Box>
  );
};

export default CreateCategory;
