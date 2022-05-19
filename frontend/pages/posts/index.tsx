import React, { useEffect, useState } from "react";
import styled from "styled-components";

//types
import { RootState } from "../../store";
type iProps = {};

//redux
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../store/postsSlice";
import { setShow } from "../../store/modalSlice";

//import components
import Thread from "../../components/Thread";
import Modal from "../../components/Modal";

export default function Posts({}: iProps) {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(
    (store: RootState) => store.posts
  );
  const modal = useSelector((store: RootState) => store.modal);

  async function fetchData() {
    const res = await fetch(`http://localhost:4000/posts`);
    const data = await res.json();
    dispatch(setPosts(data.data));
  }

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <Container>
      {modal.show && <Modal />}
      <h1>Here will be a list of posts</h1>
      <button
        onClick={() => {
          dispatch(setShow({ show: true }));
        }}
      >
        create thread
      </button>
      {posts &&
        posts.map((post) => {
          return <Thread {...post} key={post.id} />;
        })}
    </Container>
  );
}

//styles
const Container = styled.div``;
