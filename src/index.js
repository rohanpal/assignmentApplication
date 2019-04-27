const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const Schema = require("./Schema/Schema");
const mongoose = require("mongoose");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true
  })
);
//mongodb+srv://Rohan:free1234@cluster0-u7day.mongodb.net/ass?retryWrites=true

mongoose
  .connect(
    "mongodb+srv://Rohan:free1234@cluster0-u7day.mongodb.net/ass?retryWrites=true"
  )
  .then(res => console.log("connected"))
  .catch(e => {
    throw e;
  });
app.listen(8080);
