import React from "react";

//styles
import styles from "../styles/Answer.module.css";

//redux
import { removeId } from "../store/modalSlice";
import { useDispatch } from "react-redux";

//types
type iProps = {
  id: number;
  modal: boolean;
};

//import components

export default function Answer({ id, modal }: iProps) {
  const dispatch = useDispatch();
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
      <span onClick={() => clickHandle(id.toString())}> {id} </span>
      {modal && (
        <button onClick={() => dispatch(removeId({ id: id }))}>delete</button>
      )}
    </div>
  );
}
