import * as React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/backend/Layout";
import Loading from "../../components/Loading";
import { getAllUsersAdmin } from "../../redux/reducer/users.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import UserModal from "../../components/backend/UserModal";
import CreateUser from "../../components/backend/user/CreateUser";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box } from "@mui/system";

interface UsersProps {}

const Users: React.FunctionComponent<UsersProps> = () => {
  const { users, loading } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getAllUsersAdmin());
  }, [dispatch]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
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
      field: "gender",
      headerName: "gender",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "phone",
      headerName: "phone",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params: GridValueGetterParams) => {
        return params.value;
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
  Object.values(users) &&
    Object.values(users).forEach((item: any) => {
      rows.push({
        id: item.id,
        email: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
        gender: item.gender,
        phone: item.phone,
        role: item.role,
      });
    });
  const [open, setOpen] = React.useState(false);
  const openModalAddNewUser = () => {
    setOpen(true);
  };

  return (
    <Layout>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <Button variant="contained" onClick={openModalAddNewUser}>
            Add new user
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
          <UserModal open={open} setOpen={setOpen} addTitle="Add New User">
            <CreateUser />
          </UserModal>
        </>
      )}
    </Layout>
  );
};

export default Users;
