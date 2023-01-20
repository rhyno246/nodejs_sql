require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const userRouter = require('./src/routes/userRoute');
const multer = require('multer');


app.use(express.json());              
app.use(cors());
app.use(bodyParser.urlencoded({ 
  extended: true 
}));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/v1/upload", upload.single("image"),  (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});



app.use('/api/v1' , userRouter);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
});