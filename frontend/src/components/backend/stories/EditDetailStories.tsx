import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ImageIcon from "@mui/icons-material/Image";
import * as React from "react";
interface EditDetailStoriesProps {
  setOpen: any;
  idListImage: any;
}

const EditDetailStories: React.FunctionComponent<EditDetailStoriesProps> = ({
  setOpen,
  idListImage,
}: EditDetailStoriesProps) => {
  const [imageUrl, setImageUrl] = React.useState<File>(null);
  const [dataCreateStories, setDataCreateStories] = React.useState({
    title: "",
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
  return (
    <Box>
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

export default EditDetailStories;
