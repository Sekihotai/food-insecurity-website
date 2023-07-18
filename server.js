const express = require("express");
const path = require("path");

const app = express();

app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: ["html", "htm"],
  })
);

app.use("*", (req, res) => {
  // TODO: send 404 web page
  res.status(404).end();
});

app.listen(3000, () => {
  console.log("LETS GOOO");
});

//amogus
