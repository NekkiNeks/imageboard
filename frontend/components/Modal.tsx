import React, { FormEvent } from "react";
import styled from "styled-components";

//types
interface iProps {}

//import components

export default function Modal({}: iProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(`data for post with id: is sended`);
  }

  return (
    <div>
      <form action="POST" onSubmit={handleSubmit}>
        <label htmlFor="Title">Title:</label>
        <input type="text" />
        <label htmlFor="Text">Text:</label>
        <input type="text" />
        <label htmlFor="Image">Image url:</label>
        <input type="text" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

//styles
