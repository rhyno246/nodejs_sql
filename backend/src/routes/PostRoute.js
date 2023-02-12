const { createPost, getAdminPost } = require("../controller/PostController");
const { checkAuthorization, checkRole } = require("../middleware/auth");
const { upload } = require("../middleware/uploadImage");
const express = require('express');
const router = express.Router();
//admin post
router.route('/admin/post').post(checkAuthorization , checkRole('admin', 'content') , createPost)
.get(checkAuthorization , checkRole('admin', 'content'), getAdminPost)


module.exports = router;