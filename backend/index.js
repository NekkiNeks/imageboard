const multer = require("multer");
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./public")); // create public folder

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, "file" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }); // upload variable for multer

const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5555,
  password: "mysecretpassword",
  database: "imageboard",
});

client.connect();

async function getPosts() {
  const res = await client.query(`SELECT * FROM posts ORDER BY time DESC`);
  let posts = res.rows; // array of posts
  posts = Promise.all(
    posts.map(async (post) => {
      const comments = await getComments(post.id);
      post.comments = comments.length;
      return post;
    })
  );
  return posts;
}

async function getPost(id) {
  const res = await client.query(`SELECT * FROM posts WHERE id = ${id}`);
  const post = res.rows;
  return post;
}

async function getAnswerTo(id) {
  const res = await client.query(
    `SELECT  answer_to FROM commentsrelations WHERE comment_id = ${id} `
  );
  const answers_to = res.rows.map((item) => {
    return item.answer_to;
  });
  return answers_to;
}

async function getAnswers(id) {
  const res = await client.query(
    `SELECT * FROM commentsrelations WHERE answer_to = ${id}`
  );
  const answers = res.rows.map((item) => {
    return item.comment_id;
  });
  return answers;
}

async function getComments(id) {
  const res = await client.query(
    `SELECT * FROM comments WHERE thread_id = ${id}`
  );
  let comments = res.rows; //get array of comments
  comments = await Promise.all(
    comments.map(async (comment) => {
      comment.answer_to = await getAnswerTo(comment.id); // get array of ids
      comment.answers = await getAnswers(comment.id);
      return comment;
    })
  );

  return comments;
}

async function addPost(thread_id, answer_to, title, content, file) {
  let answers = answer_to.length > 0 ? answer_to.split(",") : "";
  if (!content) {
    throw new Error("please enter content");
  }
  //SQL queries
  const query = {
    text: "INSERT INTO comments (time, title, content, image, thread_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    values: ["NOW()", title, content, file ? file.path : null, thread_id],
  };
  let comment_id;
  //query for comment
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      return err.stack;
    } else {
      console.log("responce from SQL:");
      console.log(res.rows);
      comment_id = res.rows[0].id;
    }
    //loop for comment answers
    for (let answer_to of answers) {
      const answerQuery = {
        text: "INSERT INTO commentsrelations (comment_id, answer_to) VALUES ($1, $2)",
        values: [comment_id, answer_to],
      };
      client.query(answerQuery, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`answer to ${answer_to} added!`);
        }
      });
    }
  });
  return `post with id ${comment_id} was posted`;
}

app.get("/posts/", (req, res) => {
  getPosts()
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

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  getComments(id)
    .then((responce) => res.send({ status: "success", data: responce }))
    .catch((err) =>
      res.status(500).send({ status: "failed", message: err.message })
    );
});

app.post("/comments/", upload.single("file"), (req, res) => {
  const { thread_id, title, content, answer_to } = req.body;
  const file = req.file ? req.file : null;

  addPost(thread_id, answer_to, title, content, file)
    .then((responce) => res.send({ status: "success", data: responce }))
    .catch((err) =>
      res.status(200).send({ status: "failed", message: err.message })
    );
});

app.listen(PORT, console.log(`server is listening on PORT ${PORT}`));
