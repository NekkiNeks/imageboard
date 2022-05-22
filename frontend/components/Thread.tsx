import React from "react";
import { SERVER_URL } from "../appconfig";
import Link from "next/link";

//styles
import styles from "../styles/Thread.module.css";
//redux
import { setShow, setPostId } from "../store/modalSlice";
import { useDispatch } from "react-redux";

//types
import { iPost } from "../types/types";
interface iProps extends iPost {}

//import components

export default function Thread({
  image,
  title,
  content,
  time,
  id,
  comments,
}: iProps) {
  const dispatch = useDispatch();

  function handleAnswer() {
    dispatch(setPostId({ id: id }));
    dispatch(setShow({ show: true }));
  }

  return (
    <article className={styles.container}>
      <div className={styles.infoContainer}>
        <p className={styles.time}>Posted: {new Date(time).toLocaleString()}</p>
        <p className={styles.answers}>Comments: {comments}</p>
      </div>
      <div className={styles.contentContainer}>
        {image && (
          <img
            className={styles.image}
            src={`${SERVER_URL}/${image}`}
            alt="image"
          />
        )}
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Link href={`posts/${id}`}>
          <a className={styles.button}>Enter to Thread</a>
        </Link>
        <div className={styles.button} onClick={() => handleAnswer()}>
          answer
        </div>
      </div>
    </article>
  );
}
