import { Box, Button } from "@mui/material";
import * as React from "react";
import Layout from "../../components/backend/Layout";
import HideImageIcon from "@mui/icons-material/HideImage";
import UserModal from "../../components/backend/UserModal";
import CreateStories from "../../components/backend/stories/CreateStories";
import { useAppDispatch } from "../../redux/store";
import { getAdminStories } from "../../redux/reducer/stories.slice";
interface StoriesProps {}

const Stories: React.FunctionComponent<StoriesProps> = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const openModalCreateStoriesPost = (): void => {
    setOpenCreate(true);
  };
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAdminStories());
  }, [dispatch]);

  return (
    <Layout>
      <Button variant="contained" onClick={openModalCreateStoriesPost}>
        Add New Stories Post
      </Button>
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

      <Box>ssasadsadsda</Box>

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
