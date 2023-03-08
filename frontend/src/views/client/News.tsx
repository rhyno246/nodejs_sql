import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as moment from "moment";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Layout from "../../components/client/Layout";
import { getNewsClient } from "../../redux/reducer/posts.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { idolTokuDa } from "../../utils/baseAvartar";
import SkeletonNews from "./Skeleton/SkeletonNews";
interface NewsProps {}

const News: React.FunctionComponent<NewsProps> = () => {
  const location = useLocation();
  const catSlug = location.pathname.split("/")[1];
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getNewsClient(catSlug));
  }, [dispatch, catSlug]);

  const { loading, posts } = useSelector((state: RootState) => state.posts);

  return (
    <Layout>
      {loading ? (
        <SkeletonNews />
      ) : (
        <>
          {posts.length ? (
            <>
              <Box sx={{ flexGrow: 1 }}>
                {posts?.map((item, i) => {
                  if (i === 0) {
                    return (
                      <Box
                        sx={{ flexGrow: 1 }}
                        component={Link}
                        to={`/${catSlug}/${item.id}`}
                        key={i}
                      >
                        <Card sx={{ padding: "10px", marginBottom: "15px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <CardMedia
                                sx={{ height: 350 }}
                                image={item?.image ? item?.image : idolTokuDa}
                                title={item?.title}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                  textTransform="capitalize"
                                >
                                  {item?.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {item?.description}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ marginTop: "5px" }}
                                >
                                  {moment(item.createdAt).format("DD-MM-YYYY")}
                                </Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </Card>
                      </Box>
                    );
                  }
                  return (
                    <Box component={Link} to={`/${catSlug}/${item.id}`} key={i}>
                      <Card sx={{ padding: "10px", marginBottom: "15px" }}>
                        <Grid container spacing={2}>
                          <Grid item xs={3}>
                            <CardMedia
                              sx={{ height: 140 }}
                              image={item?.image ? item?.image : idolTokuDa}
                              title={item?.title}
                            />
                          </Grid>
                          <Grid item xs={9}>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                textTransform="capitalize"
                              >
                                {item?.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item?.description}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ marginTop: "5px" }}
                              >
                                {moment(item.createdAt).format("DD-MM-YYYY")}
                              </Typography>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>
                  );
                  
                })}
              </Box>
            </>
          ) : (
            "Chưa có bài viết nào"
          )}
        </>
      )}
    </Layout>
  );
};

export default News;
