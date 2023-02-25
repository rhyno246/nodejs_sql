import { Box, Button } from "@mui/material";
import * as React from "react";
import ImageIcon from "@mui/icons-material/Image";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { toast } from "react-toastify";
import {
  ClearError,
  ClearSuccess,
  createStories,
} from "../../../redux/reducer/stories.slice";
interface CreateStoriesProps {
  setOpen: any;
}

const CreateStories: React.FunctionComponent<CreateStoriesProps> = ({
  setOpen,
}: CreateStoriesProps) => {
  const [imageUrl, setImageUrl] = React.useState<File>(null);
  const { userByEmail } = useSelector((state: RootState) => state.users);
  const { success, error } = useSelector((state: RootState) => state.stories);
  const dispatch = useAppDispatch();
  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      var file = event.target.files[0];
      setImageUrl(file);
    }
  };

  const hanleCreateStories = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    const form = new FormData();
    if (imageUrl) {
      form.append("file", imageUrl);
      form.append("image", imageUrl.name);
      form.append("id", userByEmail.id);
      dispatch(createStories(form));
      setOpen(false);
    } else {
      toast.error("You have not entered data");
      return;
    }
  };
  React.useEffect(() => {
    if (success) {
      toast.success(success.message);
      dispatch(ClearSuccess());
    }
    if (error) {
      toast.error(error.message);
      dispatch(ClearError());
    }
  }, [success, error, dispatch]);

  return (
    <Box
      component="form"
      encType="multipart/form-data"
      onSubmit={hanleCreateStories}
      className="form-auth"
    >
      <Button variant="contained" component="label">
        Select File
        <input
          type="file"
          id="file"
          hidden
          accept="image/*"
          name="image"
          onChange={handleSelectFile}
        />
      </Button>
      <Box
        component="span"
        sx={{
          height: "250px",
          border: "1px dashed grey",
          width: "450px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {imageUrl ? (
          <img
            src={URL.createObjectURL(imageUrl)}
            alt={`${imageUrl}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <ImageIcon sx={{ fontSize: "50px" }} />
        )}
      </Box>
      <Button type="submit" variant="contained" sx={{ marginTop: "15px" }}>
        Create Stories
      </Button>
    </Box>
  );
};

export default CreateStories;
