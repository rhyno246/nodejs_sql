import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "swiper/css";
interface SkeletonStoriesPostProps {}

const SkeletonStoriesPost: React.FunctionComponent<
  SkeletonStoriesPostProps
> = () => {
  return (
    <Stack spacing={1}>
      <div style={{ display: "flex", gap: "20px" }}>
        {[1, 2, 3, 4, 5].map((index, _) => (
          <Skeleton variant="rounded" width="100%" height={270} key={index} />
        ))}
      </div>
    </Stack>
  );
};

export default SkeletonStoriesPost;
