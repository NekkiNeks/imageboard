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
          <Link href="/">
            <div className={styles.logo}>_R-chan</div>
          </Link>
          <a href="https://github.com/nekkineks/imageboard">
            <BsGithub />
            {"  "}
            Github
          </a>
        </div>
      </GlobalContainer>
    </header>
  );
}
