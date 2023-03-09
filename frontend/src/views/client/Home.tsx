import { Box } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/client/Layout";
import {
  getClientStories,
  getHomeBasketball,
  getHomeBehind,
  getHomeClientPost,
  getHomeGuess,
  getHomeNewsGame,
  getHomeSoccer,
  getHomeTransfer,
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
import SkeletonBlockChild from "./Skeleton/SkeletonBlockChild";
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import StoriesComponent from "../../components/StoriesComponent";
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
interface HomeProps {}


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home: React.FunctionComponent<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const data: any = {
    dataSoccer: "bong-da",
    dataBasketball: "bong-ro",
    dataGuess : "nhan-dinh",
    dataBehind : "hau-truong",
    dataTransfer : "chuyen-nhuong",
    dataNewsGame : "tin-game"
  };
  const { dataSoccer, dataBasketball, dataGuess , dataBehind , dataTransfer, dataNewsGame } = data;
  React.useEffect(() => {
    dispatch(getHomeClientPost());
    dispatch(getClientStories());
    dispatch(getHomeSoccer(dataSoccer));
    dispatch(getHomeBasketball(dataBasketball));
    dispatch(getHomeGuess(dataGuess));
    dispatch(getHomeBehind(dataBehind));
    dispatch(getHomeTransfer(dataTransfer))
    dispatch(getHomeNewsGame(dataNewsGame))
  }, [dispatch, dataSoccer, dataBasketball , dataGuess , dataBehind , dataTransfer , dataNewsGame]);
  const { loading, posts, story, soccer, basketball , guess , behind , transfer ,newsgame } = useSelector(
    (state: RootState) => state.home
  );

  const [open, setOpen] = React.useState(false);
  const [storiesId , setStoriesId] = React.useState("")

  const handleClickOpen = (id : any) : void => {
    setOpen(true);
    setStoriesId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <Layout>
      {
        story && <Box className="block story-post">
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
            {
              story?.map((item, i) => (
                <SwiperSlide key={i} onClick={() =>handleClickOpen(item.id)}>
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
      }
      
      {
        posts.length > 0 && <Box className="block hot-news">
          {loading ? (
            <SkeletonHomeHotNews />
          ) : (
            <>
              {
                posts?.map((item, i) => {
                  if (i === 0) {
                    return <Box key={i} className="hot-news-item"><BlockItem item={item} i={i} /></Box>;
                  }
                  return <Box className="news-item" key={i}><BlockChildItem item={item} i={i} /></Box>;
                })}
            </>
          )}
        </Box>
      }
      <Box className="block-content">
        {
          soccer.length > 0 && <Box className="block block-main">
            <h3 className="heading-block">
              <span>Bóng Đá</span>
            </h3>
            <Box className="block-body">
              {loading ? (
                <SkeletonBlockChild />
              ) : (
                <>
                  {
                    soccer?.map((item, i) => {
                      if (i === 0) {
                        return <Box className="news-item" key={i}><BlockChildItem item={item} i={i} /></Box>;
                      }
                      return <Box key={i}><BlockTextItem item={item} i={i} /></Box>;
                    })}
                </>
              )}
            </Box>
          </Box>
        }
        
        {
          basketball.length > 0 && <Box className="block block-main">
          <h3 className="heading-block">
            <span>Bóng Rổ</span>
          </h3>
          <Box className="block-body">
            {loading ? (
              <SkeletonBlockChild />
            ) : (
              <>
                {
                  basketball?.map((item, i) => {
                    if (i === 0) {
                      return <Box className="news-item" key={i}><BlockChildItem item={item} i={i} /></Box>;
                    }
                    return <Box key={i}><BlockTextItem item={item} i={i} /></Box>;
                  })}
              </>
            )}
          </Box>
        </Box>
        }
        {
          guess.length > 0 && <Box className="block block-main">
          <h3 className="heading-block">
            <span>Nhận Định</span>
          </h3>
          <Box className="block-body">
            {loading ? (
              <SkeletonBlockChild />
            ) : (
              <>
                {
                  guess?.map((item, i) => {
                    if (i === 0) {
                      return <Box className="news-item" key={i}><BlockChildItem item={item} i={i} /></Box>;
                    }
                    return <Box key={i}><BlockTextItem item={item} i={i} /></Box>;
                  })}
              </>
            )}
          </Box>
        </Box>
        }

        {
          behind.length > 0 && <Box className="block block-main">
          <h3 className="heading-block">
            <span>Hậu Trường</span>
          </h3>
          <Box className="block-body">
            {loading ? (
              <SkeletonBlockChild />
            ) : (
              <>
                {
                  behind?.map((item, i) => {
                    if (i === 0) {
                      return <Box className="news-item" key={i}><BlockChildItem item={item} i={i} /></Box>;
                    }
                    return <Box key={i}><BlockTextItem item={item} i={i} /></Box>;
                  })}
              </>
            )}
          </Box>
        </Box>
        }


        {
          transfer.length > 0 && <Box className="block block-main">
          <h3 className="heading-block">
            <span>Chuyển Nhượng</span>
          </h3>
          <Box className="block-body">
            {loading ? (
              <SkeletonBlockChild />
            ) : (
              <>
                {
                  transfer?.map((item, i) => {
                    if (i === 0) {
                      return <Box className="news-item" key={i}><BlockChildItem item={item} i={i} /></Box>;
                    }
                    return <Box key={i}><BlockTextItem item={item} i={i} /></Box>;
                  })}
              </>
            )}
          </Box>
        </Box>
        }

        {
          newsgame.length > 0 && <Box className="block block-main">
          <h3 className="heading-block">
            <span>Tin Game</span>
          </h3>
          <Box className="block-body">
            {loading ? (
              <SkeletonBlockChild />
            ) : (
              <>
                {
                  newsgame?.map((item, i) => {
                    if (i === 0) {
                      return <Box className="news-item" key={i}><BlockChildItem item={item} i={i} /></Box>;
                    }
                    return <Box key={i}><BlockTextItem item={item} i={i} /></Box>;
                  })}
              </>
            )}
          </Box>
        </Box>
        }
        
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
         <CloseIcon onClick={handleClose} sx={{ cursor : "pointer", position : "fixed", top : "10px", right : "10px" }}/>
         <StoriesComponent id={storiesId}/>
      </Dialog>

      </Box>
    </Layout>
  );
};

export default Home;
