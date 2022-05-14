import React from "react";
import styled from "styled-components";
import Link from "next/link";

//types
import { iPost } from "../types/types";

interface iProps extends iPost {}

//import components

export default function Thread({
  image_url,
  title,
  text,
  time,
  id,
  answers,
}: iProps) {
  return (
    <Container>
      {image_url && <Image src={image_url} alt="image" />}
      <h1>{title}</h1>
      <p>{text}</p>
      <Time>{time}</Time>
      <Answers>answers: {answers}</Answers>
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
