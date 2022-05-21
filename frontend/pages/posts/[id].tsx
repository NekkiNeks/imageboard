import React, { useEffect } from "react";
import { useRouter } from "next/router";

//styles
import styles from "../../styles/PostPage.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPost, setComments } from "../../store/postsSlice";
import { setDefault, setPostId, setShow } from "../../store/modalSlice";

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
    if (typeof id === "string" && id) {
      getPost(id);
      dispatch(setDefault());
    }
  }, [id]);

  if (currentPost) {
    return (
      <div className={styles.container}>
        <GlobalContainer>
          {modal.show && <Modal />}
          <header className={styles.postContainer}>
            <p>Posted: {new Date(currentPost.time).toLocaleString()}</p>
            <h1>{currentPost.title}</h1>
            <p>{currentPost.content}</p>
            <button
              className={styles.button}
              onClick={() => {
                dispatch(setShow({ show: true }));
                dispatch(setPostId({ id: currentPost.id }));
              }}
            >
              Answer
            </button>
          </header>
          {comments &&
            comments.map((item) => {
              return (
                <Comment {...item} key={item.id} thread_id={currentPost.id} />
              );
            })}
        </GlobalContainer>
      </div>
    );
  } else {
    return <div>there is no post</div>;
  }
}
