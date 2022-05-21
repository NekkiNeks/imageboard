import React, { useState, FormEvent, ChangeEvent, useRef } from "react";
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
      url: "http://localhost:4000/posts",
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
      url: "http://localhost:4000/comments",
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
          <p>there is error, message: {modal.errorMessage}.</p>
        </div>
      )}
      <form className={styles.form} action="POST" onSubmit={handleSubmit}>
        <p>answer to: </p>
        <div>
          {modal.data.answer_to.map((answer) => {
            return <Answer id={answer} key={answer} modal={true} />;
          })}
        </div>
        <p>thread id: {modal.data.thread_id}</p>
        <label htmlFor="title">Title:</label>
        <input
          disabled={modal.loading ? true : false}
          type="text"
          name="title"
          value={modal.data.title}
          onChange={handleChange}
        />
        <label htmlFor="Text">Text:</label>
        <textarea
          disabled={modal.loading ? true : false}
          name="content"
          rows={12}
          value={modal.data.content}
          onChange={handleChange}
        />

        <label htmlFor="file">file:</label>
        <input
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
        <div onClick={setFileToDefault}>delete image</div>
        <button type="submit" disabled={modal.loading ? true : false}>
          Send
        </button>
        <button onClick={handleClose}>Close</button>
      </form>
    </div>
  );
}
