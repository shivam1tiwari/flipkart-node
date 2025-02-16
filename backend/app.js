const express = require('express');
const app = express();
const {dbConnect} = require('./db-connection/db');
const productRouter = require('./controller/router')

dbConnect();

app.use(productRouter);
app.use("*", (req, res)=>{
  res.send("welcome but no page found");
})

app.listen(5011);
