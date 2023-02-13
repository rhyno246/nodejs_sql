import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import * as React from "react";
import Layout from "../../components/backend/Layout";
import { idolTokuDa } from "../../utils/baseAvartar";
import { apiUrl } from "../../redux/axiosConfig/apiUrl";
import { getItem } from "../../utils/useLocalStorage";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  ClearError,
  ClearSuccess,
  createPosts,
} from "../../redux/reducer/posts.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface NewPostProps {}

const NewPost: React.FunctionComponent<NewPostProps> = () => {
  const apiKey = "27gbkyb2d15yn0ajmprg2i7cshbo11i8socgaraxzle1gf4y";
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const { userByEmail } = useSelector((state: RootState) => state.users);
  const { success, error } = useSelector((state: RootState) => state.posts);
  const editorRef = React.useRef(null);
  const [imageUrl, setImageUrl] = React.useState<File>(null);
  const [dataCreatePost, setDataCreatePost] = React.useState({
    title: "",
    description: "",
    category: "",
    content: "",
    status: "show",
  });
  const handleChangeInputData = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDataCreatePost({
      ...dataCreatePost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      var file = event.target.files[0];
      setImageUrl(file);
    }
  };

  const hanleCreatePost = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", dataCreatePost.title);
    form.append("description", dataCreatePost.description);
    form.append("content", editorRef.current.getContent());
    form.append("id", userByEmail.id);
    form.append("status", dataCreatePost.status);
    form.append("category", dataCreatePost.category);
    if (imageUrl) {
      form.append("file", imageUrl);
      form.append("image", imageUrl.name);
    }
    dispatch(createPosts(form));
  };

  React.useEffect(() => {
    if (success) {
      toast.success(success.message);
      dispatch(ClearSuccess());
      history("/admin/post");
    }
    if (error) {
      toast.error(error.message);
      dispatch(ClearError());
    }
  }, [success, error, dispatch, history]);

  return (
    <Layout>
      <Box
        component="form"
        encType="multipart/form-data"
        onSubmit={hanleCreatePost}
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

        <TextField
          margin="normal"
          fullWidth
          label="Description"
          name="description"
          onChange={handleChangeInputData}
          autoComplete="description"
          sx={{ marginBottom: "15px" }}
        />
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dataCreatePost.category}
            label="Category"
            onChange={handleChangeInputData}
            name="category"
          >
            <MenuItem value="bong-da">Bong Da</MenuItem>
            <MenuItem value="bong-ro">Bong Ro</MenuItem>
            <MenuItem value="tennis">tennis</MenuItem>
          </Select>
        </FormControl>
        <Editor
          apiKey={apiKey}
          onInit={(evt, editor) => (editorRef.current = editor)}
          plugins=" preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount  help charmap quickbars emoticons"
          init={{
            images_upload_handler: (blobInfo) => {
              return new Promise((success, failure) => {
                var xhr: any, formData;
                xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open("POST", `${apiUrl + "/admin/uploads"}`);
                var user = getItem("user");
                xhr.setRequestHeader("X-CSRF-TOKEN", user.token);
                xhr.onload = function () {
                  if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    success(data.url);
                  }
                };

                formData = new FormData();
                formData.append("image", blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
              });
            },
            height: 450,
            menubar: true,
            toolbar:
              "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Button variant="contained" component="label">
            Select Image Post
            <input
              type="file"
              id="file"
              hidden
              accept="image/*"
              name="image"
              onChange={handleSelectFile}
            />
          </Button>
          {imageUrl ? (
            <Avatar
              src={URL.createObjectURL(imageUrl)}
              sx={{ marginLeft: "10px" }}
            />
          ) : (
            <Avatar src={idolTokuDa} sx={{ marginLeft: "10px" }} />
          )}
          <FormControl sx={{ marginLeft: "35px" }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              defaultValue="show"
              name="status"
              onChange={handleChangeInputData}
            >
              <FormControlLabel value="show" control={<Radio />} label="Show" />
              <FormControlLabel value="hide" control={<Radio />} label="Hide" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Button type="submit" variant="contained" sx={{ marginTop: "15px" }}>
          Create Post
        </Button>
      </Box>
    </Layout>
  );
};

export default NewPost;
