import * as React from "react";
import { useEffect } from 'react'
import Layout from "../../components/client/Layout";
import { getAllUsers } from "../../redux/reducer/users.slice";
import { useAppDispatch } from "../../redux/store";
interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const dispatch = useAppDispatch();
  useEffect (() => {
    dispatch(getAllUsers());
  },[dispatch])
  

  return <Layout>Home</Layout>;
};

export default Home;
