import * as React from "react";
import { idolTokuDa } from "../../../utils/baseAvartar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, Avatar, Box } from "@mui/material";
import { useAppDispatch } from "../../../redux/store";
import { updateProfilePic } from "../../../redux/reducer/users.slice";
interface ChangeProFilePicProps {
  data: any;
}

const ChangeProFilePic: React.FunctionComponent<ChangeProFilePicProps> = ({
  data,
}: ChangeProFilePicProps) => {
  const [profilePic, setProfilePic] = React.useState<File>(null);
  const dispatch = useAppDispatch();
  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      var file = event.target.files[0];
      setProfilePic(file);
    }
  };

  React.useEffect(() => {
    if (profilePic) {
      const form = new FormData();
      form.append("file", profilePic);
      form.append("image", profilePic.name);
      form.append("id", data?.id);
      dispatch(updateProfilePic(form));
    }
  }, [profilePic, dispatch, data?.id]);

  return (
    <>
      <Box
        encType="multipart/form-data"
        component="form"
        sx={{ width: "100%", minWidth: "500px", margin: "0 auto" }}
        className="form-auth"
      >
        <Button
          variant="outlined"
          startIcon={<CameraAltIcon />}
          component="label"
          sx={{ position: "absolute", bottom: "10px", right: "10px" }}
        >
          Chỉnh sửa ảnh bìa
          <input
            type="file"
            id="files"
            hidden
            accept="image/*"
            name="image"
            onChange={handleSelectFile}
          />
        </Button>
      </Box>
      <Avatar
        alt="Remy Sharp"
        src={data?.coverPic ? data?.coverPic : idolTokuDa}
        sx={{
          width: 200,
          height: 200,
          position: "absolute",
          bottom: "-120px",
          left: "50px",
          zIndex: "9",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-50px",
          left: "270px",
          fontSize: "25px",
          textTransform: "capitalize",
        }}
      >
        {data && data.firstName + " " + data.lastName}
      </Box>
    </>
  );
};

export default ChangeProFilePic;
