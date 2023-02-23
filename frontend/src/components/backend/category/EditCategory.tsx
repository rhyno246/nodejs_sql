import { Box } from "@mui/system";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import * as React from "react";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { updateAdminCategory } from "../../../redux/reducer/category.slice";
import { toast } from "react-toastify";
interface EditCategoryProps {
  setOpen: any;
}

const EditCategory: React.FunctionComponent<EditCategoryProps> = ({
  setOpen,
}: EditCategoryProps) => {
  const { CategoryById } = useSelector((state: RootState) => state.category);
  const { userByEmail } = useSelector((state: RootState) => state.users);
  const [dataCreateCategory, setDataCreateCategory] = React.useState({
    name: "",
    id: "",
    userId: "",
  });

  const dispatch = useAppDispatch();

  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataCreateCategory({
      ...dataCreateCategory,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    setDataCreateCategory({
      id: CategoryById?.data?.id,
      name: CategoryById?.data?.name,
      userId: userByEmail?.id,
    });
  }, [userByEmail?.id, CategoryById?.data?.name, CategoryById?.data?.id]);

  const handleUpdateCategory = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    if (dataCreateCategory.name === "") {
      toast.error("You have not entered data");
      return;
    }
    dispatch(updateAdminCategory(dataCreateCategory));
    setOpen(false);
  };

  return (
    <Box
      component="form"
      sx={{ width: "100%", minWidth: "500px", margin: "0 auto" }}
      className="form-auth"
      onSubmit={handleUpdateCategory}
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
        Update Category
      </Button>
    </Box>
  );
};

export default EditCategory;
