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

async function addPost(title, content, image) {
  res.send("not developed yet!, here is content: ", title, content, image);
}

async function saveFile(req, res) {
  const responce = await upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.file);
      return req.file;
    }
  });
  return responce;
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
  const file = req.file;
  const body = req.body;

  console.log(`file:`);
  console.log(file);
  console.log(`body: \n`, body);
  if (!file) {
    console.log("no file");
  }
});

app.post("/posts", (req, res) => {
  const { id, title, text, image_url } = req.body;
  addPost(id, title, text, image_url).then((responce) => console.log(responce));
  res.status(200).send({
    status: "success",
    string: `INSERT INTO post title = ${title} text = ${title} image_url = ${image_url} time = Date() WHERE id = ${id}`,
  });
});

app.listen(PORT, console.log(`server is listening on PORT ${PORT}`));
