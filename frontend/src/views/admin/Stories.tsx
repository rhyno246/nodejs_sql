import { Box, Button, IconButton } from "@mui/material";
import * as React from "react";
import Layout from "../../components/backend/Layout";
import HideImageIcon from "@mui/icons-material/HideImage";
import UserModal from "../../components/backend/UserModal";
import CreateStories from "../../components/backend/stories/CreateStories";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  ClearSuccess,
  deleteStories,
  getAdminStories,
  getAdminStoriesDetail,
} from "../../redux/reducer/stories.slice";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import EditStories from "../../components/backend/stories/EditStories";
import DialogConFirm from "../../components/backend/DialogConfirm";
interface StoriesProps {}

const commonStyles = {
  bgcolor: "background.paper",
  boxShadow: 5,
  width: "15rem",
  height: "20rem",
  position: "relative",
};

const Stories: React.FunctionComponent<StoriesProps> = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openCfm, setOpenCfm] = React.useState(false);
  const [listImageId, setListImageId] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [idListImage, setIdListImage] = React.useState(null);
  const { stories, success } = useSelector((state: RootState) => state.stories);
  const openModalCreateStoriesPost = (): void => {
    setOpenCreate(true);
  };
  const dispatch = useAppDispatch();

  const handleEditStories = (id: any): void => {
    setIdListImage(id);
    setOpenEdit(true);
    dispatch(getAdminStoriesDetail(id));
  };

  const handleDeleteListImage = (): void => {
    dispatch(deleteStories(listImageId));
  };

  const handleOpenCfm = (id: any): void => {
    setOpenCfm(true);
    setListImageId(id);
  };
  const handleCloseCfm = (): void => {
    setOpenCfm(false);
  };

  React.useEffect(() => {
    dispatch(getAdminStories());
    if (success) {
      dispatch(getAdminStories());
      dispatch(ClearSuccess());
      setOpenCfm(false);
    }
  }, [dispatch, success]);

  return (
    <Layout>
      <Button variant="contained" onClick={openModalCreateStoriesPost}>
        Add New Stories Post
      </Button>
      {stories.length > 0 ? (
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
          {stories?.map((item, i) => (
            <Box
              sx={{
                position: "relative",
                width: "15rem",
                height: "20rem",
              }}
              key={i}
            >
              <Box
                component={Link}
                to={`/admin/stories/${item.id}`}
                sx={{
                  ...commonStyles,
                  borderRadius: 1,
                }}
                // style={{
                //   backgroundImage: `url(${item.image})`,
                //   backgroundPosition: "center",
                //   backgroundRepeat: "no-repeat",
                //   backgroundSize: "cover",
                //   cursor: "pointer",
                //   display: "block",
                // }}
              >
                <img src={item.image} alt={item.image}/>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "0",
                  zIndex: "9",
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => handleEditStories(item.id)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="small" onClick={() => handleOpenCfm(item.id)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Box>
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

      <DialogConFirm
        open={openCfm}
        onClose={handleCloseCfm}
        id={listImageId}
        onDelete={handleDeleteListImage}
      />

      <UserModal
        open={openEdit}
        setOpen={setOpenEdit}
        addTitle={`Edit Stoires Post ${idListImage}`}
      >
        <EditStories setOpen={setOpenEdit} idListImage={idListImage} />
      </UserModal>

      <UserModal
        open={openCreate}
        setOpen={setOpenCreate}
        addTitle="Create Stories Post"
      >
        <CreateStories setOpen={setOpenCreate} />
      </UserModal>
    </Layout>
  );
};

export default Stories;
