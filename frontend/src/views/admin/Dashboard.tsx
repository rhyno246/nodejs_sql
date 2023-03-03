import { Box, Card } from "@mui/material";
import * as React from "react";
import Layout from "../../components/backend/Layout";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import MessageIcon from "@mui/icons-material/Message";
import Grid from "@mui/material/Grid";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { getAllUsersAdmin } from "../../redux/reducer/users.slice";
import { getAdminPost } from "../../redux/reducer/posts.slice";
import { getAdminStories } from "../../redux/reducer/stories.slice";
interface DashBoardProps {}

const DashBoard: React.FunctionComponent<DashBoardProps> = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllUsersAdmin());
    dispatch(getAdminPost());
    dispatch(getAdminStories());
  }, [dispatch]);

  const { users } = useSelector((state: RootState) => state.users);
  const { posts } = useSelector((state: RootState) => state.posts);
  const { stories } = useSelector((state: RootState) => state.stories);
  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={3} md={3}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              >
                <PeopleIcon />
                <span style={{ marginLeft: "15px" }}>
                  Total User : {users?.length}
                </span>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={2} sm={3} md={3}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              >
                <PostAddIcon />
                <span style={{ marginLeft: "15px" }}>
                  Total Post : {posts?.length}
                </span>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={2} sm={3} md={3}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              >
                <SlowMotionVideoIcon />
                <span style={{ marginLeft: "15px" }}>
                  Total Stories Post : {stories?.length}
                </span>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={2} sm={3} md={3}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              >
                <MessageIcon />
                <span style={{ marginLeft: "15px" }}>Total Comment : 20</span>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Card sx={{ marginTop: "20px", padding: " 10px 20px" }}>Chart</Card>
      </Box>
    </Layout>
  );
};

export default DashBoard;
