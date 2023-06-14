const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const mongodb = require("./connection");

const port = process.env.PORT;

app.use("/", require("./routes/index"));
app.use("/contacts", require("./routes/contacts"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
