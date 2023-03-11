import * as React from "react";
import Layout from "../../components/backend/Layout";
import UserModal from "../../components/backend/UserModal";
import { Box, Button } from "@mui/material";
import CreateCategory from "../../components/backend/category/CreateCategory";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import {
  ClearError,
  ClearSuccess,
  DeleteAdminCategory,
  getAdminCategory,
  GetCategoryById,
} from "../../redux/reducer/category.slice";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as moment from "moment";
import DialogConFirm from "../../components/backend/DialogConfirm";
import EditCategory from "../../components/backend/category/EditCategory";
interface CategoryProps {}

const Category: React.FunctionComponent<CategoryProps> = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const { userByEmail } = useSelector((state: RootState) => state.users);
  const [catId, setCatId] = React.useState("");
  const [openCfm, setOpenCfm] = React.useState(false);

  const { success, error, category, loading } = useSelector(
    (state: RootState) => state.category
  );
  const dispatch = useAppDispatch();
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
                <Button onClick={() => openModalEditCategory(params.id)}>
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

  const openModalEditUser = (): void => {
    setOpenCreate(true);
  };

  const handleOpenCfm = (id: any): void => {
    setOpenCfm(true);
    setCatId(id);
  };

  const handleCloseCfm = (): void => {
    setOpenCfm(false);
  };

  const openModalEditCategory = (id: any): void => {
    setOpenEdit(true);
    setCatId(id);
  };

  const handleDeleteCategory = (): void => {
    dispatch(DeleteAdminCategory(catId));
  };

  const rows: any = [];
  category &&
    category.forEach((item: any) => {
      rows.push({
        id: item.id,
        name: item.name,
        slug: item.slug,
        userCreated: item.role,
        createdAt: moment(item.createdAt).format("DD-MM-YYYY"),
      });
    });

  React.useEffect(() => {
    dispatch(GetCategoryById(catId));
    dispatch(getAdminCategory());
    if (success) {
      setOpenCfm(false);
      setOpenCreate(false);
    }
    if (success?.success) {
      toast.success(success.message);
      dispatch(ClearSuccess());
    }
    if (success?.warning) {
      toast.warning(success.message);
      dispatch(ClearSuccess());
    }
    if (error) {
      toast.error(error.message);
      dispatch(ClearError());
    }
  }, [success, error, dispatch, catId]);

  return (
    <Layout>
      <Button variant="contained" onClick={openModalEditUser}>
        Add new category
      </Button>

      <DataGrid
        loading={loading}
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

      <UserModal
        open={openEdit}
        setOpen={setOpenEdit}
        addTitle={`Edit Category ${catId}`}
      >
        <EditCategory setOpen={setOpenEdit} />
      </UserModal>

      <DialogConFirm
        open={openCfm}
        onClose={handleCloseCfm}
        id={catId}
        onDelete={handleDeleteCategory}
      />
    </Layout>
  );
};

export default Category;
