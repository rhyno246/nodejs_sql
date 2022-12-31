import * as React from "react";
import { useEffect } from "react";
import Layout from "../../components/client/Layout";
import { getAllUsers } from "../../redux/reducer/users.slice";
import { useAppDispatch } from "../../redux/store";
interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const hanleCreateUser = (e: React.FormEvent): void => {
    e.preventDefault();
  };

  return (
    <Layout>
      <form onSubmit={hanleCreateUser}>
        <input type="text" placeholder="firstname" name="firstname" />
        <input type="text" placeholder="lastname" name="lastname" />
        <input type="text" placeholder="gender" name="gender" />
        <input type="text" placeholder="email" name="email" />
        <input type="text" placeholder="password" name="password" />
        <input type="number" placeholder="phone" name="phone" />
        <button type="submit">submit</button>
      </form>
    </Layout>
  );
};

export default Home;
