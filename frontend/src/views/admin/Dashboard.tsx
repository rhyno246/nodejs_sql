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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface DashBoardProps {}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart for User Register and total Post in month",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthCountPost = new Array(12).fill(0);
  const monthCountUsers = new Array(12).fill(0);
  posts.forEach(
    (item) => (monthCountPost[new Date(item.createdAt).getMonth()] += 1)
  );

  users.forEach(
    (item) => (monthCountUsers[new Date(item.createdAt).getMonth()] += 1)
  );

  const data: any = {
    labels,
    datasets: [
      {
        label: "Users Register In Month",
        data: monthCountUsers,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Post Created In Month",
        data: monthCountPost,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

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
        <Card sx={{ marginTop: "20px", padding: " 10px 20px" }}>
          <Line options={options} data={data} height={100} />
        </Card>
      </Box>
    </Layout>
  );
};

export default DashBoard;
