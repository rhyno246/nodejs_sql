import * as React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box } from "@mui/system";
import {
  getClientListImage,
  getClientStoriesDetail,
} from "../redux/reducer/home.slice";
interface StoriesComponentProps {
  id: any;
}

const StoriesComponent: React.FunctionComponent<StoriesComponentProps> = ({
  id,
}: StoriesComponentProps) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) {
      dispatch(getClientListImage(id));
      dispatch(getClientStoriesDetail(id));
    }
  }, [dispatch, id]);

  const { listChildImage, StoriesDetail } = useSelector(
    (state: RootState) => state.home
  );
  const progressCircle = React.useRef(null);
  const progressContent = React.useRef(null);
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <Box
      sx={{
        maxWidth: "500px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        margin: "0 auto",
        padding: "100px 0",
      }}
    >
      {listChildImage && (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          <SwiperSlide style={{ borderRadius: "5px", overflow: "hidden" }}>
            <img src={StoriesDetail?.image} alt={StoriesDetail?.image} />
          </SwiperSlide>

          {listChildImage?.map((item, i) => {
            return (
              <SwiperSlide
                style={{ borderRadius: "5px", overflow: "hidden" }}
                key={i}
              >
                <img src={item.image} alt={item.title} />
                <h3 className="stories-title">{item.title}</h3>
              </SwiperSlide>
            );
          })}

          <div
            className="autoplay-progress"
            slot="container-end"
            style={{ opacity: listChildImage.length >= 1 ? "1" : "0" }}
          >
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      )}
    </Box>
  );
};

export default StoriesComponent;
