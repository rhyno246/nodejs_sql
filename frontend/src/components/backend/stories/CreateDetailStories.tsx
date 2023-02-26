import { Box, Button, TextField } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import * as React from "react";
import { RootState, useAppDispatch } from "../../../redux/store";
import { toast } from "react-toastify";
import {
  ClearError,
  ClearSuccess,
  createListImage,
} from "../../../redux/reducer/stories.slice";
import { useSelector } from "react-redux";
interface CreateDetailStoriesProps {
  setOpen: any;
  storiesId: any;
}

const CreateDetailStories: React.FunctionComponent<
  CreateDetailStoriesProps
> = ({ setOpen, storiesId }: CreateDetailStoriesProps) => {
  const [imageUrl, setImageUrl] = React.useState<File>(null);
  const [dataCreateStories, setDataCreateStories] = React.useState({
    title: "",
  });
  const { success, error } = useSelector((state: RootState) => state.stories);
  const dispatch = useAppDispatch();
  const handleChangeInputData = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDataCreateStories({
      ...dataCreateStories,
      [e.target.name]: e.target.value,
    });
  };

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
      form.append("title", dataCreateStories.title);
      form.append("file", imageUrl);
      form.append("image", imageUrl.name);
      form.append("id", storiesId);
      dispatch(createListImage(form));
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
      <TextField
        margin="normal"
        fullWidth
        label="Title"
        name="title"
        onChange={handleChangeInputData}
        autoComplete="title"
        sx={{ marginBottom: "0px" }}
      />
      <Box
        component="label"
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
        <input
          type="file"
          id="file"
          hidden
          accept="image/*"
          name="image"
          onChange={handleSelectFile}
        />
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

export default CreateDetailStories;
