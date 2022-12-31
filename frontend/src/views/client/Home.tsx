import * as React from "react";
import { useEffect } from "react";
import Layout from "../../components/client/Layout";
import { getAllUsers, registerUser } from "../../redux/reducer/users.slice";
import { useAppDispatch } from "../../redux/store";
interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const [dataCreateUser, setDataCreateUser] = React.useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
  });
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataCreateUser({
      ...dataCreateUser,
      [e.target.name]: e.target.value,
    });
  };

  const hanleCreateUser = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(registerUser(dataCreateUser));
  };

  return (
    <Layout>
      <form onSubmit={hanleCreateUser}>
        <input
          type="text"
          placeholder="first_name"
          name="first_name"
          onChange={handleChangeInputData}
        />
        <input
          type="text"
          placeholder="last_name"
          name="last_name"
          onChange={handleChangeInputData}
        />
        <input
          type="text"
          placeholder="gender"
          name="gender"
          onChange={handleChangeInputData}
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChangeInputData}
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          onChange={handleChangeInputData}
        />
        <input
          type="number"
          placeholder="phone"
          name="phone"
          onChange={handleChangeInputData}
        />
        <button type="submit">submit</button>
      </form>
    </Layout>
  );
};

export default Home;
