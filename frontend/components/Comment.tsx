import React, { useState, useEffect } from "react";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setId, setShow } from "../store/modalSlice";

//types
import type { iPost } from "../types/types";
import { RootState } from "../store";
interface iProps extends iPost {}

//import components

export default function Comment({
  id,
  image_url,
  title,
  text,
  time,
  answers,
}: iProps) {
  const modal = useSelector((store: RootState) => {
    return store.modal;
  });
  const dispatch = useDispatch();

  const [newAnswers, setNewAnswers] = useState<null | iPost[]>(null);

  async function getAnswers(id: string | number) {
    const res = await fetch(`http://localhost:4000/answers/${id}`);
    const data = await res.json();
    setNewAnswers(data.data);
  }

  function handleAnswer() {
    dispatch(setId({ id: id }));
    dispatch(setShow({ show: true }));
  }

  useEffect(() => {
    if (answers) {
      getAnswers(id);
    }
  }, [id, answers]);

  return (
    <Container>
      {image_url && <Image src={image_url} alt="image" />}
      <h3>{title}</h3>
      <p>{text}</p>
      <p>{time}</p>
      {newAnswers &&
        newAnswers.map((item) => {
          return <Comment {...item} key={item.id} />;
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
