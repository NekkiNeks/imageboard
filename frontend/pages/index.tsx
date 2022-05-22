import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";

//import components
import GlobalContainer from "../components/styled/GlobalContainer";

const Home: NextPage = () => {
  return (
    <GlobalContainer>
      <div className={styles.container}>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name={"description"}
            content="This is my little imageboard, that i was created to show my abillities, feel free to use it"
          />
          <title>R-chan</title>
        </Head>
        <header>
          <h1>Welcome to my little imageboard</h1>
          <a href="github.com/nekkineks/imageboard" className={styles.gitLink}>
            git
          </a>
        </header>
        <main>
          <h2>
            This is an anonymous imageboard, like <a href="4chan.org">4chan</a>{" "}
            but it works on React, so its{" "}
            <a href="https://en.wikipedia.org/wiki/Single-page_application">
              SPA
            </a>
            .
          </h2>
          <Link href={"/posts"}>Go to Posts</Link>
          <h3>Why you created this?</h3>
          <p>Just for fun, and also for education purposes. </p>
          <h3>what technologies does this app use?</h3>
          <p>oh, okay, listen then:</p>
          <ul>
            <li>PostgeSQL</li>
            <li>CSS</li>
            <ul>
              <li>styled-components</li>
              <li>css-modules</li>
            </ul>
            <li>JS</li>
            <ul>
              <li>React</li>
              <li>Next</li>
              <li>Redux toolkit</li>
              <li>typescript</li>
              <li>Node JS</li>
              <li>Express</li>
            </ul>
          </ul>
          <h3>Dont you think its overengineered little bit?</h3>
          <p>
            Maybe! Usually imageboards do use less (Jquery and php i guess). But
            this is just a project to showcase my abilities, so I don't give a
            shit.
          </p>
          <h3>
            Okay, but can i use it? Create thread or comment other threads?
          </h3>
          <p>if you are here, then it works, so yes!</p>
        </main>
      </div>
    </GlobalContainer>
  );
};

export default Home;
