import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPost, setComments } from "../../store/postsSlice";
import { setPostId, setShow } from "../../store/modalSlice";

//types
import type { iPost } from "../../types/types";
import { RootState } from "../../store";
type iProps = {};

//import components
import Comment from "../../components/Comment";
import Modal from "../../components/Modal";
import GlobalContainer from "../../components/styled/GlobalContainer";

export default function Post({}: iProps) {
  const router = useRouter();
  let { id } = router.query;
  const dispatch = useDispatch();
  const modal = useSelector((store: RootState) => {
    return store.modal;
  });
  const { currentPost, comments } = useSelector((store: RootState) => {
    return store.posts;
  });
  //^boilerplate

  async function getComments(id: string) {
    const res = await fetch(`http://localhost:4000/comments/${id}`);
    const data = await res.json();
    dispatch(setComments(data.data));
  }

  async function getPost(id: string) {
    const res = await fetch(`http://localhost:4000/posts/${id}`);
    const data = await res.json();
    const post: iPost = data.data[0];
    dispatch(setCurrentPost(post));
    getComments(id);
  }

  useEffect(() => {
    if (typeof id === "string") {
      getPost(id);
    }
  }, [id]);

  if (currentPost) {
    return (
      <Container>
        <GlobalContainer>
          {modal.show && <Modal />}
          <h1>{currentPost.title}</h1>
          <p>{currentPost.content}</p>
          <p>{currentPost.time}</p>
          <button
            onClick={() => {
              dispatch(setShow({ show: true }));
              dispatch(setPostId({ id: currentPost.id }));
            }}
          >
            answer
          </button>
          {comments &&
            comments.map((item) => {
              return (
                <Comment {...item} key={item.id} thread_id={currentPost.id} />
              );
            })}
        </GlobalContainer>
      </Container>
    );
  } else {
    return <div>there is no post</div>;
  }
}

//styles
const Container = styled.div`
  padding: 1rem;
`;
