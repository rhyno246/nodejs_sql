import * as React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/backend/Layout";
import {
  ClearDelete,
  DeleteAdminUser,
  getAllUsersAdmin,
  GetUserById,
} from "../../redux/reducer/users.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import UserModal from "../../components/backend/UserModal";
import CreateUser from "../../components/backend/user/CreateUser";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import EditUser from "../../components/backend/user/EditUser";
import DialogConFirm from "../../components/backend/DialogConfirm";
import { toast } from "react-toastify";
interface UsersProps {}

const Users: React.FunctionComponent<UsersProps> = () => {
  const { users, success, userById, deleteSuccess } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useAppDispatch();
  const [userId, setUserId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCfm, setOpenCfm] = React.useState(false);
  React.useEffect(() => {
    dispatch(getAllUsersAdmin());
    dispatch(GetUserById(userId));
    if (success) {
      dispatch(getAllUsersAdmin());
    }
    if (deleteSuccess) {
      toast.success(deleteSuccess);
      dispatch(ClearDelete());
      setOpenCfm(false);
    }
  }, [dispatch, success, userId, deleteSuccess]);

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
                <Button onClick={() => openModalEditUser(params.id)}>
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

  const openModalAddNewUser = (): void => {
    setOpen(true);
  };

  const openModalEditUser = (id: any): void => {
    setOpenEdit(true);
    setUserId(id);
  };

  const handleOpenCfm = (id: any): void => {
    setOpenCfm(true);
    setUserId(id);
  };
  const handleCloseCfm = (): void => {
    setOpenCfm(false);
  };

  const handleDeleteUser = (): void => {
    dispatch(DeleteAdminUser(userById));
  };
  const rows: any = [];
  users &&
    users.forEach((item: any) => {
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
  return (
    <Layout>
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
        <CreateUser setOpen={setOpen} />
      </UserModal>

      <UserModal
        open={openEdit}
        setOpen={setOpenEdit}
        addTitle={`Edit User ${userId}`}
      >
        <EditUser setOpen={setOpenEdit} />
      </UserModal>
      <DialogConFirm
        open={openCfm}
        onClose={handleCloseCfm}
        id={userId}
        onDelete={handleDeleteUser}
      />
    </Layout>
  );
};

export default Users;
