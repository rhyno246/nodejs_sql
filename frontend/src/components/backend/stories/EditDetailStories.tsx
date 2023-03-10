import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ClearError,
  ClearSuccess,
  updateAdminListChildImage,
} from "../../../redux/reducer/stories.slice";
import { RootState, useAppDispatch } from "../../../redux/store";
interface EditDetailStoriesProps {
  setOpen: any;
}

const EditDetailStories: React.FunctionComponent<EditDetailStoriesProps> = ({
  setOpen,
}: EditDetailStoriesProps) => {
  const [imageUrl, setImageUrl] = React.useState<File>(null);
  const [dataCreateStories, setDataCreateStories] = React.useState({
    id: "",
    title: "",
    image: "",
  });
  const dispatch = useAppDispatch();
  const { listChildImage, success, error } = useSelector(
    (state: RootState) => state.stories
  );

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

  const hanleUpdatedListImage = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", dataCreateStories?.title);
    form.append("id", listChildImage?.id);
    if (imageUrl) {
      form.append("file", imageUrl);
      form.append("image", imageUrl.name);
    } else {
      form.append("image", dataCreateStories?.image);
    }
    dispatch(updateAdminListChildImage(form));
  };

  React.useEffect(() => {
    if (listChildImage) {
      setDataCreateStories({
        title: listChildImage?.title,
        image: listChildImage?.image,
        id: listChildImage?.id,
      });
    }
    if (success) {
      toast.success(success.message);
      dispatch(ClearSuccess());
      setOpen(false);
    }
    if (error) {
      toast.error(error.message);
      dispatch(ClearError());
    }
  }, [
    listChildImage,
    listChildImage?.title,
    listChildImage?.image,
    listChildImage?.id,
    success,
    error,
    dispatch,
    setOpen,
  ]);

  return (
    <Box
      encType="multipart/form-data"
      component="form"
      onSubmit={hanleUpdatedListImage}
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
        value={dataCreateStories.title}
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
          <img
            src={dataCreateStories?.image}
            alt={`${dataCreateStories?.title}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </Box>
      <Button type="submit" variant="contained" sx={{ marginTop: "15px" }}>
        Update List Image
      </Button>
    </Box>
  );
};

export default EditDetailStories;
