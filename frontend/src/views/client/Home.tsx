import { Box } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../components/client/Layout";
import { getClientStories, getHomeClientPost } from "../../redux/reducer/home.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import SkeletonHomeHotNews from "./Skeleton/SkeletonHomeHotNews";
import * as moment from "moment";
interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getHomeClientPost())
    dispatch(getClientStories())
  }, [dispatch])
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  const { loading, posts , stories} = useSelector((state: RootState) => state.home);

  return <Layout>
    <Box className="block story-post">
        { loading ? "loading....." : 
          <ul>
            { stories && stories.map((item,i) => (
              <li key={i}>
                <img src={item.image} alt={item.image} />
                <span>{moment(item.createdAt).fromNow(true)}</span>
              </li>
            )) }
          </ul> }
    </Box>
    <Box className="block hot-news">
      { loading ? <SkeletonHomeHotNews /> : (
        <>
          { posts && posts.map((item, i) => {
            if(i === 0){
              return ( 
                <div className="hot-news-item" key={i}>
                  <div className="img">
                    <Box component={Link} to={`/${item.category}/${item.id}`}>
                      <img src={item.image} alt={item.title} />
                    </Box>
                  </div>
                  <div className="content">
                      <Box component={Link} to={`/${item.category}/${item.id}`} sx={{ color : switchTheme ? "#fff" : "#333" }}>
                        <h3 className="heading">{ item.title }</h3>
                      </Box>
                      <div className="description">{ item.description }</div>
                  </div>
                </div>
              )
            }
            return (
              <div className="news-item" key={i}>
                <div className="img">
                   <Box component={Link} to={`/${item.category}/${item.id}`}>
                      <img src={item.image} alt={item.title} />
                    </Box>
                  </div>
                  <div className="content">
                      <Box component={Link} to={`/${item.category}/${item.id}`} sx={{ color : switchTheme ? "#fff" : "#333" }}>
                        <h3 className="heading">{ item.title }</h3>
                      </Box>
                  </div>
              </div>
            )
          }) }
        </>
      ) }
      
    </Box>
  </Layout>;
};

export default Home;
