const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file)
      cb(null, "../frontend/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

module.exports = {
    upload
}