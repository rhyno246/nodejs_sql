import { Box, Button } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { DeleteCommentAdmin } from "../../../redux/reducer/comment.slice";
interface CommentsProps {
  item: any;
}

const Comments: React.FunctionComponent<CommentsProps> = ({
  item,
}: CommentsProps) => {
  const { userByEmail } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();
  const columns: GridColDef[] = [
    { field: "id", headerName: "postId", minWidth: 100, flex: 0.8 },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "firstName",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "lastName",
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
            {userByEmail?.role === "admin" ||
            userByEmail?.role === "content" ? (
              <Box>
                <Button onClick={() => handleDeleteComment(params.id)}>
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
  item &&
    item.forEach((item: any) => {
      rows.push({
        id: item?.id,
        comment: item?.comment,
        firstName: item?.firstName,
        lastName: item?.lastName,
      });
    });

  const handleDeleteComment = (id: any): void => {
    dispatch(DeleteCommentAdmin(id));
  };

  return (
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
  );
};

export default Comments;
