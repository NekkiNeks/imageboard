import React, { useEffect } from "react";
import { SERVER_URL } from "../../appconfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

//styles
import styles from "../../styles/IndexPage.module.css";

//types
import { RootState } from "../../store";
type iProps = {};

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  setPosts,
  setLoading,
  setError,
  setComments,
} from "../../store/postsSlice";
import { setDefault, setShow } from "../../store/modalSlice";

//import components
import Thread from "../../components/Thread";
import Modal from "../../components/Modal";
import GlobalContainer from "../../components/styled/GlobalContainer";

export default function Posts({}: iProps) {
  const dispatch = useDispatch();
  const posts = useSelector((store: RootState) => store.posts);
  const modal = useSelector((store: RootState) => store.modal);

  function handleAnswer() {
    dispatch(setShow({ show: true }));
  }

  async function getData() {
    try {
      dispatch(setLoading({ loading: true }));
      dispatch(setComments([]));
      dispatch(setError({ error: false, errorMessage: null }));
      const res = await fetch(`${SERVER_URL}/posts`);
      const data = await res.json();
      dispatch(setPosts(data.data));
      dispatch(setLoading({ loading: false }));
      dispatch(setDefault());
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError({ error: true, errorMessage: err.message }));
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

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
  } else {
    return (
      <div className={styles.container}>
        <GlobalContainer>
          {modal.show && <Modal />}
          <div className={styles.headerContainer}>
            <h1 className={styles.header}>This is the last posts</h1>
          </div>
          <button className={styles.button} onClick={handleAnswer}>
            Create Thread
          </button>
          {posts.posts &&
            posts.posts.map((post) => {
              return <Thread {...post} key={post.id} />;
            })}
        </GlobalContainer>
      </div>
    );
  }
}
