const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5555,
  password: "mysecretpassword",
  database: "imageboard",
});

client.connect();

async function getPost(id) {
  const res = await client.query(`SELECT * FROM posts WHERE id = ${id}`);
  if (res.rows.length < 1) return null;
  const post = res.rows[0];
  const postAnswers = await client.query(
    `SELECT * FROM posts WHERE answers_to = ${id}`
  );
  post.answers = postAnswers.rows.length;
  return post;
}

async function getAnswersCount(id) {
  const res = await client.query(
    `SELECT * FROM posts WHERE answers_to = ${id}`
  );
  const answers = res.rows;
  return answers.length;
}

async function getThreads() {
  const res = await client.query(`SELECT * FROM posts WHERE is_thread = true`);
  let posts = res.rows;
  posts = await Promise.all(
    posts.map(async (post) => {
      const count = await getAnswersCount(post.id);
      post.answers = count;
      return post;
    })
  );
  return posts;
}

async function getAnswers(id) {
  const res = await client.query(
    `SELECT * FROM posts WHERE answers_to = ${id}`
  );
  let answers = res.rows;
  answers = await Promise.all(
    answers.map(async (answer) => {
      const count = await getAnswersCount(answer.id);
      answer.answers = count;
      return answer;
    })
  );
  return answers;
}

app.get("/posts", (req, res) => {
  getThreads()
    .then((responce) => res.send({ status: "success", data: responce }))
    .catch((err) =>
      res.status(500).send({ status: "failed", message: err.message })
    );
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  getPost(id)
    .then((responce) => res.send({ status: "success", data: responce }))
    .catch((err) =>
      res.status(500).send({ status: "failed", message: err.message })
    );
});

app.get("/answers/:id", (req, res) => {
  const { id } = req.params;
  getAnswers(id)
    .then((responce) => res.send({ status: "success", data: responce }))
    .catch((err) =>
      res.status(500).send({ status: "failed", message: err.message })
    );
});

app.post("/posts", (req, res) => {
  const { id, title, text, image_url } = req.body;
  res.status(200).send({
    status: "success",
    string: `INSERT INTO post title = ${title} text = ${title} image_url = ${image_url} time = Date() WHERE id = ${id}`,
  });
});

app.listen(PORT, console.log(`server is listening on PORT ${PORT}`));
