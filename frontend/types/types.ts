export type iPost = {
  id: number;
  time: string;
  title: string;
  content: string;
  image: string;
  comments: number;
};

export type iComment = {
  id: number;
  time: string;
  title: string;
  content: string;
  image: string;
  answer_to: number[];
  answers: number[];
  thread_id: number;
};
