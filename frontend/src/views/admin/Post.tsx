import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/backend/Layout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
interface PostProps {}

const Post: React.FunctionComponent<PostProps> = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "postId", minWidth: 180, flex: 0.8 },

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
            {params.row.role === "content" || params.row.role === "user" ? (
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
