import React from "react";

//styles
import styles from "../styles/Answer.module.css";

//types
type iProps = {
  id: string | number;
};

//import components

export default function Answer({ id }: iProps) {
  function clickHandle(id: string) {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  }
  return (
    <div className={styles.container}>
      <span onClick={() => clickHandle(id.toString())}>{id}</span>
    </div>
  );
}
