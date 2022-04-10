import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Chart } from "../component/Chart/Chart";
import { ChartContainer } from "../component/Chart/ChartContainer";
import { Checkbox } from "../component/Chart/Checkbox";
import { Header } from "../component/Header/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Header/>
      <ChartContainer />
    </>
  );
};

export default Home;
