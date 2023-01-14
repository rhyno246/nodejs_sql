require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();


const userRouter = require('./src/routes/userRoute');

app.use(express.json());
app.use(cors());
app.use('/api/v1' , userRouter);



app.use(bodyParser.urlencoded({ 
    extended: true 
}));



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
});