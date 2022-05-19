import React from "react";
import styled from "styled-components";
import Link from "next/link";

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
  const dispath = useDispatch();

  function handleAnswer() {
    dispath(setPostId({ id: id }));
    dispath(setShow({ show: true }));
  }

  return (
    <Container>
      {image && <Image src={image} alt="image" />}
      <h1>{title}</h1>
      <p>{content}</p>
      <Time>{time}</Time>
      <Answers>comments: {comments}</Answers>
      <Link href={`posts/${id}`}>Enter to Thread</Link>
      <button onClick={() => handleAnswer()}>answer</button>
    </Container>
  );
}

//styles

const Container = styled.div`
  margin: 10px auto;
  padding: 1rem;
  width: 70%;
  background-color: #ffe;
  border: 1px solid black;
`;

const Image = styled.img`
  width: 30%;
`;

const Time = styled.p`
  font-size: 12px;
`;

const Answers = styled.p`
  font-size: 10px;
`;
