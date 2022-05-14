export type iPost = {
  id: number;
  is_thread: boolean;
  image_url: string;
  title: string;
  text: string;
  time: string;
  answers_to?: number;
  answers: number;
};
