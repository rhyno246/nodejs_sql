import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/client/Layout";
import { GetPostClientById } from "../../redux/reducer/posts.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import * as moment from "moment";
import Loading from "../../components/Loading";

interface NewsDetailProps {}

const NewsDetail: React.FunctionComponent<NewsDetailProps> = () => {
  const {id} = useParams(); 
  const dispatch = useAppDispatch();
  const { loading, postById } = useSelector((state: RootState) => state.posts);
  React.useEffect(() => {
    dispatch(GetPostClientById(id));
  },[dispatch, id])

  return <Layout>
    { postById && postById.status === "show" ? <Box>
      { loading ? <Loading loading={loading}/> : 
        <Box>
          <Typography variant="h5" component="div" textTransform="capitalize">
            { postById?.title }
          </Typography>
          <div className="author" style={{margin : "10px 0", display : "flex" }}>
            <p style={{ textTransform : "capitalize" }}>{ postById?.firstName + " " + postById?.lastName }</p>
            <p style={{ marginLeft : "10px" }}>{moment(postById?.createdAt).format("DD-MM-YYYY")}</p>
          </div>
         
          <div className="content-detail" dangerouslySetInnerHTML={{__html : postById?.content}}></div>
        </Box> 
      }
    </Box> : <Typography variant="h5" component="div" textTransform="capitalize" textAlign="center">
            Không tìm thấy bài viết bạn cần tìm
          </Typography> }
    
  </Layout>;
};

export default NewsDetail;
