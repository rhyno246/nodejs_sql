import { Box } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/client/Layout";
import {
  getClientStories,
  getHomeBasketball,
  getHomeClientPost,
  getHomeSoccer,
} from "../../redux/reducer/home.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import SkeletonHomeHotNews from "./Skeleton/SkeletonHomeHotNews";
import * as moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SkeletonStoriesPost from "./Skeleton/SkeletonStoriesPost";
import BlockItem from "../../components/client/BlockItem";
import BlockChildItem from "../../components/client/BlockChildItem";
import BlockTextItem from "../../components/client/BlockTextItem";

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const data: any = {
    dataSoccer: "bong-da",
    dataBasketball: "bong-ro",
  };
  const { dataSoccer, dataBasketball } = data;
  React.useEffect(() => {
    dispatch(getHomeClientPost());
    dispatch(getClientStories());
    dispatch(getHomeSoccer(dataSoccer));
    dispatch(getHomeBasketball(dataBasketball));
  }, [dispatch, dataSoccer, dataBasketball]);
  const { loading, posts, stories, soccer, basketball } = useSelector(
    (state: RootState) => state.home
  );

  return (
    <Layout>
      <Box className="block story-post">
        {loading ? (
          <SkeletonStoriesPost />
        ) : (
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            className="mySwiper story-post"
          >
            {stories &&
              stories.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="items">
                    <img src={item.image} alt={item.image} />
                    <span className="time">
                      {moment(item.createdAt).fromNow(true)}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </Box>
      <Box className="block hot-news">
        {loading ? (
          <SkeletonHomeHotNews />
        ) : (
          <>
            {posts &&
              posts.map((item, i) => {
                if (i === 0) {
                  return <BlockItem item={item} i={i} />;
                }
                return <BlockChildItem item={item} i={i} />;
              })}
          </>
        )}
      </Box>
      <Box className="block-content">
        <Box className="block block-main">
          <h3 className="heading-block">
            <span>Bóng Đá</span>
          </h3>
          <Box className="block-body">
            {loading ? (
              "loading .... "
            ) : (
              <>
                {soccer &&
                  soccer.map((item, i) => {
                    if (i === 0) {
                      return <BlockChildItem item={item} i={i} />;
                    }
                    return <BlockTextItem item={item} i={i} />;
                  })}
              </>
            )}
          </Box>
        </Box>

        <Box className="block block-main">
          <h3 className="heading-block">
            <span>Bóng Rổ</span>
          </h3>
          <Box className="block-body">
            {loading ? (
              "loading .... "
            ) : (
              <>
                {basketball &&
                  basketball.map((item, i) => {
                    if (i === 0) {
                      return <BlockChildItem item={item} i={i} />;
                    }
                    return <BlockTextItem item={item} i={i} />;
                  })}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
