import React from "react";
import styled from "styled-components";

//types
type iProps = {
  id: string | number;
};

//import components

export default function Answer({ id }: iProps) {
  return (
    <Container>
      <p>{id}</p>
    </Container>
  );
}

//styles
const Container = styled.div`
  display: inline-block;
  background-color: #ffd930;
  padding: 0.3rem;
  margin-left: 0.5rem;

  p {
    margin: 0;
  }
`;
