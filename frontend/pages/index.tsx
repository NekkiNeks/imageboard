import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";

//import components
import GlobalContainer from "../components/styled/GlobalContainer";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name={"description"}
          content="This is my little imageboard, that i was created to show my abillities, feel free to use it"
        />
        <title>R-chan</title>
      </Head>
      <Header />
      <GlobalContainer>
        <div className={styles.headerContainer}>
          <h1 className={styles.mainHeader}>Welcome to my little imageboard</h1>
        </div>
        <main>
          <h3 className={styles.mdHeader}>
            This is an anonymous imageboard, like{" "}
            <a href="https://4chan.org">4chan</a> but it works on React, so its{" "}
            <a href="https://en.wikipedia.org/wiki/Single-page_application">
              SPA
            </a>
            .
          </h3>
          <Link href={"/posts"}>
            <a className={styles.button}>Go to Posts</a>
          </Link>
          <article className={styles.answersContainer}>
            <div className={styles.answer}>
              <h2>Why did you created this?</h2>
              <p>Just for fun, and also for education purposes. </p>
            </div>
            <div className={styles.answer}>
              <h2>What technologies does this app use?</h2>
              <p>Oh, okay, listen then:</p>
              <ul>
                <li>PostgreSQL</li>
                <li>CSS</li>
                <li>styled-components</li>
                <li>css-modules</li>
                <li>JS</li>
                <li>React</li>
                <li>Next</li>
                <li>Redux toolkit</li>
                <li>typescript</li>
                <li>Node JS</li>
                <li>Express</li>
              </ul>
            </div>
            <div className={styles.answer}>
              <h2>Dont you think its overengineered little bit?</h2>
              <p>
                Maybe! Usually imageboards do use less (Jquery and php i guess).
                But this is just a project to showcase my abilities, so I don't
                give a shit.
              </p>
            </div>
            <div className={styles.answer}>
              <h2>Is it done?</h2>
              <p>
                I dont think so, i want to add some more features, because now i
                find it hard to use. Lets call this "early access".
              </p>
            </div>
            <div className={styles.answer}>
              <h2>Why R-chan?</h2>
              <p>Its simple. React & chan, you know. </p>
            </div>
            <div className={styles.answer}>
              <h2>
                Okay, but can i use it? Create thread or comment other threads?
              </h2>
              <p>if you are here, then it works, so yes!</p>
            </div>
          </article>
        </main>
      </GlobalContainer>
    </div>
  );
};

export default Home;
