import React from "react";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { RiSunLine } from "react-icons/ri";
import styles from "../styles/Header.module.css";

//import components
import GlobalContainer from "./styled/GlobalContainer";

export default function Header() {
  return (
    <header className={styles.container}>
      <GlobalContainer>
        <div className={styles.contentContainer}>
          <div className={styles.logo}>_R-chan</div>
          <nav>
            <div></div>
            <ul className={styles.linksContainer}>
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/posts">
                  <a>Posts</a>
                </Link>
              </li>
              <li>
                <a href="https://github.com/nekkineks/imageboard">
                  <BsGithub />
                  {"  "}
                  Github
                </a>
              </li>
            </ul>
          </nav>
          <RiSunLine size={30} color="#111" />
        </div>
      </GlobalContainer>
    </header>
  );
}
