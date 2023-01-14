import { Button } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/backend/Layout";
interface PostProps {}

const Post: React.FunctionComponent<PostProps> = () => {
  return (
    <Layout>
      <Button variant="contained" component={Link} to="/admin/post/add-new">
        Add New Post
      </Button>
      asdadslkbnfsdakjgd
    </Layout>
  );
};

export default Post;
