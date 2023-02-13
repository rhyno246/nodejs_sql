import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/backend/Layout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootState, useAppDispatch } from "../../redux/store";
import { getAdminPost } from "../../redux/reducer/posts.slice";
import { useSelector } from "react-redux";
interface PostProps {}

const Post: React.FunctionComponent<PostProps> = () => {
  const dispatch = useAppDispatch();
  const { userByEmail } = useSelector((state: RootState) => state.users);
  const { posts } = useSelector((state: RootState) => state.posts);
  console.log(userByEmail);
  React.useEffect(() => {
    dispatch(getAdminPost());
  }, [dispatch]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "postId", minWidth: 100, flex: 0.8 },

    {
      field: "title",
      headerName: "Title",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "image",
      headerName: "Image",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "category",
      headerName: "Category",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            {userByEmail.role === "admin" || userByEmail.role === "content" ? (
              <Box>
                <Button>
                  <EditIcon />
                </Button>
                <Button>
                  <DeleteIcon />
                </Button>
              </Box>
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];

  const rows: any = [];
  posts &&
    posts.forEach((item: any) => {
      rows.unshift({
        id: item.id,
        title: item.title,
        image: item.image,
        category: item.category,
        status: item.status,
        createdAt: item.createdAt,
      });
    });
  return (
    <Layout>
      <Button variant="contained" component={Link} to="/admin/post/add-new">
        Add New Post
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        autoHeight
        sx={{ marginTop: 3 }}
      />
    </Layout>
  );
};

export default Post;
