import * as React from "react";
import { Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { idolTokuDa } from "../../../utils/baseAvartar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box } from "@mui/system";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { backend_Url } from "../../../redux/axiosConfig/apiUrl";
interface ProFileProps {}

const ProFile: React.FunctionComponent<ProFileProps> = () => {
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  const { user } = useSelector((state: RootState) => state.users);

  return (
    <div className="profile">
      <Link
        to="/"
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          display: "flex",
          textDecoration: "none",
          color: switchTheme ? "#fff" : "#000",
        }}
      >
        <KeyboardBackspaceIcon />
        Về Trang Chủ
      </Link>
      <div className="container">
        <div className="main-profile">
          <div className="profile-pic-cover">
            <img src={idolTokuDa} alt="" className="img-res" />
            <Button
              variant="outlined"
              startIcon={<CameraAltIcon />}
              sx={{ position: "absolute", bottom: "10px", right: "10px" }}
            >
              Chỉnh sửa ảnh bìa
            </Button>
          </div>
          <Avatar
            alt="Remy Sharp"
            src={
              user?.user?.coverPic
                ? backend_Url + "/" + user?.user?.coverPic
                : idolTokuDa
            }
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
            {user?.user?.firstName + " " + user?.user?.lastName}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ProFile;
