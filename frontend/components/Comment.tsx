import React from "react";
import styled from "styled-components";

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
  const dispatch = useDispatch();
  const modal = useSelector((store: RootState) => {
    return store.modal;
  });
  const posts = useSelector((store: RootState) => {
    return store.posts;
  });

  function handleAnswer() {
    dispatch(setPostId({ id: thread_id }));
    dispatch(addId({ id: id }));
    dispatch(setShow({ show: true }));
  }

  return (
    <article className={styles.container} id={id.toString()}>
      <div className={styles.infoContainer}>
        <p>id: {id}</p>
        <p>Posted: {time}</p>
        {answer_to.length > 0 && (
          <div className={styles.answersContainer}>
            <p>Answer to:</p>
            {answer_to.map((id) => {
              return <Answer id={id} key={id} />;
            })}
          </div>
        )}
      </div>
      <div className={styles.contentContainer}>
        {image && <img className={styles.image} src={image} alt="image" />}
        <div className={styles.content}>
          {title && <h3>{title}</h3>}
          <p>{content}</p>
        </div>
      </div>
      {answers.length > 0 && (
        <div className={styles.answersContainer}>
          <p>Answers:</p>
          {answers.map((id) => {
            return <Answer id={id} key={id} />;
          })}
        </div>
      )}
      <button className={styles.answerButton} onClick={handleAnswer}>
        Answer
      </button>
    </article>
  );
}
