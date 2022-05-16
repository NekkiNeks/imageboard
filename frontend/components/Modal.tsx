import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import styled from "styled-components";

//redux
import {
  setData,
  setShow,
  setLoading,
  setError,
  setDefault,
} from "../store/modalSlice";
import { useSelector, useDispatch } from "react-redux";

//types
import { RootState } from "../store/index";
interface iProps {}

interface iRequest {
  thread_id: number;
  answer_to: number[];
  title: string;
  content: string;
  image: File;
}

//import components

export default function Modal({}: iProps) {
  const dispatch = useDispatch();
  const modal = useSelector((store: RootState) => {
    return store.modal;
  });

  const [file, setFile] = useState<null | File>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(modal.data);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("title", modal.data.title);
    formData.append("content", modal.data.content);
    if (modal.data.thread_id) {
      formData.append("thread_id", modal.data.thread_id.toString());
    }
    formData.append("answer_to", modal.data.answer_to.toString());
    const res = await axios({
      method: "POST",
      url: "http://localhost:4000/comments",
      data: formData,
    });
    console.log(res);
  }

  // async function handleSubmit2(e: FormEvent) {
  //   try {
  //     e.preventDefault();
  //     dispatch(setLoading({ loading: true }));
  //     const res = await axios({
  //       method: "POST",
  //       url: "http://localhost:4000/posts",
  //       data: {
  //         id: modal.id,
  //         title: input.title,
  //         text: input.text,
  //         image_url: input.image_url,
  //       },
  //     });
  //     if (res.status === 200) {
  //       dispatch(setDefault());
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       dispatch(setError({ error: true, errorMessage: error.message }));
  //     } else {
  //       console.warn("unhandeled error/throw in form submit!");
  //     }
  //   }
  // }

  function handleClose() {
    dispatch(setShow({ show: false }));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setData({ ...modal.data, [e.target.name]: e.target.value }));
  }

  // RENDER
  if (modal.loading) {
    return (
      <Container>
        <h1>LOADING...</h1>
      </Container>
    );
  } else {
    return (
      <Container>
        <Form action="POST" onSubmit={handleSubmit}>
          {modal.error && (
            <ErrorBlock>
              <p>
                there is error, message: {modal.errorMessage}. please try again.
              </p>
            </ErrorBlock>
          )}
          <p>answer to: {modal.data.answer_to}</p>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={modal.data.title}
            onChange={handleChange}
          />
          <label htmlFor="Text">Text:</label>
          <input
            type="text"
            name="content"
            value={modal.data.content}
            onChange={handleChange}
          />

          <label htmlFor="file">file:</label>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              const file: File = (target.files as FileList)[0];
              setFile(file);
            }}
          />
          <button type="submit">Send</button>
          <button onClick={handleClose}>Close</button>
        </Form>
      </Container>
    );
  }
}

//styles

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #00000075;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #fff;
`;

const ErrorBlock = styled.div`
  background-color: #ff7979;
`;
