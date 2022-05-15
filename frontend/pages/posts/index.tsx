import React, { useEffect, useState } from "react";
import styled from "styled-components";

//types
import { RootState } from "../../store";
type iProps = {};

//redux
import { useSelector, useDispatch } from "react-redux";
import { updatePosts } from "../../store/postsSlice";

//import components
import Thread from "../../components/Thread";

export default function Posts({}: iProps) {
  const { posts, loading, error } = useSelector(
    (store: RootState) => store.posts
  );
  const dispatch = useDispatch();

  async function fetchData() {
    const res = await fetch(`http://localhost:4000/posts`);
    const data = await res.json();
    dispatch(updatePosts(data.data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(loading, error);

  return (
    <Container>
      <h1>Here will be a list of posts</h1>
      {posts &&
        posts.map((post) => {
          return <Thread {...post} key={post.id} />;
        })}
    </Container>
  );
}

//styles
const Container = styled.div``;
