import { Box, Button } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ClearError,
  ClearSuccess,
  updateAdminStories,
} from "../../../redux/reducer/stories.slice";
import { RootState, useAppDispatch } from "../../../redux/store";
interface EditStoriesProps {
  setOpen: any;
  idListImage: any;
}

const EditStories: React.FunctionComponent<EditStoriesProps> = ({
  setOpen,
  idListImage,
}: EditStoriesProps) => {
  const [imageUrl, setImageUrl] = React.useState<File>(null);
  const dispatch = useAppDispatch();
  const { userByEmail } = useSelector((state: RootState) => state.users);
  const { StoriesDetail, success, error } = useSelector(
    (state: RootState) => state.stories
  );
  const [dataCreateStories, setDataCreateStories] = React.useState({
    id: "",
    image: "",
  });
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
  const hanleUpdatedStoriesImage = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    const form = new FormData();
    form.append("userId", userByEmail?.id);
    form.append("id", idListImage);
    if (imageUrl) {
      form.append("file", imageUrl);
      form.append("image", imageUrl.name);
    } else {
      form.append("image", dataCreateStories?.image);
    }
    dispatch(updateAdminStories(form));
  };

  React.useEffect(() => {
    if (StoriesDetail) {
      setDataCreateStories({
        image: StoriesDetail?.image,
        id: StoriesDetail?.id,
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
    StoriesDetail,
    StoriesDetail?.image,
    StoriesDetail?.id,
    success,
    error,
    dispatch,
    setOpen,
  ]);

  return (
    <Box
      encType="multipart/form-data"
      component="form"
      onSubmit={hanleUpdatedStoriesImage}
      className="form-auth"
    >
      <Box
        component="label"
        sx={{
          height: "250px",
          border: "1px dashed grey",
          width: "450px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            alt={`${dataCreateStories?.image}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </Box>
      <input type="text" name="id" onChange={handleChangeInputData} hidden />
      <Button type="submit" variant="contained" sx={{ marginTop: "15px" }}>
        Update Stories Post
      </Button>
    </Box>
  );
};

export default EditStories;
