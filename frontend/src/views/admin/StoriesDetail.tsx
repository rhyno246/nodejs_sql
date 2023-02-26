import { Box, Button, IconButton, Typography } from "@mui/material";
import * as React from "react";
import Layout from "../../components/backend/Layout";
import HideImageIcon from "@mui/icons-material/HideImage";
import UserModal from "../../components/backend/UserModal";
import CreateDetailStories from "../../components/backend/stories/CreateDetailStories";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import { getAdminListImage } from "../../redux/reducer/stories.slice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import EditDetailStories from "../../components/backend/stories/EditDetailStories";
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
  const [openEdit, setOpenEdit] = React.useState(false);
  const [idListImage, setIdListImage] = React.useState(null);
  const { StoriesById, success } = useSelector(
    (state: RootState) => state.stories
  );
  const openModalCreateStoriesPost = (): void => {
    setOpenCreate(true);
  };
  const { storiesId } = useParams();
  const dispatch = useAppDispatch();

  const hanleEditListImage = (id: any): void => {
    setOpenEdit(true);
    setIdListImage(id);
  };

  React.useEffect(() => {
    dispatch(getAdminListImage(storiesId));
    if (success) {
      dispatch(getAdminListImage(storiesId));
    }
  }, [dispatch, storiesId, success]);

  return (
    <Layout>
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
                  <IconButton size="small">
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
        <EditDetailStories setOpen={setOpenEdit} idListImage={idListImage} />
      </UserModal>

      <UserModal
        open={openCreate}
        setOpen={setOpenCreate}
        addTitle="Create List Image"
      >
        <CreateDetailStories setOpen={setOpenCreate} storiesId={storiesId} />
      </UserModal>
    </Layout>
  );
};

export default StoriesDetail;
