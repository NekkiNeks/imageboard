import React from "react";

//styles
import styles from "../styles/Answer.module.css";

//types
type iProps = {
  id: string | number;
};

//import components

export default function Answer({ id }: iProps) {
  const link = `#${id}`;
  return (
    <div className={styles.container}>
      <a href={link}>{id}</a>
    </div>
  );
}
