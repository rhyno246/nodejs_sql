
import * as React from "react";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

interface SkeletonHomeHotNewsProps {}

const SkeletonHomeHotNews: React.FunctionComponent<SkeletonHomeHotNewsProps> = () => {
  return (
    <>
        <Stack spacing={1} className="hot-news-item">
            <Skeleton variant="rounded" width="100%" height={416} />
            <div className="content">
                <h3 className="heading"><Skeleton variant="text" sx={{ fontSize: '1rem' }} width="100%"/></h3>
                <div className="description"><Skeleton variant="text" sx={{ fontSize: '1rem' }} width="100%"/></div>
            </div>
        </Stack>
        {
            [1,2,3,4].map((index , _) => (
                <Stack spacing={1} className="news-item" key={index}>
                    <Skeleton variant="rounded" width="100%" height={200} />
                    <div className="content">
                        <h3 className="heading"><Skeleton variant="text" sx={{ fontSize: '1rem' }} width="100%"/></h3>
                    </div>
                </Stack>
            ))
        }
    </>
  );
};

export default SkeletonHomeHotNews;
