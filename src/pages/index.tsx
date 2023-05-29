import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Prefix Tree Autocomplete</title>
        <meta
          name="description"
          content="Prefix tree display for autocomplete"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Prefix Tree Autocomplete</h1>
      </main>
    </>
  );
}
