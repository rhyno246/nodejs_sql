import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/backend/Layout";
import { GetPostAdminById } from "../../redux/reducer/posts.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { idolTokuDa } from "../../utils/baseAvartar";
interface DetailPostProps {}

const DetailPost: React.FunctionComponent<DetailPostProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { postById } = useSelector((state: RootState) => state.posts);
  const [imageUrl, setImageUrl] = React.useState<File>(null);
  const [dataCreatePost, setDataCreatePost] = React.useState({
    title: "",
    description: "",
    category: "",
    content: "",
    status: "",
    image: "",
  });
  const handleChangeInputData = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDataCreatePost({
      ...dataCreatePost,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    dispatch(GetPostAdminById(id));
    setDataCreatePost({
      title: postById?.data.title,
      description: postById?.data.description,
      category: postById?.data.category,
      content: postById?.data.content,
      status: postById?.data.status,
      image: postById?.data.image,
    });
  }, [
    dispatch,
    id,
    postById?.data.title,
    postById?.data.description,
    postById?.data.category,
    postById?.data.content,
    postById?.data.status,
    postById?.data.image,
  ]);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      var file = event.target.files[0];
      setImageUrl(file);
    }
  };

  const hanleEditPost = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
  };

  return (
    <Layout>
      <Box
        component="form"
        encType="multipart/form-data"
        onSubmit={hanleEditPost}
        className="form-auth"
      >
        <TextField
          margin="normal"
          fullWidth
          label="Title"
          name="title"
          onChange={handleChangeInputData}
          autoComplete="title"
          value={dataCreatePost.title}
          sx={{ marginBottom: "0px" }}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Description"
          name="description"
          onChange={handleChangeInputData}
          autoComplete="description"
          value={dataCreatePost.description}
          sx={{ marginBottom: "15px" }}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Button variant="contained" component="label">
            Update Image Post
            <input
              type="file"
              id="file"
              hidden
              accept="image/*"
              onChange={handleSelectFile}
            />
          </Button>
          {imageUrl ? (
            <Avatar
              src={URL.createObjectURL(imageUrl)}
              sx={{ marginLeft: "10px" }}
            />
          ) : (
            <Avatar
              src={dataCreatePost.image ? dataCreatePost.image : idolTokuDa}
              sx={{ marginLeft: "10px" }}
            />
          )}
          <FormControl sx={{ marginLeft: "35px" }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="status"
              onChange={handleChangeInputData}
            >
              <FormControlLabel value="show" control={<Radio />} label="Show" />
              <FormControlLabel value="hide" control={<Radio />} label="Hide" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Layout>
  );
};

export default DetailPost;
