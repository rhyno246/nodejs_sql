import * as React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box } from "@mui/system";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import UserModal from "../../../components/backend/UserModal";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import {
  ClearError,
  ClearSuccess,
  GetUserByEmail,
} from "../../../redux/reducer/users.slice";
import UpdateUser from "./UpdateUser";
import ChangeProFilePic from "./ChangeProFilePic";
import { idolTokuDa } from "../../../utils/baseAvartar";
import { getProfileComment } from "../../../redux/reducer/comment.slice";
import SkeletonProfileComment from "../Skeleton/SkeletonProfileComment";
interface ProFileProps {}

const ProFile: React.FunctionComponent<ProFileProps> = () => {
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  const { userByEmail, user, error, success } = useSelector(
    (state: RootState) => state.users
  );

  const { comments, loading } = useSelector(
    (state: RootState) => state.comment
  );
  const [openEdit, setOpenEdit] = React.useState(false);
  const dispatch = useAppDispatch();
  const openModalEditUser = (): void => {
    setOpenEdit(true);
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(ClearError());
    }
    if (success) {
      dispatch(ClearSuccess());
    }
    dispatch(GetUserByEmail(user?.user?.email));
    dispatch(getProfileComment(userByEmail?.id));
  }, [error, success, dispatch, user, userByEmail?.id]);

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
        V??? Trang Ch???
      </Link>
      <div className="container">
        <div className="main-profile">
          <div className="profile-pic-cover">
            <img
              src={
                userByEmail?.profilePic ? userByEmail?.profilePic : idolTokuDa
              }
              alt=""
              className="img-res"
            />
          </div>

          <ChangeProFilePic data={userByEmail} />
          <Box
            sx={{
              position: "absolute",
              bottom: "-105px",
              left: "270px",
              fontSize: "25px",
              textTransform: "capitalize",
            }}
          >
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              onClick={openModalEditUser}
            >
              Ch???nh s???a th??ng tin c?? nh??n
            </Button>
          </Box>
        </div>
        <Box sx={{ paddingTop: "150px" }}>
          <Typography
            variant="h4"
            sx={{
              textTransform: "capitalize",
              paddingBottom: "10px",
              borderBottom: "1px solid #0072E5",
            }}
          >
            Ho???t ?????ng b??nh lu???n
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <div className="profile-comment">
              {loading ? (
                <SkeletonProfileComment />
              ) : (
                <>
                  {comments?.map((item, i) => (
                    <div className="news-item" key={i}>
                      <div className="img">
                        <Box
                          component={Link}
                          to={`/${item.category}/${item.postId}`}
                        >
                          <img src={item.image} alt={item.title} />
                        </Box>
                      </div>
                      <div className="content">
                        <Box
                          component={Link}
                          to={`/${item.category}/${item.postId}`}
                          sx={{ color: switchTheme ? "#fff" : "#333" }}
                        >
                          <h3 className="heading">{item.title}</h3>
                        </Box>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </Box>
        </Box>
      </div>

      <UserModal
        open={openEdit}
        setOpen={setOpenEdit}
        addTitle={`Thay ?????i th??ng tin ${
          userByEmail && userByEmail.firstName + " " + userByEmail.lastName
        }`}
      >
        <UpdateUser data={userByEmail} setOpenEdit={setOpenEdit} />
      </UserModal>
    </div>
  );
};

export default ProFile;
