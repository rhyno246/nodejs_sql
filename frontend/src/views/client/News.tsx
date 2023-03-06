import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "../../components/client/Layout";
import { getNewsClient } from "../../redux/reducer/posts.slice";
import { RootState, useAppDispatch } from "../../redux/store";
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
        "loading........."
      ) : (
        <>
          {posts.length ? (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Card sx={{ padding: "10px", marginBottom: "15px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <CardMedia
                        sx={{ height: 350 }}
                        image="https://cafebiz.cafebizcdn.vn/2019/1/2/photo-1-15464020829431420592113.png"
                        title="tokuda"
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
                          Hot title News
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquid dolore placeat soluta ad voluptate
                          distinctio, quidem omnis sit temporibus delectus
                          reprehenderit in? Accusamus laudantium, numquam
                          expedita cum corporis culpa corrupti?
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                {posts?.map((item, i) => (
                  <Card key={i} sx={{ padding: "10px", marginBottom: "15px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <CardMedia
                          sx={{ height: 140 }}
                          image={item.image}
                          title={item.title}
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
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                ))}
              </Box>
            </>
          ) : (
            "Empty Post"
          )}
        </>
      )}
    </Layout>
  );
};

export default News;
