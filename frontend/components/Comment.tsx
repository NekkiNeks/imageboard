import React from "react";
import { SERVER_URL } from "../appconfig";

//styles
import styles from "../styles/Comment.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setPostId, setShow, addId } from "../store/modalSlice";

//types
import type { iComment } from "../types/types";
import { RootState } from "../store";
interface iProps extends iComment {}

//import components
import Answer from "./Answer";

export default function Comment({
  id,
  time,
  title,
  content,
  image,
  answer_to,
  answers,
  thread_id,
}: iProps) {
  const timeString = new Date(time).toLocaleString();

  const dispatch = useDispatch();
  const modal = useSelector((store: RootState) => {
    return store.modal;
  });
  const posts = useSelector((store: RootState) => {
    return store.posts;
  });

  function handleAnswer() {
    dispatch(addId({ id: id }));
    if (modal.data.thread_id !== thread_id) {
      dispatch(setPostId({ id: thread_id }));
    }
    if (!modal.show) {
      dispatch(setShow({ show: true }));
    }
  }

  return (
    <article className={styles.container} id={id.toString()}>
      <div className={styles.topContainer}>
        <div className={styles.infoContainer}>
          <p>id: {id}</p>
          <p>Posted: {timeString}</p>
        </div>
        {answer_to.length > 0 && (
          <div className={styles.answersContainer}>
            <p>Answer to:</p>
            {answer_to.map((id) => {
              return <Answer id={id} modal={false} key={id} />;
            })}
          </div>
        )}
      </div>
      {/* content */}
      <div className={styles.contentContainer}>
        {image && (
          <img
            className={styles.image}
            src={`${SERVER_URL}/${image}`}
            alt="image"
          />
        )}
        <div className={styles.content}>
          {title && <h2>{title}</h2>}
          <p>{content}</p>
        </div>
      </div>
      {/* answers */}
      <div className={styles.bottomContainer}>
        {answers.length > 0 && (
          <div className={styles.answersContainer}>
            <p>Answers:</p>
            {answers.map((id) => {
              return <Answer id={id} modal={false} key={id} />;
            })}
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleAnswer}>
            Answer
          </button>
        </div>
      </div>
    </article>
  );
}
