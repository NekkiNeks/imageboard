import React, { useEffect } from "react";
import { SERVER_URL } from "../../appconfig";
import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

//styles
import styles from "../../styles/PostPage.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPost,
  setComments,
  setLoading,
  setError,
} from "../../store/postsSlice";
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
  const posts = useSelector((store: RootState) => {
    return store.posts;
  });
  //^boilerplate

  async function getComments(id: string) {
    const res = await fetch(`${SERVER_URL}/comments/${id}`);
    const data = await res.json();
    dispatch(setComments(data.data));
  }

  async function getData(id: string) {
    try {
      dispatch(setLoading({ loading: true }));
      dispatch(setError({ error: false, errorMessage: null }));
      const res = await fetch(`${SERVER_URL}/posts/${id}`);
      const data = await res.json();
      const post: iPost = data.data[0];
      dispatch(setCurrentPost(post));
      getComments(id);
      dispatch(setLoading({ loading: false }));
      dispatch(setDefault());
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError({ error: true, errorMessage: err.message }));
      } else {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (typeof id === "string" && id) {
      getData(id);
    }
  }, [id]);

  if (posts.loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loaderContainer}>
          <AiOutlineLoading3Quarters
            size={"10%"}
            color={"#555"}
            className={styles.loader}
          />
        </div>
      </div>
    );
  } else if (posts.error) {
    return (
      <div className={styles.container}>
        <main>
          <div className={styles.errorContainer}>
            <h1 className={styles.errorHeader}>Sorry, but there is an error</h1>
            <p className={styles.errorMessage}>
              {posts.errorMessage ? posts.errorMessage : "unknown error"}
            </p>
          </div>
        </main>
      </div>
    );
  } else if (posts.currentPost) {
    const { time, title, content, id } = posts.currentPost;
    return (
      <div className={styles.container}>
        <GlobalContainer>
          {modal.show && <Modal />}
          <header className={styles.postContainer}>
            <p className={styles.postTime}>
              Posted: {new Date(time).toLocaleString()}
            </p>
            <h1 className={styles.postHeader}>{title}</h1>
            <p className={styles.postContent}>{content}</p>
            <button
              className={styles.button}
              onClick={() => {
                dispatch(setShow({ show: true }));
                dispatch(setPostId({ id: id }));
              }}
            >
              Answer
            </button>
          </header>
          {posts.comments &&
            posts.comments.map((item) => {
              return <Comment {...item} key={item.id} thread_id={id} />;
            })}
        </GlobalContainer>
      </div>
    );
  }
}
