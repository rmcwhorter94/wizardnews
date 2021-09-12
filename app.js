const express = require("express");
const postBank = require("./postBank");
const morgan = require("morgan");
// const error = require("error");
const app = express();

app.use(morgan(`dev`));

// const path = require("path");
// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // const posts = postBank.list();
  // const id = req.params.id;
  const posts = postBank.list();
  // if (!post.id) {
  //   res.status(404)
  // const posts = postBank.find(id);
  // const id = req.params.id;
  // if (!post.id) {
  //   // If the post wasn't found, just throw an error
  //   throw new Error("Not Found");
  // }
  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>

            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join("")}
    </div>
  </body>
</html>`);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id) {
    throw new Error("You suck");
  }
  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
  <div class='news-item'>
    <p>
      <span class="news-position">${post.id}. ▲</span>${post.title}
      <small>(by ${post.name})</small><br></br>
    </p>
    <small class="news-info">
      ${post.content}<br></br>${post.date}
    </small>
  </div>`);
});
//------------Before testing google-------------------/////////

// res
//   .send(
//     Promise.resolve().then(function () {
//       throw new Error("BROKEN");
//     })
//   )
//   .catch(next);
// });
//----------------------TESTING WITH GIVEN CODE----------///////////////////////////

app.use(express.static("public"));
const PORT = 1337;

app.use((err, req, res, next) => {
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

// app.listen(error, (err, res) => {
//   res.statusMessage("Errr Try Again!");
// });
