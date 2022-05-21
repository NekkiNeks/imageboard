import React, { useEffect, useState } from "react";
import styled from "styled-components";

//styles
import styles from "../../styles/IndexPage.module.css";

//types
import { RootState } from "../../store";
type iProps = {};

//redux
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../store/postsSlice";
import { setDefault, setShow } from "../../store/modalSlice";

//import components
import Thread from "../../components/Thread";
import Modal from "../../components/Modal";
import GlobalContainer from "../../components/styled/GlobalContainer";

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
    dispatch(setDefault());
  }, []);

  return (
    <div className={styles.container}>
      <GlobalContainer>
        {modal.show && <Modal />}
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>This is the last posts</h1>
        </div>
        <button
          className={styles.button}
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
      </GlobalContainer>
    </div>
  );
}

//styles
const Container = styled.div``;
