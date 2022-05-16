import axios from "axios";
import React, { FormEvent, useState } from "react";
import styled from "styled-components";

//import components

export default function index() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(input, file);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("text", input);
    const res = await axios({
      method: "POST",
      url: "http://localhost:4000/comments",
      data: formData,
    });
    console.log(res);
  }

  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<null | File>(null);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <img src="" alt="" />
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="name"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
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
        <button type="submit">send</button>
      </Form>
    </div>
  );
}

//styles

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
