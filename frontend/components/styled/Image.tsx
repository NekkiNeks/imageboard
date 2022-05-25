import React from "react";
import styled from "styled-components";

type iProps = {
  src: string;
  alt: string;
};

//import components

export default function Image({ src, alt }: iProps) {
  return (
    <Container>
      <Img src={src} alt={alt} />
    </Container>
  );
}

//styles

const Container = styled.div`
  width: 20%;
  margin-right: 1rem;

  @media (max-width: 769px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const Img = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: contain;
  border-radius: var(--radii);

  @media (max-width: 769px) {
    object-fit: cover;
  }
`;
