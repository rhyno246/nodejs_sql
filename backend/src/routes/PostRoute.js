const { createPost, getAdminPost, contentUploadImage, deletePost, getPostById, updateAdminPost, getNewsClient, getNewsClientDetail, getAllPostInHome } = require("../controller/PostController");
const { checkAuthorization, checkRole } = require("../middleware/auth");
const { upload } = require("../middleware/uploadImage");
const express = require('express');
const router = express.Router();
//admin post
router.route('/admin/post').post(upload.single('file') , checkAuthorization , checkRole('admin', 'content') , createPost)
.get(checkAuthorization , checkRole('admin', 'content'), getAdminPost)
.patch(upload.single('file') , checkAuthorization , checkRole('admin', 'content'), updateAdminPost)

router.route('/admin/post/:id').delete(checkAuthorization , checkRole('admin'), deletePost)
.get(checkAuthorization , checkRole('admin', 'content'), getPostById)

router.route('/admin/uploads').post(upload.single('image') , contentUploadImage)


//client
router.route('/news/:slug').get(getNewsClient);

router.route('/news/slug/:id').get(getNewsClientDetail);

router.route('/news').get(getAllPostInHome)


module.exports = router;