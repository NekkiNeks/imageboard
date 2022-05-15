import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux";

//types
import type { iPost } from "../../types/types";
import { RootState } from "../../store";
type iProps = {};

//import components
import Comment from "../../components/Comment";
import Modal from "../../components/Modal";

export default function Post({}: iProps) {
  const router = useRouter();
  let { id } = router.query;
  const dispatch = useDispatch();
  const modal = useSelector((store: RootState) => {
    return store.modal;
  });
  //^boilerplate

  const [post, setPost] = useState<null | iPost>(null);
  const [answers, setAnswers] = useState<null | iPost[]>(null);

  async function getData(id: string) {
    const res = await fetch(`http://localhost:4000/posts/${id}`);
    const data = await res.json();
    setPost(data.data);
  }

  async function getAnswers(id: string) {
    const res = await fetch(`http://localhost:4000/answers/${id}`);
    const data = await res.json();
    setAnswers(data.data);
  }

  useEffect(() => {
    if (typeof id === "string") {
      getData(id);
      getAnswers(id);
    }
  }, [id]);

  if (post) {
    return (
      <Container>
        {modal.show && <Modal />}
        <h1>{post.title}</h1>
        <p>{post.text}</p>
        <p>{post.time}</p>
        {answers &&
          answers.map((item) => {
            return <Comment {...item} key={item.id} />;
          })}
      </Container>
    );
  } else {
    return <div>there is no post</div>;
  }
}

//styles
const Container = styled.div``;
