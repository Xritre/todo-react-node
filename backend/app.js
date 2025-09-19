const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  req.pipe();
  req.on("data", callback), console.log("Get request received");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
