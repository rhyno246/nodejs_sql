const { CreateStories, getAllAdminStories, CreateListImage, getListImage } = require('../controller/StoriesController');
const { checkAuthorization, checkRole } = require('../middleware/auth');
const { upload } = require('../middleware/uploadImage');
const express = require('express');
const router = express.Router();


router.route('/admin/stories').get(checkAuthorization , checkRole('admin' , 'content'), getAllAdminStories)
.post(upload.single('file') ,checkAuthorization , checkRole('admin' , 'content') , CreateStories)

router.route('/admin/list').post(upload.single('file') ,checkAuthorization , checkRole('admin' , 'content') , CreateListImage)

router.route('/admin/list/:id').get(checkAuthorization , checkRole('admin' , 'content'), getListImage)


module.exports = router;