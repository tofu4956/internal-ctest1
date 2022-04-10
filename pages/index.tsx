import type { NextPage } from "next";
import { ChartContainer } from "../component/Chart/ChartContainer";
import { Header } from "../component/Header/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <ChartContainer />
    </>
  );
};

export default Home;
