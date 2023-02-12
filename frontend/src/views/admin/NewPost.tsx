import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import * as React from "react";
import Layout from "../../components/backend/Layout";
import { idolTokuDa } from "../../utils/baseAvartar";

interface NewPostProps {}

const NewPost: React.FunctionComponent<NewPostProps> = () => {
  const apiKey = "27gbkyb2d15yn0ajmprg2i7cshbo11i8socgaraxzle1gf4y";
  const editorRef = React.useRef(null);
  const [imageUrl, setImageUrl] = React.useState<File>(null);
  const [dataCreatePost, setDataCreatePost] = React.useState({
    title: "",
    description: "",
    category: "",
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
    console.log(dataCreatePost, editorRef.current.getContent());
  };

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
          sx={{ marginBottom: "15px" }}
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
        <Editor
          apiKey={apiKey}
          onInit={(evt, editor) => (editorRef.current = editor)}
          plugins=" preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount  help charmap quickbars emoticons"
          init={{
            images_upload_url: "postAcceptor.php",
            height: 450,
            menubar: true,
            toolbar:
              "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <FormControl fullWidth sx={{ marginTop: "25px" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dataCreatePost.category}
            label="Category"
            onChange={handleChangeInputData}
            name="category"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

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
        </Box>
        <Button type="submit" variant="contained" sx={{ marginTop: "15px" }}>
          Create Post
        </Button>
      </Box>
    </Layout>
  );
};

export default NewPost;
