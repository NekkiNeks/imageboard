import React from "react";
import styled from "styled-components";
import Link from "next/link";

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
  return (
    <Container>
      {image && <Image src={image} alt="image" />}
      <h1>{title}</h1>
      <p>{content}</p>
      <Time>{time}</Time>
      <Answers>answers: {comments}</Answers>
      <Link href={`posts/${id}`}>Enter to Thread</Link>
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
