const { CreateStories } = require('../controller/StoriesController');
const { checkAuthorization, checkRole } = require('../middleware/auth');
const { upload } = require('../middleware/uploadImage');
const express = require('express');
const router = express.Router();


router.route('/admin/stories').post(upload.single('file') ,checkAuthorization , checkRole('admin' , 'content') , CreateStories)


module.exports = router;