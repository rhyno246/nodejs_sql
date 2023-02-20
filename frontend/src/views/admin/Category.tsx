import * as React from "react";
import Layout from "../../components/backend/Layout";
import UserModal from "../../components/backend/UserModal";
import { Box, Button } from "@mui/material";
import CreateCategory from "../../components/backend/category/CreateCategory";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { ClearError, ClearSuccess } from "../../redux/reducer/category.slice";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as moment from "moment";
interface CategoryProps {}

const Category: React.FunctionComponent<CategoryProps> = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const { userByEmail } = useSelector((state: RootState) => state.users);
  const { success, error, category } = useSelector(
    (state: RootState) => state.category
  );
  const dispatch = useAppDispatch();
  const openModalEditUser = (): void => {
    setOpenCreate(true);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "CategoryId", minWidth: 100, flex: 0.8 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "slug",
      headerName: "Slug",
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
  category &&
    category.forEach((item: any) => {
      rows.push({
        id: item.id,
        title: item.title,
        image: item.image,
        category: item.category,
        status: item.status,
        userCreated: item.role,
        createdAt: moment(item.createdAt).format("DD-MM-YYYY"),
      });
    });

  React.useEffect(() => {
    if (success) {
      toast.success(success.message);
      setOpenCreate(false);
      dispatch(ClearSuccess());
    }
    if (error) {
      toast.error(error.message);
      dispatch(ClearError());
    }
  }, [success, error, dispatch]);

  return (
    <Layout>
      <Button variant="contained" onClick={openModalEditUser}>
        Add new category
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

      <UserModal
        open={openCreate}
        setOpen={setOpenCreate}
        addTitle="Create Category"
      >
        <CreateCategory />
      </UserModal>
    </Layout>
  );
};

export default Category;
