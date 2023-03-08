import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
interface SkeletonNewsProps {}

const SkeletonNews: React.FunctionComponent<SkeletonNewsProps> = () => {
  return (
    <Stack spacing={1}>
      <Box sx={{ flexGrow: 1 }}>
        <Card sx={{ padding: "10px", marginBottom: "15px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia sx={{ height: 350 }}>
                <Skeleton variant="rounded" width="100%" height={350} />
              </CardMedia>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={200}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", marginTop: "10px" }}
                />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </CardContent>
            </Grid>
          </Grid>
        </Card>

        {[1, 2, 3].map((index, _) => (
          <Card sx={{ padding: "10px", marginBottom: "15px" }} key={index}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <CardMedia sx={{ height: 140 }}>
                  <Skeleton variant="rounded" width="100%" height={140} />
                </CardMedia>
              </Grid>
              <Grid item xs={9}>
                <CardContent>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    width={200}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginTop: "10px" }}
                  />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Box>
    </Stack>
  );
};

export default SkeletonNews;
