require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require("./src/utils/db");


const userRouter = require('./src/routes/userRoute');

app.use(express.json());
app.use('/api/users' , userRouter);



app.use(bodyParser.urlencoded({ 
    extended: true 
}));



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
});