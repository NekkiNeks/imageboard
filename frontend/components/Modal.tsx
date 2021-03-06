import React, { useState, FormEvent, ChangeEvent, useRef } from "react";
import { SERVER_URL } from "../appconfig";
import axios from "axios";

//styles
import styles from "../styles/Modal.module.css";

//redux
import {
  setData,
  setShow,
  setLoading,
  setError,
  setDefault,
  removeId,
} from "../store/modalSlice";
import { addComment, addPost } from "../store/postsSlice";
import { useSelector, useDispatch } from "react-redux";

//types
import { iPost } from "../types/types";
import { RootState } from "../store/index";
import { iComment } from "../types/types";
interface iProps {}

interface iRequest {
  thread_id: number | null;
  answer_to: number[];
  title: string;
  content: string;
  image: File | null;
}

//import components
import Answer from "./Answer";

export default function Modal({}: iProps) {
  const dispatch = useDispatch();
  const modal = useSelector((store: RootState) => {
    return store.modal;
  });

  const [file, setFile] = useState<null | File>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault();
      dispatch(setLoading({ loading: true }));

      const request: iRequest = {
        thread_id: modal.data.thread_id,
        answer_to: modal.data.answer_to,
        title: modal.data.title,
        content: modal.data.content,
        image: file,
      };
      if (request.thread_id) {
        await sendComment(request);
      } else {
        await sendPost(request);
      }
      dispatch(setLoading({ loading: false }));
      dispatch(setDefault());
      dispatch(setShow({ show: true }));
      setFileToDefault();
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setLoading({ loading: false }));
        dispatch(setError({ error: true, errorMessage: error.message }));
      } else {
        console.warn("unhandeled error/throw in form submit!");
      }
    }
  }

  function createFormData({
    image,
    title,
    content,
    thread_id,
    answer_to,
  }: iRequest) {
    const formData = new FormData();
    formData.append("file", image as Blob);
    formData.append("title", title);
    formData.append("content", content);
    if (thread_id) {
      formData.append("thread_id", thread_id.toString());
    } else {
      formData.append("thread_id", "");
    }
    if (answer_to.length > 0) {
      formData.append("answer_to", answer_to.toString());
    } else {
      formData.append("answer_to", "");
    }
    return formData;
  }

  async function sendPost(request: iRequest) {
    const formdata = createFormData(request);
    const res = await axios({
      method: "POST",
      url: `${SERVER_URL}/posts`,
      data: formdata,
      validateStatus: () => true,
    });
    if (res.data.status === "failed") {
      throw new Error(res.data.message);
    }
    console.log(res.data);
    const dataFromResponce = res.data.data;
    const newPost: iPost = {
      id: dataFromResponce.id,
      time: dataFromResponce.time,
      title: request.title,
      content: request.content,
      image: dataFromResponce.image,
      comments: 0,
    };
    dispatch(addPost({ post: newPost }));
    return res;
  }

  async function sendComment(request: iRequest) {
    const formdata = createFormData(request);
    const res = await axios({
      method: "POST",
      url: `${SERVER_URL}/comments`,
      data: formdata,
      validateStatus: () => true,
    });
    console.log(res.data);

    if (res.data.status === "failed") {
      throw new Error(res.data.message);
    }
    const dataFromResponce = res.data.data;
    const newComment: iComment = {
      answer_to: request.answer_to,
      answers: [],
      title: request.title,
      time: dataFromResponce.time,
      image: dataFromResponce.image,
      content: request.content,
      id: dataFromResponce.id,
      thread_id: dataFromResponce.thread_id,
    };
    dispatch(addComment({ comment: newComment }));
    return res;
  }

  function setFileToDefault() {
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  function handleClose() {
    dispatch(setDefault());
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch(setData({ ...modal.data, [e.target.name]: e.target.value }));
  }

  return (
    <div className={styles.container}>
      {modal.error && (
        <div className={styles.errorContainer}>
          <p>Error: {modal.errorMessage}.</p>
        </div>
      )}
      <div className={styles.infoContainer}>
        {modal.data.thread_id && <p>Post id: {modal.data.thread_id}</p>}
        {modal.data.answer_to.length > 0 && (
          <div className={styles.answersContainer}>
            <p>Answer to: </p>
            <div>
              {modal.data.answer_to.map((answer) => {
                return <Answer id={answer} key={answer} modal={true} />;
              })}
            </div>
          </div>
        )}
      </div>
      <form className={styles.form} action="POST" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          className={`${styles.input} ${styles.titleInput}`}
          disabled={modal.loading ? true : false}
          type="text"
          name="title"
          value={modal.data.title}
          onChange={handleChange}
        />
        <label htmlFor="Text">Text:</label>
        <textarea
          className={`${styles.input} ${styles.textInput}`}
          disabled={modal.loading ? true : false}
          name="content"
          rows={12}
          value={modal.data.content}
          onChange={handleChange}
        />

        <label htmlFor="file">File:</label>
        <input
          className={`${styles.input} ${styles.fileInput}`}
          disabled={modal.loading ? true : false}
          type="file"
          name="file"
          ref={fileRef}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            const file: File = (target.files as FileList)[0];
            setFile(file);
          }}
        />
        <div className={styles.deleteButton} onClick={setFileToDefault}>
          Delete image
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.submitButton} ${styles.button}`}
            type="submit"
            disabled={modal.loading ? true : false}
          >
            Send
          </button>
          <button
            className={`${styles.cancelButton} ${styles.button}`}
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
