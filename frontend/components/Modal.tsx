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
  removeId,
} from "../store/modalSlice";
import { useSelector, useDispatch } from "react-redux";

//types
import { RootState } from "../store/index";
interface iProps {}

interface iRequest {
  thread_id: number | null;
  answer_to: number[];
  title: string;
  content: string;
  image: File | null;
}

//import components

export default function Modal({}: iProps) {
  const dispatch = useDispatch();
  const modal = useSelector((store: RootState) => {
    return store.modal;
  });

  const [file, setFile] = useState<null | File>(null);

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
      //create formData
      const formData = new FormData();
      formData.append("file", request.image as Blob);
      formData.append("title", request.title);
      formData.append("content", request.content);
      if (request.thread_id) {
        formData.append("thread_id", request.thread_id.toString());
      } else {
        formData.append("thread_id", "");
      }
      if (modal.data.answer_to.length > 0) {
        formData.append("answer_to", modal.data.answer_to.toString());
      } else {
        formData.append("answer_to", "");
      }
      // send request
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/comments",
        data: formData,
      });
      console.log(res);
      if (res.data.status === "failed") {
        throw new Error(res.data.message);
      }
      dispatch(setLoading({ loading: false }));
      dispatch(setDefault());
      dispatch(setShow({ show: true }));
      setFile(null);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setLoading({ loading: false }));
        dispatch(setError({ error: true, errorMessage: error.message }));
      } else {
        console.warn("unhandeled error/throw in form submit!");
      }
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

  // RENDER

  return (
    <Container>
      {modal.error && (
        <ErrorBlock>
          <p>there is error, message: {modal.errorMessage}.</p>
        </ErrorBlock>
      )}
      <Form action="POST" onSubmit={handleSubmit}>
        <p>answer to: </p>
        <div>
          {modal.data.answer_to.map((answer) => {
            return (
              <Answer key={answer}>
                id: {answer}{" "}
                <button onClick={() => dispatch(removeId({ id: answer }))}>
                  delete
                </button>
              </Answer>
            );
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
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            const file: File = (target.files as FileList)[0];
            setFile(file);
          }}
        />
        <button type="submit" disabled={modal.loading ? true : false}>
          Send
        </button>
        <button onClick={handleClose}>Close</button>
      </Form>
    </Container>
  );
}

//styles

const Container = styled.div`
  background-color: #fff;
  width: 400px;
  border: 1px solid black;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  padding: 1rem;
`;

const ErrorBlock = styled.div`
  background-color: #ff7979;

  p {
    margin: auto;
  }
`;

const Answers = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;
const Answer = styled.div`
  display: inline-block;
  background-color: #ffd930;
  padding: 0.3rem;
  margin-right: 5px;
  margin-top: 5px;
`;
