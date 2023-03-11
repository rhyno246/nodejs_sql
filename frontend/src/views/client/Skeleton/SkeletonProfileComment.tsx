import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
interface SkeletonProfileCommentProps {}

const SkeletonProfileComment: React.FunctionComponent<
  SkeletonProfileCommentProps
> = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((index, _) => (
        <Stack spacing={1} className="news-item" key={index}>
          <Skeleton variant="rounded" width="100%" height={200} />
          <div className="content">
            <h3 className="heading">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="100%" />
            </h3>
          </div>
          <p>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="100%" />
          </p>
        </Stack>
      ))}
    </>
  );
};

export default SkeletonProfileComment;
