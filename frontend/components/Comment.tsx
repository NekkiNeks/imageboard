import React from "react";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setPostId, setShow, addId } from "../store/modalSlice";

//types
import type { iComment } from "../types/types";
import { RootState } from "../store";
interface iProps extends iComment {}

//import components

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
    <Container>
      {image && <Image src={image} alt="image" />}
      <p>id: {id}</p>
      <p>{time}</p>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>answer to:</p>
      {answer_to.map((id) => {
        return <p>{id}</p>;
      })}
      <p>answers:</p>
      {answers.map((id) => {
        return <p>{id}</p>;
      })}
      <button onClick={handleAnswer}>answer</button>
    </Container>
  );
}

//styles
const Container = styled.div`
  background-color: #eee;
  border: 1px solid black;
  margin: 10px;
  margin-left: 30px;
  padding: 10px;
`;

const Image = styled.img`
  width: 30%;
`;
