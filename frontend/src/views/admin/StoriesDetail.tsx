import { Box, Button, IconButton, Typography } from "@mui/material";
import * as React from "react";
import Layout from "../../components/backend/Layout";
import HideImageIcon from "@mui/icons-material/HideImage";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import UserModal from "../../components/backend/UserModal";
import CreateDetailStories from "../../components/backend/stories/CreateDetailStories";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  deleteAdminStories,
  getAdminListChildImage,
  getAdminListImage,
} from "../../redux/reducer/stories.slice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import EditDetailStories from "../../components/backend/stories/EditDetailStories";
import DialogConFirm from "../../components/backend/DialogConfirm";
interface StoriesDetailProps {}
const commonStyles = {
  bgcolor: "background.paper",
  boxShadow: 5,
  width: "15rem",
  height: "20rem",
  position: "relative",
};
const StoriesDetail: React.FunctionComponent<StoriesDetailProps> = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [listImageId, setListImageId] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [idListImage, setIdListImage] = React.useState(null);
  const [openCfm, setOpenCfm] = React.useState(false);
  const { StoriesById, success } = useSelector(
    (state: RootState) => state.stories
  );
  const openModalCreateStoriesPost = (): void => {
    setOpenCreate(true);
  };
  const { storiesId } = useParams();
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const hanleEditListImage = (id: any): void => {
    setOpenEdit(true);
    setIdListImage(id);
    dispatch(getAdminListChildImage(id));
  };

  const handleOpenCfm = (id: any): void => {
    setOpenCfm(true);
    setListImageId(id);
  };
  const handleCloseCfm = (): void => {
    setOpenCfm(false);
  };

  const handleDeleteListImage = (): void => {
    dispatch(deleteAdminStories(listImageId));
  };

  React.useEffect(() => {
    dispatch(getAdminListImage(storiesId));
    if (success) {
      dispatch(getAdminListImage(storiesId));
      setOpenCfm(false);
    }
  }, [dispatch, storiesId, success]);

  return (
    <Layout>
      <Button
        variant="outlined"
        startIcon={<KeyboardReturnIcon />}
        sx={{ marginRight: "5px" }}
        onClick={() => history(-1)}
      >
        Go back
      </Button>
      <Button variant="contained" onClick={openModalCreateStoriesPost}>
        Add List Image
      </Button>

      {StoriesById.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          {StoriesById?.map((item, i) => (
            <Box key={i}>
              <Box
                sx={{
                  ...commonStyles,
                  borderRadius: 1,
                }}
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <Box sx={{ position: "absolute", top: "5px", right: "0" }}>
                  <IconButton
                    size="small"
                    onClick={() => hanleEditListImage(item.id)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenCfm(item.id)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </Box>
              <Typography sx={{ marginTop: "10px", textAlign: "center" }}>
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          component="span"
          sx={{
            height: "300px",
            border: "1px dashed grey",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <HideImageIcon sx={{ fontSize: "50px" }} />
        </Box>
      )}

      <UserModal
        open={openEdit}
        setOpen={setOpenEdit}
        addTitle={`Edit List Image ${idListImage}`}
      >
        <EditDetailStories setOpen={setOpenEdit} />
      </UserModal>

      <UserModal
        open={openCreate}
        setOpen={setOpenCreate}
        addTitle="Create List Image"
      >
        <CreateDetailStories setOpen={setOpenCreate} storiesId={storiesId} />
      </UserModal>

      <DialogConFirm
        open={openCfm}
        onClose={handleCloseCfm}
        id={listImageId}
        onDelete={handleDeleteListImage}
      />
    </Layout>
  );
};

export default StoriesDetail;
