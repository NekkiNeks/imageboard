import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Thread from "../../components/Thread";

//types
import type { iPost } from "../../types/types";

type iProps = {};

type iThread = {
  id: number;
  title: string;
  text: string;
  time: string;
};
//import components

export default function Posts({}: iProps) {
  const [threads, setThreads] = useState<iPost[] | null>(null);

  async function fetchData() {
    const res = await fetch(`http://localhost:4000/threads`);
    const data = await res.json();
    setThreads(data.data);
  }

  useEffect(() => {
    //simplify
    fetchData();
  }, []);

  return (
    <Container>
      <h1>Here will be a list of posts</h1>
      {threads &&
        threads.map((thread) => {
          return <Thread {...thread} key={thread.id} />;
        })}
    </Container>
  );
}

//styles
const Container = styled.div``;
