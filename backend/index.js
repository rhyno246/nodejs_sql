require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const userRouter = require('./src/routes/userRoute');
const postRouter = require('./src/routes/PostRoute')
app.use(express.json());              
app.use(cors());
app.use(bodyParser.urlencoded({ 
  extended: true 
}));
//get static link folder upload
app.use(express.static("upload"))

app.use('/api/v1' , userRouter);
app.use('/api/v1' , postRouter);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
});