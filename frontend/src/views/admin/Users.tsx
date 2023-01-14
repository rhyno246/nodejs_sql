import * as React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/backend/Layout";
import Loading from "../../components/Loading";
import { getAllUsersAdmin } from "../../redux/reducer/users.slice";
import { RootState, useAppDispatch } from "../../redux/store";
// import { DataGrid } from "@mui/x-data-grid";
interface UsersProps {}

const Users: React.FunctionComponent<UsersProps> = () => {
  const { users, loading } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getAllUsersAdmin());
  }, [dispatch]);
  return <Layout>{loading ? <Loading loading={loading} /> : "ojdsa"}</Layout>;
};

export default Users;
