import { Button, TextareaAutosize, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/client/Layout";
import { GetPostClientById } from "../../redux/reducer/posts.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import * as moment from "moment";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import {
  ClearSuccess,
  createComment,
  getComment,
} from "../../redux/reducer/comment.slice";
import Avatar from "@mui/material/Avatar";
import { idolTokuDa } from "../../utils/baseAvartar";

interface NewsDetailProps {}

const NewsDetail: React.FunctionComponent<NewsDetailProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, postById } = useSelector((state: RootState) => state.posts);
  const { userByEmail } = useSelector((state: RootState) => state.users);
  const { success, comments } = useSelector(
    (state: RootState) => state.comment
  );
  const [comment, setComment] = React.useState("");
  React.useEffect(() => {
    if (success) {
      dispatch(ClearSuccess());
      setComment("");
    }
    dispatch(GetPostClientById(id));
    dispatch(getComment(id));
  }, [dispatch, id, success]);

  const handleCreateCategory = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    if (!userByEmail) {
      toast.warn("Bạn chưa đăng nhập . Vui lòng đăng nhập tiếp tục bình luận");
    }
    const newData = {
      comment: comment,
      userId: userByEmail?.id,
      postId: id,
    };
    dispatch(createComment(newData));
  };

  return (
    <Layout>
      {postById && postById.status === "show" ? (
        <Box>
          {loading ? (
            <Loading loading={loading} />
          ) : (
            <Box>
              <Typography
                variant="h5"
                component="div"
                textTransform="capitalize"
              >
                {postById?.title}
              </Typography>
              <div
                className="author"
                style={{ margin: "10px 0", display: "flex" }}
              >
                <p style={{ textTransform: "capitalize" }}>
                  {postById?.firstName + " " + postById?.lastName}
                </p>
                <p style={{ marginLeft: "10px" }}>
                  {moment(postById?.createdAt).format("DD-MM-YYYY")}
                </p>
              </div>

              <div
                className="content-detail"
                dangerouslySetInnerHTML={{ __html: postById?.content }}
              ></div>
            </Box>
          )}
        </Box>
      ) : (
        <Typography
          variant="h5"
          component="div"
          textTransform="capitalize"
          textAlign="center"
        >
          Không tìm thấy bài viết bạn cần tìm
        </Typography>
      )}
      <Box sx={{ marginBottom: "50px" }}>
        <Box
          sx={{ marginBottom: "20px" }}
          component="form"
          onSubmit={handleCreateCategory}
        >
          <Typography
            variant="h5"
            component="div"
            textTransform="capitalize"
            textAlign="left"
          >
            Ý kiến của bạn
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            style={{ width: "100%", marginTop: "20px", padding: "8px" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Gửi
          </Button>
        </Box>

        {comments.length > 0 && (
          <Box>
            <Typography
              variant="h5"
              component="div"
              textTransform="capitalize"
              textAlign="left"
            >
              Tất cả bình luận
            </Typography>
            <>
              {comments?.map((item, i) => (
                <ul className="item-comment" key={i}>
                  <li>
                    <Avatar
                      alt={item.comment}
                      src={item.coverPic ? item.coverPic : idolTokuDa}
                    />
                  </li>
                  <li className="full-comment">
                    <span className="name">
                      {item.firstName + " " + item.lastName} :
                    </span>
                    {item.comment}
                    <p>{moment(item.createdAt).fromNow()}</p>
                  </li>
                </ul>
              ))}
            </>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default NewsDetail;
