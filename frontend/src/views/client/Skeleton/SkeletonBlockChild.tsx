import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
interface SkeletonBlockChildProps {}

const SkeletonBlockChild: React.FunctionComponent<
SkeletonBlockChildProps
> = () => {
  return (
    <>
        <Stack spacing={1} className="news-item">
            <Skeleton variant="rounded" width="100%" height={200} />
            <div className="content">
                <h3 className="heading"><Skeleton variant="text" sx={{ fontSize: '1rem' }} width="100%"/></h3>
            </div>
        </Stack>
        {
            [1,2,3].map((index , _) => (
                <p key={index}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="100%"/>
                </p>
            ))
        }
    </>
  );
};

export default SkeletonBlockChild;
