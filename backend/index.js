require("dotenv").config();
const express = require('express');
const multer = require('multer');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./src/routes/userRoute');





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({ storage: storage })

app.post("/api/v1/upload", upload.single('image') , (req, res) => {
  console.log(req.file)
  // res.status(200).json(file.name)
})

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