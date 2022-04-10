import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Chart } from '../component/Chart'
import { Checkbox } from '../component/Checkbox'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <header>
        <h1>Demo</h1>
      </header>
      <Checkbox />
      <Chart />
    </>
  )
}

export default Home
