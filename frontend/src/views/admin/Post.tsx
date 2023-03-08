import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/backend/Layout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  ClearError,
  ClearSuccess,
  DeleteAdminPost,
  getAdminPost,
} from "../../redux/reducer/posts.slice";
import { useSelector } from "react-redux";
import { idolTokuDa } from "../../utils/baseAvartar";
import * as moment from "moment";
import DialogConFirm from "../../components/backend/DialogConfirm";
import { toast } from "react-toastify";
interface PostProps {}

const Post: React.FunctionComponent<PostProps> = () => {
  const dispatch = useAppDispatch();
  const { userByEmail } = useSelector((state: RootState) => state.users);
  const { posts, success, error } = useSelector(
    (state: RootState) => state.posts
  );
  const [postId, setPostId] = React.useState("");
  const [openCfm, setOpenCfm] = React.useState(false);
  React.useEffect(() => {
    dispatch(getAdminPost());
    if (error) {
      toast.error(error.message);
      dispatch(ClearError());
    }
    if (success?.success) {
      toast.success(success.message);
      dispatch(ClearSuccess());
      setOpenCfm(false);
    }
    if (success?.warning) {
      toast.warning(success.message);
      dispatch(ClearSuccess());
      setOpenCfm(false);
    }
  }, [dispatch, success, error]);
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
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            {params.value ? (
              <img
                src={params.value}
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                alt={params.value}
              />
            ) : (
              <img
                src={idolTokuDa}
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                alt={idolTokuDa}
              />
            )}
          </>
        );
      },
    },

    {
      field: "category",
      headerName: "Category",
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
      field: "userCreated",
      headerName: "userCreated",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            <span style={{ textTransform: "capitalize" }}>{params.value}</span>
          </>
        );
      },
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
            {userByEmail?.role === "admin" || userByEmail?.role === "content" ? (
              <Box>
                <Button component={Link} to={`/admin/post/${params.id}`}>
                  <EditIcon />
                </Button>
                <Button onClick={() => handleOpenCfm(params.id)}>
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

  const handleOpenCfm = (id: any): void => {
    setOpenCfm(true);
    setPostId(id);
  };
  const handleCloseCfm = (): void => {
    setOpenCfm(false);
  };

  const handleDeleteUser = (): void => {
    dispatch(DeleteAdminPost(postId));
  };

  const rows: any = [];
  posts &&
    posts.forEach((item: any) => {
      rows.push({
        id: item?.id,
        title: item?.title,
        image: item?.image,
        category: item?.category,
        status: item?.status,
        userCreated: item?.role,
        createdAt: moment(item.createdAt).format("DD-MM-YYYY"),
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
      <DialogConFirm
        open={openCfm}
        onClose={handleCloseCfm}
        id={postId}
        onDelete={handleDeleteUser}
      />
    </Layout>
  );
};

export default Post;
