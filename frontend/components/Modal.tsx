import React, { useState, FormEvent } from "react";
import axios from "axios";
import styled from "styled-components";

//redux
import { setModal } from "../store/postsSlice";
import { useSelector, useDispatch } from "react-redux";

//types
import { RootState } from "../store/index";
interface iProps {}
interface iInputs {
  title: string;
  text: string;
  image_url: string;
}

//import components

export default function Modal({}: iProps) {
  const dispatch = useDispatch();
  const { modal } = useSelector((store: RootState) => {
    return store.posts;
  });

  const [input, setInput] = useState<iInputs>({
    title: "",
    text: "",
    image_url: "",
  });

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault();
      dispatch(setModal({ ...modal, loading: true }));
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/posts",
        data: {
          id: modal.id,
          title: input.title,
          text: input.text,
          image_url: input.image_url,
        },
      });
      if (res.status === 200) {
        dispatch(
          setModal({
            ...modal,
            id: null,
            loading: false,
            show: false,
            error: false,
            errorMessage: null,
          })
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);

        dispatch(
          setModal({
            ...modal,
            loading: false,
            error: true,
            errorMessage: error.message,
          })
        );
      }
    }
  }

  function handleClose() {
    dispatch(
      setModal({
        ...modal,
        id: null,
        show: false,
        error: false,
        errorMessage: null,
      })
    );
  }

  function handleChange(e: FormEvent<HTMLInputElement>) {
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
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
          <p>answer to: {modal.id}</p>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
          />
          <label htmlFor="Text">Text:</label>
          <input
            type="text"
            name="text"
            value={input.text}
            onChange={handleChange}
          />
          <label htmlFor="Image">Image url:</label>
          <input
            type="text"
            name="image_url"
            value={input.image_url}
            onChange={handleChange}
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
